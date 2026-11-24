import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type JsonRecord = Record<string, unknown>;

interface SubmissionRecord {
  id: string;
  module_id: string | null;
  form_data: JsonRecord | null;
  submitted_by: string | null;
  status: string | null;
  created_at: string | null;
  tempoh_keahlian: string | null;
  module_display_name: string | null;
  module_slug: string | null;
}

interface MemberIdentity {
  name: string;
  ic: string;
  category: string;
  matchType: "direct" | "nested";
}

interface MatchedSubmission {
  submission: SubmissionRecord;
  identity: MemberIdentity;
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

const IC_FIELDS = ["no_kp", "ic", "no_ic", "nokp", "kp"] as const;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const RATE_LIMIT_MAX_CLIENTS = 5_000;
// This process-local limit is best-effort; serverless deployments also need a shared edge limit.
const rateLimitBuckets = new Map<string, RateLimitBucket>();
let nextRateLimitCleanup = 0;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanIC(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") return "";
  return String(value).replace(/\D/g, "");
}

function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function formattedIC(digits: string): string {
  return `${digits.slice(0, 6)}-${digits.slice(6, 8)}-${digits.slice(8)}`;
}

function categoryFromPath(path: string[]): string {
  const memberKey = path.at(-1)?.toLowerCase().replace(/_\d+$/, "") || "";
  if (memberKey === "ahli") return "AHLI";
  if (memberKey === "pasangan") return "PASANGAN";
  if (memberKey === "anak") return "ANAK";
  if (memberKey.startsWith("tanggungan")) return "TANGGUNGAN";
  return memberKey.replace(/_/g, " ").toUpperCase();
}

function findNestedIdentity(
  value: unknown,
  targetIC: string,
  path: string[] = []
): MemberIdentity | null {
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      const match = findNestedIdentity(item, targetIC, [...path, String(index)]);
      if (match) return match;
    }
    return null;
  }
  if (!isRecord(value)) return null;

  for (const field of IC_FIELDS) {
    const rawIC = value[field];
    if (cleanIC(rawIC) === targetIC) {
      return {
        name: firstString(value.nama, value.full_name, value.name) || "AHLI MYSAKINAH",
        ic: cleanIC(rawIC),
        category: categoryFromPath(path),
        matchType: "nested",
      };
    }
  }

  for (const [key, nestedValue] of Object.entries(value)) {
    if ((IC_FIELDS as readonly string[]).includes(key)) continue;
    const match = findNestedIdentity(nestedValue, targetIC, [...path, key]);
    if (match) return match;
  }
  return null;
}

function findMemberIdentity(formData: JsonRecord, targetIC: string, submittedBy: string | null): MemberIdentity | null {
  for (const field of IC_FIELDS) {
    const rawIC = formData[field];
    if (cleanIC(rawIC) === targetIC) {
      return {
        name: firstString(formData.nama, formData.full_name, formData.name, submittedBy) || "AHLI MYSAKINAH",
        ic: cleanIC(rawIC),
        category: firstString(formData.kategori) || "AHLI REGISTERED",
        matchType: "direct",
      };
    }
  }
  return findNestedIdentity(formData, targetIC);
}

function consumeRateLimit(request: Request, now = Date.now()): { allowed: boolean; retryAfter: number } {
  if (now >= nextRateLimitCleanup) {
    for (const [key, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) rateLimitBuckets.delete(key);
    }
    nextRateLimitCleanup = now + RATE_LIMIT_WINDOW_MS;
  }

  const clientKey = request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const bucket = rateLimitBuckets.get(clientKey);
  if (bucket && bucket.resetAt > now) {
    if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
      return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
    }
    bucket.count += 1;
    return { allowed: true, retryAfter: 0 };
  }

  if (rateLimitBuckets.size >= RATE_LIMIT_MAX_CLIENTS) {
    return { allowed: false, retryAfter: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000) };
  }

  rateLimitBuckets.set(clientKey, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  return { allowed: true, retryAfter: 0 };
}

function isDemoFallbackEnabled(): boolean {
  return process.env.NODE_ENV !== "production" &&
    process.env.MEMBERSHIP_CARD_ENABLE_DEMO_FALLBACK === "true";
}

