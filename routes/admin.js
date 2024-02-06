const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");
const { upload } = require("../helpers/fileUpload.js");


router.get("/", Controller.homeAdmin) // Menampilkan home customer --DONE
router.get("/addMountain", Controller.addMountainForm) // Menambahkan Daftar Gunung -- DONE
router.post("/addMountain", upload.single("imageURL"), Controller.addMountain) // Menambahkan Daftar Gunung --DONE
router.get('/:id/',Controller.readDetailMountain) // Edit isi gunung 
router.post('/:id/edit', upload.single("imageURL"), Controller.editDetailMountain) // Edit isi gunung 

router.get('/:id/delete', Controller.deleteMountain) // Hapus satu gunung --DONE



module.exports = router
