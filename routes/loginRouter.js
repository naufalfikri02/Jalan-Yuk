const EXPRESS = require("express")
const Controller = require("../controllers/controller");



const router = EXPRESS.Router()

router.get("/", Controller.renderLoginForm)
router.post("/", Controller.receiveLoginForm)


module.exports = router
