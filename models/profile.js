'use strict';
const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

      Profile.hasMany(models.Order, {
        foreignKey: 'ProfileId',
      });
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
        validate: {
          isNotFutureDate(value) {
            if (value > new Date()) {
              throw new Error('Birthdate cannot be greater than today');
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