'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User);

      Profile.hasMany(models.Order, {
        foreignKey: 'ProfileId',
      });
    }

    // Hitung umur
    get calculateAge() {
      const today = new Date();
      const birthDate = new Date(this.birthdate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    }
  }

  Profile.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name cannot be empty',
          },
        },
      },
      gender: DataTypes.STRING,
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Silakan isi Date of Birth anda",
          },
          notNull: true,
          isAbove18(value) {
            console.log(this.calculateAge, "=====");
            if (this.calculateAge < 17) {
              throw new Error("Customers must be at least 18 years old.");
            }
          },
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Balance cannot be empty',
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );

  return Profile;
};