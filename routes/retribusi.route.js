const express = require("express");
const router = express.Router();
const controller = require("../controlles/retribusi.controller");

router.get("/perhari", controller.getPerHari);
router.get("/perbulan", controller.getPerBulan);
router.get("/pertahun", controller.getPerTahun);

module.exports = router;
