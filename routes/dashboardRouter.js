const EXPRESS = require("express")
const Controller = require("../controllers/controller");



const router = EXPRESS.Router()

router.get("/", Controller.renderDashboard)
router.get("/logout", Controller.logout)


module.exports = router
