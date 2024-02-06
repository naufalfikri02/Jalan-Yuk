const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");


router.get("/", Controller.homeCustomer) // Menampilkan home customer --DONE
router.get("/add", Controller.addCustomerForm) // Membuat form customer --DONE
router.post("/add", Controller.addCustomer) // Menambahkan customer --DONE
router.get("/detail", Controller.detailCustomer) // Melihat Detail Customer


module.exports = router
