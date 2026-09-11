// File: src/app/api/enquiry/route.ts — Albarzah
import { enquirySchema } from "@/lib/validations";

/**
 * POST /api/enquiry
 * Albarzah form submission endpoint.
 * Saves user submissions to the admin dashboard ingest endpoint.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          error: "Ralat Pengesahan Maklumat",
          issues: parsed.error.issues,
        },
        { status: 422 }
      );
    }

    const submissionData = {
      source: "albarzah",
      timestamp: new Date().toISOString(),
      nama: parsed.data.nama,
      telefon: parsed.data.telefon,
      ic: parsed.data.ic || "-",
      alamat1: parsed.data.alamat1 || "-",
      alamat2: parsed.data.alamat2 || "-",
      negeri: parsed.data.negeri || "-",
      namaWaris: parsed.data.namaWaris || "-",
      telefonWaris: parsed.data.telefonWaris || "-",
      statusKeahlian: parsed.data.statusKeahlian || "-",
      noAhli: parsed.data.noAhli || "-",
      pakej: parsed.data.pakej,
      tempohLangganan: "1-tahun",
      kaedahHubungi: parsed.data.kaedahHubungi
        ? parsed.data.kaedahHubungi.toUpperCase()
        : "WHATSAPP",
    };

    // Post to admin dashboard ingest endpoint if configured
    const ingestUrl = process.env.INGEST_WEBHOOK_URL;

    if (ingestUrl) {
      try {
        const ingestRes = await fetch(`${ingestUrl}/albarzah`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Webhook-Secret": process.env.INGEST_WEBHOOK_SECRET || "",
          },
          body: JSON.stringify(submissionData),
        });
        const responseText = await ingestRes.text();
        console.log("[Ingest API] Response:", responseText);
      } catch (ingestErr) {
        console.warn("[Ingest API] Warning:", ingestErr);
      }
    } else {
      console.log("[Ingest API] INGEST_WEBHOOK_URL not set — submission logged locally only.");
    }

    console.log("[Enquiry API] Albarzah submission saved:", submissionData);

    return Response.json(
      {
        success: true,
        message: `Permohonan pakej ${parsed.data.pakej} telah berjaya diterima dan direkodkan.`,
        data: submissionData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Enquiry API] Error:", error);
    return Response.json(
      {
        success: false,
        error: "Ralat Dalaman Pelayan",
      },
      { status: 500 }
    );
  }
}
