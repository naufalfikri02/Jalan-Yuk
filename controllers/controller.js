// controllers/controller.js
const BCRYPT = require("bcryptjs");
const { User } = require("../models/index.js");
const { Profile } = require("../models/index.js");
const { Package } = require("../models/index.js");
const { Order } = require("../models/index.js");
const formatCurrency = require("../helpers/formatCurrency");
const { Op } = require("sequelize");

class Controller {
  // Handle Dashboard
  static async renderDashboard(req, res, next) {
    try {
      const { email, role } = req.session.user;
      res.render("dashboard.ejs", { email, role });
      // const USERS_ARRAY = await User.findAll()
      // res.send(USERS_ARRAY)
    } catch (error) {
      next(error);
      // console.log(error);
      // res.send(error)
    }
  }
  static async logout(req, res, next) {
    try {
      req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/login");
      });
      // res.send("dashboard")
      // const USERS_ARRAY = await User.findAll()
      // res.send(USERS_ARRAY)
    } catch (error) {
      next(error);
      // console.log(error);
      // res.send(error)
    }
  }

  // Untuk Sign Up
  static async renderSignupForm(req, res, next) {
    try {
      res.render("register.ejs");
    } catch (error) {
      next(error);
      // console.log(error);
      // res.send(error)
    }
  }

  static async receiveSignupForm(req, res, next) {
    try {
      const { email, password, role } = req.body;
      const USER = await User.create({ email, password, role });
      req.session.user = {
        email: USER.email,
        role: USER.role,
      };
      res.redirect("/");
    } catch (error) {
      next(error);
      // console.log(error)
      // res.send(error)
    }
  }

  //
  static async renderLoginForm(req, res, next) {
    try {
      const INVALID_EMAIL_ERROR = req.query.invalidemailerror;
      const INVALID_PASSWORD_ERROR = req.query.invalidpassworderror;
      const ERROR = {
        INVALID_EMAIL_ERROR,
        INVALID_PASSWORD_ERROR,
      };
      res.render("login.ejs", { ERROR });
    } catch (error) {
      next(error);
      // console.log(error)
      // res.send(error)
    }
  }
  static async receiveLoginForm(req, res, next) {
    try {
      const { email, password } = req.body;
      // user does not exist
      const USER = await User.findOne({ where: { email: email } });
      if (!USER) {
        return res.redirect(`/login?invalidemailerror=${email}`);
      }
      // grant access
      const IS_PASSWORD_VALID = await BCRYPT.compare(password, USER.password);
      if (IS_PASSWORD_VALID) {
        req.session.user = {
          email: USER.email,
          role: USER.role,
        };
        return res.redirect("/");
      }
      // wrong password
      res.redirect(`/login?invalidpassworderror=${password}`);
    } catch (error) {
      next(error);
    }
  }

  // Ini di luar dari registari dan login

  static async readPackages(req, res) {
    try {
      const { search } = req.query;

      let option = {
        where: {},
      };
      if (search) {
        option.where.name = {
          [Op.iLike]: `%${search}%`,
        };
      }
      const packages = await Package.findAll(option);
      res.render("home", { packages, formatCurrency });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addPackageForm(req, res) {
    try {
      res.render("addFormPackage");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addPackage(req, res) {
    try {
      const {
        name,
        description,
        price,
        imageURL,
        createdAt,
        updatedAt,
        location,
      } = req.body;
      await Package.create({
        name,
        description,
        price,
        imageURL,
        createdAt,
        updatedAt,
        location,
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  // Buat add form pendaftaran customer
  static async addCustomerForm(req, res) {
    try {
      res.render("addFormCustomer");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addCustomer(req, res) {
    try {
      const { name, gender, birthdate, balance, UserId, createdAt, updatedAt } =
        req.body;
      console.log(req);
      await Profile.create({
        name,
        gender,
        birthdate,
        balance,
        UserId,
        createdAt,
        updatedAt,
      });
      res.redirect("/mountains-for-order");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }


}

module.exports = Controller;
