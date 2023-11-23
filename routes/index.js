const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controller");

const SIGNUP_ROUTER = require("./signUpRouter");
const LOGIN_ROUTER = require("./loginRouter");
const DASHBOARD_ROUTER = require("./dashboardRouter");

const packages = require("./packages");
const customers = require("./customers");


function requireLogin(req, res, next) {
  if (req.session.user) {
      next();
  } else {
      res.redirect('/login');
  }
}

router.get("/", Controller.readPackages)


// router.use(errorHandler)

// GET /

router.use("/signup", SIGNUP_ROUTER)
router.use("/login", LOGIN_ROUTER)
router.use("/dashboard", requireLogin, DASHBOARD_ROUTER)
router.use("/packages", packages);
router.use("/customers", customers);
// router.get("/mountains-for-order", Controller.renderMountainsForOrder);

module.exports = router;
