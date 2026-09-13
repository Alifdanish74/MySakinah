// File: src/app/api/enquiry/route.ts — KOHASiL
import { enquirySchema } from "@/lib/validations";
import { saveSubmissionToDatabase } from "@sakinah/ui";

const MODULE_SLUG = "kohasil";

/**
 * POST /api/enquiry
 * KOHASiL Form submission endpoint.
 * Saves user submissions directly to the MySakinah Admin Dashboard system.
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

    const data = parsed.data as any;
    const membersData = body.members || {};
    const memberKeys = Object.keys(membersData);

    const submissionsToPost: Array<{ submitted_by: string; form_data: any }> = [];

    if (memberKeys.length > 0) {
      const ahli = membersData["ahli"] || {};
      const mainName = ahli.nama || data.nama;

      memberKeys.forEach((key, index) => {
        const m = membersData[key];
        if (!m || (!m.nama?.trim() && !m.ic?.trim())) return;

        let roleLabel = "AHLI";
        if (key === "pasangan") roleLabel = "PASANGAN";
        else if (key.startsWith("anak")) roleLabel = "ANAK";
        else if (key.startsWith("tanggungan")) roleLabel = "tanggungan";

        submissionsToPost.push({
          submitted_by: mainName,
          form_data: {
            no: (index + 1).toString(),
            nama: m.nama || mainName,
            no_kp: m.ic || data.ic || "-",
            umur: "-",
            kategori: roleLabel,
            no_ahli: data.noAhli || "-",
            bukan_anggota: data.statusKeahlian === "Bukan Ahli" ? "BUKAN ANGGOTA" : "",
            no_telefon: m.telefon || data.telefon || "-",
            alamat1: m.alamat1 || data.alamat1 || "-",
            alamat2: m.alamat2 || data.alamat2 || "-",
            alamat3: m.alamat3 || data.alamat3 || "-",
            poskod: data.poskod || "-",
            negeri: m.negeri || data.negeri || "-",
            pakej: data.pakej,
            tarikh_daftar: new Date().toLocaleDateString("en-GB"),
            utama: mainName,
            namaWaris: data.namaWaris || "-",
            telefonWaris: data.telefonWaris || "-",
            jenisTanggungan: m.jenisTanggungan || "",
            lindungiIbuBapa: data.lindungiIbuBapa === "ya" ? "Ya (RM10/bln)" : "Tidak",
            kaedahHubungi: (data.kaedahHubungi || "WHATSAPP").toUpperCase(),
          },
        });
      });
    }

    if (submissionsToPost.length === 0) {
      const formDataPayload = {
        no: "1",
        nama: data.nama,
        no_kp: data.ic || "-",
        umur: "-",
        kategori: (data.statusKeahlian || "AHLI").toUpperCase(),
        no_ahli: data.noAhli || "-",
        bukan_anggota: data.statusKeahlian === "BUKAN ANGGOTA" ? "BUKAN ANGGOTA" : "",
        no_telefon: data.telefon,
        alamat1: data.alamat1 || "-",
        alamat2: data.alamat2 || "-",
        alamat3: data.alamat3 || "-",
        poskod: data.poskod || "-",
        negeri: data.negeri || "-",
        pakej: data.pakej,
        tarikh_daftar: new Date().toLocaleDateString("en-GB"),
        utama: data.nama,
        namaWaris: data.namaWaris || "-",
        telefonWaris: data.telefonWaris || "-",
        lindungiIbuBapa: data.lindungiIbuBapa === "ya" ? "Ya (RM10/bln)" : "Tidak",
        kaedahHubungi: (data.kaedahHubungi || "WHATSAPP").toUpperCase(),
      };

      submissionsToPost.push({
        submitted_by: data.nama,
        form_data: formDataPayload,
      });
    }

    // Store in Admin Dashboard System & Supabase
    let saveFailed = false;
    let saveErrorMessage = "";

    for (const item of submissionsToPost) {
      const saveRes = await saveSubmissionToDatabase({
        module_slug: MODULE_SLUG,
        submitted_by: item.submitted_by,
        form_data: item.form_data,
      });

      if (!saveRes.success) {
        saveFailed = true;
        saveErrorMessage = saveRes.error || "Gagal menyimpan maklumat permohonan.";
      }
    }

    if (saveFailed) {
      return Response.json(
        {
          success: false,
          error: saveErrorMessage,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: `Permohonan pakej ${data.pakej} telah berjaya diterima dan direkodkan.`,
        count: submissionsToPost.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[KOHASiL Enquiry API] Error:", error);
    return Response.json(
      {
        success: false,
        error: "Ralat Dalaman Pelayan",
      },
      { status: 500 }
    );
  }
}