function demoResponse(ic: string): NextResponse | null {
  const list = DEMO_MEMBERS[ic];
  if (!list) return null;
  const members = list.map((member) => ({
    nama: member.nama,
    ic: member.ic,
    noAhli: member.noAhli,
    pakej: member.pakej,
    skim: member.skim,
    status: member.status,
    tarikhDaftar: member.tarikhDaftar,
    tempohKeahlian: member.tempohKeahlian,
    kategori: member.kategori,
  }));
  return NextResponse.json({
    found: true,
    members,
    member: members[0],
    count: members.length,
    source: "demo",
  });
}

function unavailableResponse(): NextResponse {
  return NextResponse.json(
    { found: false, error: "Semakan tidak dapat dilakukan buat masa ini. Sila cuba lagi sebentar." },
    { status: 503 }
  );
}

// Built-in Demo Records for quick preview & testing
const DEMO_MEMBERS: Record<string, Array<{
  id: string;
  nama: string;
  ic: string;
  noAhli: string;
  pakej: string;
  skim: string;
  status: string;
  tarikhDaftar: string;
  tempohKeahlian: string;
  namaWaris: string;
  telefonWaris: string;
  telefon: string;
  negeri: string;
  kategori: string;
}>> = {
  // Demo: KELUARGA 20 (shows Ahli + Pasangan benefit table + 2 anak child benefit)
  "920315105432": [
    {
      id: "demo-1",
      nama: "AHMAD SHAHIR BIN ABDULLAH",
      ic: "920315-10-5432",
      noAhli: "MS-2024-8842",
      pakej: "KELUARGA 20",
      skim: "KOHASiL Raudhah",
      status: "AKTIF",
      tarikhDaftar: "15/03/2024",
      tempohKeahlian: "15/10/2026",
      namaWaris: "SITI NURHALIZA BINTI OTHMAN",
      telefonWaris: "019-8765432",
      telefon: "012-3456789",
      negeri: "Selangor",
      kategori: "AHLI UTAMA",
    },
    {
      id: "demo-2",
      nama: "AHMAD SHAHIR BIN ABDULLAH",
      ic: "920315-10-5432",
      noAhli: "MS-2024-9901",
      pakej: "INDIVIDU 10",
      skim: "KOHASiL Raudhah (Peribadi)",
      status: "AKTIF",
      tarikhDaftar: "10/05/2024",
      tempohKeahlian: "10/05/2024",
      namaWaris: "SITI NURHALIZA BINTI OTHMAN",
      telefonWaris: "019-8765432",
      telefon: "012-3456789",
      negeri: "Selangor",
      kategori: "AHLI UTAMA",
    }
  ],
  // Demo: INDIVIDU 15
  "880520146789": [
    {
      id: "demo-3",
      nama: "NURUL FATIHAH BINTI ZULKIFLI",
      ic: "880520-14-6789",
      noAhli: "MS-2023-1109",
      pakej: "INDIVIDU 15",
      skim: "KOHASiL Raudhah",
      status: "AKTIF",
      tarikhDaftar: "20/05/2023",
      tempohKeahlian: "20/05/2026",
      namaWaris: "ZULKIFLI BIN ISMAIL",
      telefonWaris: "017-3322110",
      telefon: "013-9876543",
      negeri: "Wilayah Persekutuan Kuala Lumpur",
      kategori: "AHLI INDIVIDU",
    }
  ],
  // Demo: INDIVIDU 20
  "951104085521": [
    {
      id: "demo-4",
      nama: "MOHD FIRDAUS BIN ROSLI",
      ic: "951104-08-5521",
      noAhli: "MS-2024-3401",
      pakej: "INDIVIDU 20",
      skim: "KOHASiL Raudhah",
      status: "AKTIF",
      tarikhDaftar: "04/11/2024",
      tempohKeahlian: "04/11/2026",
      namaWaris: "NORAINI BINTI AHMAD",
      telefonWaris: "011-12345678",
      telefon: "018-9988776",
      negeri: "Perak",
      kategori: "AHLI INDIVIDU",
    }
  ],
  // Demo: KELUARGA 30 (shows 3 anak child benefit)
  "960101145523": [
    {
      id: "demo-5",
      nama: "RAZIF BIN MOHD NOOR",
      ic: "960101-14-5523",
      noAhli: "MS-2025-7712",
      pakej: "KELUARGA 30",
      skim: "KOHASiL Raudhah",
      status: "AKTIF",
      tarikhDaftar: "01/01/2025",
      tempohKeahlian: "01/01/2027",
      namaWaris: "HASLINDA BINTI RAZAK",
      telefonWaris: "011-98765432",
      telefon: "019-1122334",
      negeri: "Johor",
      kategori: "AHLI KELUARGA",
    }
  ],
};

