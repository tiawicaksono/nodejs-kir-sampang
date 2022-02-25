const express = require("express");
const router = express.Router();
const controller = require("../controlles/kendaraan.controller");

router.get("/", controller.getData);
router.get("/riwayat", controller.getRiwayat);
router.get("/perhari", controller.getPerHari);
router.get("/perbulan", controller.getPerBulan);

module.exports = router;
