const model = require("../models/retribusi.model");
var format = require("date-format");

class retribusiController {
  async getPerHari(req, res) {
    try {
      const dateNow = req.body.tgl_retribusi;
      const getDataRetribusi = await model.getPerHari(dateNow);

      if (!getDataRetribusi || getDataRetribusi.length === 0) {
        res.status(201).json({
          status: "warning",
          data: "Data not found",
        });
        return;
      }

      var newArray = [];
      getDataRetribusi.forEach(function (item, index, array) {
        let tlt_retribusi = 0;
        if (Math.floor(item.lm_tlt / 12) != 0) {
          tlt_retribusi = Math.floor(item.lm_tlt / 12);
        }
        // newArray.push({
        //   tlt_tahun: tlt_retribusi,
        // });

        // objIndex = myArray.findIndex((obj) => obj.id == 1);
        // console.log(array[1]);
        newArray.push({
          numerator: item.numerator,
          nm_uji: item.nm_uji,
          no_uji: item.no_uji,
          no_kendaraan: item.no_kendaraan,
          nama_pemilik: item.nama_pemilik,
          b_berkala: item.b_berkala,
          b_buku: item.b_buku,
          b_tlt_uji: item.b_tlt_uji,
          b_plat_uji: item.b_plat_uji,
          lm_tlt: item.lm_tlt + " bln",
          b_retribusi_lebih: item.b_retribusi_lebih,
          tlt_tahun: tlt_retribusi + " thn",
        });
      });

      res.status(200).json({
        status: "success",
        data: {
          tanggal: dateNow,
          data: newArray,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  async getPerBulan(req, res) {
    try {
      const dateNow = req.body.bulan;
      const getDataRetribusi = await model.getPerBulan(dateNow);

      if (!getDataRetribusi || getDataRetribusi.length === 0) {
        res.status(201).json({
          status: "warning",
          data: "Data not found",
        });
        return;
      }
      let total = 0;
      getDataRetribusi.forEach((element, index) => {
        //CHANGE FORMAT TGL_PAD
        let tgl_pad = format.asString("dd/MM/yyyy", element.tgl_pad);
        element.tgl_pad = tgl_pad;

        //SUM TOTAL RETRIBUSI
        total += element.total;
      });

      res.status(200).json({
        status: "success",
        data: {
          bulan: dateNow,
          total_retribusi: total,
          data: getDataRetribusi,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        error: error.message,
      });
    }
  }

  async getPerTahun(req, res) {
    try {
      const dateNow = req.body.tahun;
      const getDataRetribusi = await model.getPerTahun(dateNow);

      if (!getDataRetribusi || getDataRetribusi.length === 0) {
        res.status(201).json({
          status: "warning",
          data: "Data not found",
        });
        return;
      }
      let total = 0;
      getDataRetribusi.forEach((element, index) => {
        //SUM TOTAL RETRIBUSI
        total += element.total;
      });

      res.status(200).json({
        status: "success",
        data: {
          bulan: dateNow,
          total_retribusi: total,
          data: getDataRetribusi,
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

module.exports = new retribusiController();
