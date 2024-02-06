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

      if (USER.role === "customer") {
        return res.redirect("/customers");
      } else if (USER.role === "admin") {
        return res.redirect("/admin");
      }

      // For other roles, redirect to the default home
      res.redirect("/");
    } catch (error) {
      next(error);
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
        // Redirect based on user role
        if (USER.role === "admin") {
          return res.redirect("/admin");
        } else if (USER.role === "customer") {
          return res.redirect("/customers");
        } else {
          // Handle other roles if needed
          return res.redirect("/");
        }
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

  static async homeCustomer(req, res) {
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
      res.render("homeCustomer", { packages, formatCurrency });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async homeAdmin(req, res) {
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
      res.render("homeAdmin", { packages, formatCurrency });
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

  // Tambahkan Gunung Baru untuk Admin
  static async addMountainForm(req, res) {
    try {
      res.render("addMountainForm");
    } catch (error) {
      res.send(error);
    }
  }

  static async addMountain(req, res) {
    try {
      // console.log(imageName);
      const { name, description, price, location, imageURL } = req.body;
      const imageName = req.file.filename
      await Package.create({
        name,
        description,
        price,
        location,
        imageURL: `assets/${imageName}`
      });

      
      res.redirect("/admin");
    } catch (error) {
      res.send(error);
    }
  }

  // Edit suatu gunung oleh Admin
  static async readDetailMountain(req, res) {
    try {
      const { id } = req.params;
      const mountains = await Package.findOne({
        where: {
          id,
        },
      });

      res.render("detailMountain", { mountains });
    } catch (error) {
      res.send(error);
    }
  }

  static async editDetailMountain(req, res) {
    try {
      const { id } = req.params;
      const imageName = req.file.filename
      const {
        name,
        description,
        price,
        imageURL,
        createdAt,
        updatedAt,
        location,
      } = req.body;

      await Package.update(
        {
          name,
          description,
          price,
          imageURL: `assets/${imageName}`,
          createdAt,
          updatedAt,
          location,
        },
        {
          where: {
            id,
          },
        }
      );
      res.redirect("/admin");
    } catch (error) {
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
      res.redirect("/customers/detail");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async detailCustomer(req ,res) {
    try {
      const packages = await Package.findAll({
        include: Order,
        attributes: { exclude: ['createdAt', 'updatedAt']}
      })
      const profiles = await Profile.findAll({
        include: Order,
        attributes: { exclude: ['createdAt', 'updatedAt']}
      })
      res.render("detailCustomer", {packages,profiles, formatCurrency})
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }

  static async logOutt(req, res) {
    try {
      await req.session.destroy();
      res.redirect("/");
    } catch (error) {
      console.log(error);
      req.send(error);
    }
  }

  static async deleteMountain(req, res) {
    try {
      const { id } = req.params;
      await Package.destroy({
        where: {
          id,
        },
      });
      res.redirect("/admin");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
