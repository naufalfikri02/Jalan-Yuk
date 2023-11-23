const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/add", Controller.addCustomerForm) // Membuat form customer
router.post("/add", Controller.addCustomer) // Menambahkan customer


module.exports = router
