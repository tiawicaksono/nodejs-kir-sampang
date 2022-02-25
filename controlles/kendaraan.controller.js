const kendaraanModel = require("../models/kendaraan.model");
var format = require("date-format");

class kendaraanController {
  async getData(req, res) {
    try {
      const getDataKendaraan = await kendaraanModel.getDataKendaraan(
        req.body.no_uji
      );

      if (!getDataKendaraan || getDataKendaraan.length === 0) {
        res.status(201).json({
          status: "warning",
          data: "no uji not found",
        });
        return;
      }
      const getDataPemilik = await kendaraanModel.getPemilikKendaraan(
        req.body.no_uji
      );
      const tglMatiUji = format.asString(
        "dd/MM/yyyy",
        getDataKendaraan[0].tgl_mati_uji
      );
      getDataKendaraan[0].tgl_mati_uji = tglMatiUji;

      res.status(200).json({
        status: "success",
        data: {
          pemilik: getDataPemilik,
          kendaraan: getDataKendaraan,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  async getRiwayat(req, res) {
    try {
      const getDataRiwayat = await kendaraanModel.getRiwayat(req.body.no_uji);
      if (!getDataRiwayat || getDataRiwayat.length === 0) {
        res.status(201).json({
          status: "warning",
          data: "ID not found",
        });
        return;
      }
      const getDataKendaraan = await kendaraanModel.getDataKendaraan(
        req.body.no_uji
      );

      // CHANGE FORMAT TANGGAL UJI
      const tglMatiUji = format.asString(
        "dd/MM/yyyy",
        getDataKendaraan[0].tgl_mati_uji
      );
      getDataKendaraan[0].tgl_mati_uji = tglMatiUji;

      /**
       * CHANGE FORMAT TANGGAL UJI DAN TANGGAL MATI UJI
       */
      getDataRiwayat.forEach((element, index) => {
        // TANGGAL UJI
        let tgl_uji = format.asString("dd/MM/yyyy", element.tgl_uji);
        element.tgl_uji = tgl_uji;

        //TANGGAL MATI UJI
        let tgl_mati = format.asString("dd/MM/yyyy", element.tglmati);
        element.tglmati = tgl_mati;
      });

      res.status(200).json({
        status: "success",
        data: {
          kendaraan: getDataKendaraan,
          riwayat: getDataRiwayat,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
        // data: req.body,
      });
    }
  }

  async getPerHari(req, res) {
    try {
      const dateNow = req.body.tgl_retribusi;
      const getDataRetribusi = await kendaraanModel.getPerHari(dateNow);
      if (!getDataRetribusi || getDataRetribusi.length === 0) {
        res.status(201).json({
          status: "warning",
          data: "Data not found",
        });
        return;
      }

      res.status(200).json({
        status: "success",
        data: {
          tanggal: dateNow,
          total: getDataRetribusi.length,
          data: getDataRetribusi,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
        // data: req.body,
      });
    }
  }

  async getPerBulan(req, res) {
    try {
      const dateNow = req.body.bulan;
      const getDataKendaraan = await kendaraanModel.getPerBulan(dateNow);
      if (!getDataKendaraan || getDataKendaraan.length === 0) {
        res.status(201).json({
          status: "warning",
          data: "Data not found",
        });
        return;
      }

      getDataKendaraan.forEach((element, index) => {
        // console.log(element.no_uji);
        //CHANGE FORMAT TGL_PAD
        let tgl_retribusi = format.asString(
          "dd/MM/yyyy",
          element.tgl_retribusi
        );
        element.tgl_retribusi = tgl_retribusi;
      });
      console.timeEnd("test");
      res.status(200).json({
        status: "success",
        data: {
          tanggal: dateNow,
          total: getDataKendaraan.length,
          data: getDataKendaraan,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }
}

module.exports = new kendaraanController();
