const EXPRESS = require("express")
const Controller = require("../controllers/controller");
const router = require(".");



const SIGNUP_ROUTER = EXPRESS.Router()

SIGNUP_ROUTER.get("/", Controller.renderSignupForm)
SIGNUP_ROUTER.post("/", Controller.receiveSignupForm)


module.exports = SIGNUP_ROUTER
