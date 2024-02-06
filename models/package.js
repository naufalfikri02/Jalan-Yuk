'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    static associate(models) {
      Package.hasMany(models.Order, {
        foreignKey: 'PackageId',
      });
    }
  }

  Package.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name cannot be null.',
          },
          notEmpty: {
            msg: 'Name cannot be empty.',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Description cannot be null.',
          },
          notEmpty: {
            msg: 'Description cannot be empty.',
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Price cannot be null.',
          },
          isInt: {
            msg: 'Price must be an integer.',
          },
          min: {
            args: [100000],
            msg: 'Price must be at least 100000.',
          },
        },
      },
      imageURL: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Location cannot be null.',
          },
          notEmpty: {
            msg: 'Location cannot be empty.',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Package',
    }
  );

  return Package;
};
