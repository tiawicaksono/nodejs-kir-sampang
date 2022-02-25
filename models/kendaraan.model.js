const db = require("../db/db");

class kendaraanModel {
  getPemilikKendaraan(nouji) {
    const query = db("v_kendaraan")
      .select(
        "nama_pemilik",
        "alamat",
        "kelurahan",
        "kecamatan",
        "kota",
        "propinsi"
      )
      .where("no_uji", nouji.toUpperCase());
    return query;
  }
  getDataKendaraan(nouji) {
    const no_uji = nouji + "";
    const query = db("v_kendaraan")
      .select(
        "no_uji",
        "no_kendaraan",
        "no_mesin",
        "no_chasis",
        "nm_komersil",
        "jenis",
        "sifat",
        "tgl_mati_uji"
      )
      .where("no_uji", no_uji.toUpperCase());
    return query;
  }
  getRiwayat(nouji) {
    const query = db("v_riwayat")
      .select("tgl_uji", "tglmati", "nama_penguji", "nrp")
      .where("no_uji", nouji.toUpperCase());
    return query;
  }
  getPerHari(tgl) {
    const query = db("v_validasi")
      .select(
        "numerator",
        "nm_uji",
        "no_uji",
        "no_kendaraan",
        "nama_pemilik",
        "jenis",
        "nm_komersil"
      )
      .where("tgl_retribusi", tgl);
    return query;
  }
  getPerBulan(bln) {
    const arrDate = String(bln).split("/");
    const bulan = Number(arrDate[0]);
    const tahun = Number(arrDate[1]);

    const query = db("v_validasi")
      .select(
        "tgl_retribusi",
        "nm_uji",
        "no_uji",
        "no_kendaraan",
        "nama_pemilik",
        "jenis",
        "nm_komersil"
      )
      .where(db.raw("EXTRACT(MONTH FROM tgl_retribusi)"), bulan)
      .where(db.raw("EXTRACT(YEAR FROM tgl_retribusi)"), tahun)
      .orderBy("tgl_retribusi", "asc");
    return query;
  }
}

module.exports = new kendaraanModel();
