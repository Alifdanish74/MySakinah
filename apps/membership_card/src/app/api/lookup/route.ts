import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Helper to sanitize IC (remove non-alphanumeric chars e.g. hyphens, spaces)
function cleanIC(ic: string): string {
  if (typeof ic !== "string" && typeof ic !== "number") return "";
  return String(ic).replace(/[^0-9a-zA-Z]/g, "").trim();
}

// Deep search inside form_data object for any value matching the sanitized IC
function containsMatchingIC(data: any, targetIC: string): boolean {
  if (!data) return false;
  
  if (typeof data === "string" || typeof data === "number") {
    const cleaned = cleanIC(String(data));
    if (cleaned.length >= 6 && cleaned === targetIC) return true;
  }

  if (typeof data === "object") {
    for (const key of Object.keys(data)) {
      const val = data[key];
      if (typeof val === "string" || typeof val === "number") {
        const cleaned = cleanIC(String(val));
        if (cleaned.length >= 6 && cleaned === targetIC) return true;
      } else if (typeof val === "object" && val !== null) {
        if (containsMatchingIC(val, targetIC)) return true;
      }
    }
  }

  return false;
}

// Built-in Demo Records for quick preview & testing
const DEMO_MEMBERS: Record<string, any[]> = {
  "920315105432": [
    {
      id: "demo-1",
      nama: "AHMAD SHAHIR BIN ABDULLAH",
      ic: "920315-10-5432",
      noAhli: "MS-2024-8842",
      pakej: "Pelan Utama + Perlindungan Keluarga",
      skim: "KOHASiL Raudhah",
      status: "AKTIF",
      tarikhDaftar: "15/03/2024",
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
      pakej: "Pakej KOPETRO Sakinah Care",
      skim: "KOPETRO",
      status: "AKTIF",
      tarikhDaftar: "10/05/2024",
      namaWaris: "SITI NURHALIZA BINTI OTHMAN",
      telefonWaris: "019-8765432",
      telefon: "012-3456789",
      negeri: "Selangor",
      kategori: "AHLI UTAMA",
    }
  ],
  "880520146789": [
    {
      id: "demo-3",
      nama: "NURUL FATIHAH BINTI ZULKIFLI",
      ic: "880520-14-6789",
      noAhli: "MS-2023-1109",
      pakej: "Pelan VIP Keahlian Individu",
      skim: "KOPETRO Sakinah Care",
      status: "AKTIF",
      tarikhDaftar: "20/05/2023",
      namaWaris: "ZULKIFLI BIN ISMAIL",
      telefonWaris: "017-3322110",
      telefon: "013-9876543",
      negeri: "Wilayah Persekutuan Kuala Lumpur",
      kategori: "AHLI VIP",
    }
  ],
  "951104085521": [
    {
      id: "demo-4",
      nama: "MOHD FIRDAUS BIN ROSLI",
      ic: "951104-08-5521",
      noAhli: "MS-2024-3401",
      pakej: "Pakej Perlindungan Al-Barzah",
      skim: "Al-Barzah Ta'awun",
      status: "AKTIF",
      tarikhDaftar: "04/11/2024",
      namaWaris: "NORAINI BINTI AHMAD",
      telefonWaris: "011-12345678",
      telefon: "018-9988776",
      negeri: "Perak",
      kategori: "AHLI INDIVIDU",
    }
  ]
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const rawIC = body.ic || "";
    const sanitizedIC = cleanIC(rawIC);

    if (!sanitizedIC || sanitizedIC.length < 6) {
      return NextResponse.json(
        { found: false, error: "Sila masukkan nombor kad pengenalan (IC) yang sah." },
        { status: 400 }
      );
    }

    // 1. Query Supabase Submissions table
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        });

        // Fetch submissions with joined module names
        const { data: submissions, error } = await supabase
          .from("submissions")
          .select("*, modules(display_name, slug)")
          .order("created_at", { ascending: false });

        if (!error && submissions && submissions.length > 0) {
          // Collect all candidate matches for this IC
          const matches = submissions.filter((sub: any) => {
            const formData = sub.form_data || {};
            const directIC = cleanIC(formData.no_kp || formData.ic || formData.no_ic || formData.nokp || formData.kp || "");
            if (directIC && directIC === sanitizedIC) return true;
            return containsMatchingIC(formData, sanitizedIC);
          });

          if (matches.length > 0) {
            // Group matches by module_id so each distinct module gets its own membership card
            const moduleMap = new Map<string, any>();

            for (const match of matches) {
              const modId = match.module_id || "default";
              const fd = match.form_data || {};
              const isMain = String(fd.kategori || "").toUpperCase().includes("AHLI");

              // If module not yet recorded OR current record is primary AHLI, set as primary for this module
              if (!moduleMap.has(modId) || isMain) {
                moduleMap.set(modId, match);
              }
            }

            const membersList = Array.from(moduleMap.values()).map((match) => {
              const fd = match.form_data || {};
              const moduleName = match.modules?.display_name || "MySakinah Pro";

              // Format IC display e.g. 900101-14-1234
              let formattedIC = rawIC;
              if (sanitizedIC.length === 12) {
                formattedIC = `${sanitizedIC.slice(0, 6)}-${sanitizedIC.slice(6, 8)}-${sanitizedIC.slice(8)}`;
              }

              // Extract main name
              const mainName =
                fd.nama ||
                fd.full_name ||
                fd.name ||
                (fd.members && fd.members.ahli && fd.members.ahli.nama) ||
                match.submitted_by ||
                "AHLI MYSAKINAH";

              // Member ID handling
              let rawNoAhli = fd.no_ahli || fd.noAhli || "";
              if (!rawNoAhli || rawNoAhli === "-") {
                const year = new Date(match.created_at || Date.now()).getFullYear();
                const shortId = (match.id || "0000").slice(0, 4).toUpperCase();
                rawNoAhli = `MS-${year}-${shortId}`;
              }

              return {
                id: match.id,
                moduleId: match.module_id,
                nama: String(mainName).toUpperCase(),
                ic: formattedIC,
                noAhli: rawNoAhli,
                pakej: fd.pakej || "Skim Perlindungan Sakinah",
                skim: moduleName,
                status: match.status === "rejected" ? "TIDAK AKTIF" : "AKTIF",
                tarikhDaftar: fd.tarikh_daftar || new Date(match.created_at).toLocaleDateString("en-GB"),
                namaWaris: fd.namaWaris || fd.nama_waris || fd.waris || "-",
                telefonWaris: fd.telefonWaris || fd.telefon_waris || "-",
                telefon: fd.no_telefon || fd.telefon || "-",
                negeri: fd.negeri || "Malaysia",
                kategori: (fd.kategori || "AHLI REGISTERED").toUpperCase(),
              };
            });

            return NextResponse.json({
              found: true,
              members: membersList,
              member: membersList[0], // fallback for backward compatibility
              count: membersList.length,
              source: "supabase",
            });
          }
        } else if (error) {
          console.error("[IC Lookup API] Supabase query error:", error.message);
        }
      } catch (dbErr) {
        console.warn("[IC Lookup API] Database query failed:", dbErr);
      }
    }

    // 2. Check Demo Dataset fallback if not found in database
    if (DEMO_MEMBERS[sanitizedIC]) {
      const list = DEMO_MEMBERS[sanitizedIC];
      return NextResponse.json({
        found: true,
        members: list,
        member: list[0],
        count: list.length,
        source: "demo",
      });
    }

    // 3. If IC not found anywhere
    return NextResponse.json({
      found: false,
      error: `Maklumat ahli bagi No. IC '${rawIC}' tidak dijumpai dalam rekod sistem. Sila semak semula nombor kad pengenalan anda.`,
    });
  } catch (error: any) {
    console.error("[IC Lookup API] Server error:", error);
    return NextResponse.json(
      { found: false, error: "Ralat dalaman pelayan semasa menyemak maklumat." },
      { status: 500 }
    );
  }
}