export async function POST(req: Request) {
  const rateLimit = consumeRateLimit(req);
  if (!rateLimit.allowed) {
    console.warn("[IC Lookup API] Rate limit exceeded");
    return NextResponse.json(
      { found: false, error: "Terlalu banyak percubaan. Sila cuba lagi sebentar." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } }
    );
  }

  try {
    const body: unknown = await req.json();
    if (!isRecord(body)) {
      return NextResponse.json(
        { found: false, error: "Permintaan tidak sah." },
        { status: 400 }
      );
    }

    const sanitizedIC = cleanIC(body.ic);

    if (sanitizedIC.length !== 12) {
      return NextResponse.json(
        { found: false, error: "Sila masukkan nombor kad pengenalan (IC) yang sah." },
        { status: 400 }
      );
    }

    // 1. Query Supabase Submissions table
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const demoEnabled = isDemoFallbackEnabled();

    if (!supabaseUrl || !supabaseKey) {
      if (demoEnabled) {
        return demoResponse(sanitizedIC) ?? NextResponse.json({
          found: false,
          error: "Maklumat keahlian tidak dijumpai.",
        });
      }
      console.error("[IC Lookup API] Supabase configuration is missing");
      return unavailableResponse();
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error } = await supabase.rpc("membership_card_lookup_submissions", {
      p_ic: sanitizedIC,
    });

    if (error) {
      console.error("[IC Lookup API] Supabase query failed:", error.message);
      if (demoEnabled) return demoResponse(sanitizedIC) ?? unavailableResponse();
      return unavailableResponse();
    }

    const submissions = (data ?? []) as unknown as SubmissionRecord[];
    const matches: MatchedSubmission[] = [];
    for (const submission of submissions) {
      const formData = isRecord(submission.form_data) ? submission.form_data : {};
      const identity = findMemberIdentity(formData, sanitizedIC, submission.submitted_by);
      if (identity) matches.push({ submission, identity });
    }

    if (matches.length > 0) {
      const moduleMatches = new Map<string, MatchedSubmission>();
      for (const match of matches) {
        const { submission, identity } = match;
        const moduleKey = submission.module_id || submission.module_slug || "default";
        const previous = moduleMatches.get(moduleKey);
        if (!previous || (identity.matchType === "direct" && previous.identity.matchType === "nested")) {
          moduleMatches.set(moduleKey, match);
        }
      }

      const members = Array.from(moduleMatches.values()).map(({ submission, identity }) => {
        const formData = isRecord(submission.form_data) ? submission.form_data : {};
        const receiptData = isRecord(formData.receiptData) ? formData.receiptData : {};
        const registeredDate = firstString(formData.tarikh_daftar) ||
          (submission.created_at ? new Date(submission.created_at).toLocaleDateString("en-GB") : "-");
        const rawMemberNumber = firstString(formData.no_ahli, formData.noAhli);
        const memberNumber = rawMemberNumber && rawMemberNumber !== "-"
          ? rawMemberNumber
          : `MS-${submission.created_at ? new Date(submission.created_at).getFullYear() : "0000"}-${submission.id.slice(0, 4).toUpperCase()}`;

        return {
          nama: identity.name.toUpperCase(),
          ic: formattedIC(identity.ic),
          noAhli: memberNumber,
          pakej: firstString(receiptData.packageName, formData.pakej) || "Skim Perlindungan Sakinah",
          skim: firstString(submission.module_display_name) || "MySakinah Pro",
          status: firstString(submission.status).toLowerCase() || "baru",
          tarikhDaftar: registeredDate,
          tempohKeahlian: firstString(submission.tempoh_keahlian) || registeredDate,
          kategori: firstString(identity.category, formData.kategori, "AHLI REGISTERED").toUpperCase(),
        };
      });

      return NextResponse.json({
        found: true,
        members,
        member: members[0],
        count: members.length,
        source: "supabase",
      });
    }

    if (demoEnabled) {
      const response = demoResponse(sanitizedIC);
      if (response) return response;
    }

    return NextResponse.json({
      found: false,
      error: "Maklumat keahlian tidak dijumpai.",
    });
  } catch (error) {
    console.error("[IC Lookup API] Server error:", error);
    return NextResponse.json(
      { found: false, error: "Semakan tidak dapat dilakukan buat masa ini. Sila cuba lagi sebentar." },
      { status: 503 }
    );
  }
}
