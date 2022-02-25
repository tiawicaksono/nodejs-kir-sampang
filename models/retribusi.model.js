const db = require("../db/db");

class retribusiModel {
  getPerHari(tgl) {
    const query = db("v_validasi")
      .select(
        "numerator",
        "nm_uji",
        "no_uji",
        "no_kendaraan",
        "nama_pemilik",
        "b_berkala as b_retribusi",
        "b_buku as b_kartu_uji",
        "b_plat_uji",
        "b_tlt_uji as b_denda",
        "lm_tlt",
        "b_retribusi_lebih as b_denda_tahun"
      )
      .where("tgl_retribusi", tgl)
      .orderBy("numerator", "desc");
    return query;
  }

  getPerBulan(bln) {
    const arrDate = String(bln).split("/");
    const bulan = Number(arrDate[0]);
    const tahun = Number(arrDate[1]);

    const query = db("v_lap_pad")
      .select(
        "tgl_pad",
        "b_daftar as b_retribusi",
        "b_rekom",
        "b_buku as b_kartu_uji",
        "b_plat_uji",
        "b_denda",
        "b_retribusi_lebih as b_denda_tahun",
        "total",
        "jum_kend"
      )
      .where("bulan", bulan)
      .where("tahun", tahun)
      .orderBy("tanggal", "asc");
    return query;
  }

  getPerTahun(tahun) {
    const query = db("v_lap_pad")
      .select("bulan", db.raw("SUM(total) as total"))
      .where("tahun", tahun)
      .orderBy("bulan", "asc")
      .groupBy("bulan");
    return query;
  }
}

module.exports = new retribusiModel();
