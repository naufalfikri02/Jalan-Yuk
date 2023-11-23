const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

// GET /
router.get("/", Controller.readPackages) // Tampilkan homepage
router.get("/add", Controller.addPackageForm) // Tampilkan add form untuk package
router.post("/add", Controller.addPackage) // Menambahkan data store
router.get("/logout", Controller.logout) // Untuk log out






module.exports = router;
