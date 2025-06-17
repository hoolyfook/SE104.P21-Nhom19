'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuyDinhs extends Model {}
  QuyDinhs.init({
    moTa: { type: DataTypes.TEXT, allowNull: false },
    giaTri: { type: DataTypes.INTEGER, allowNull: true }
  }, {
    sequelize,
    modelName: 'QuyDinhs',
  });
  return QuyDinhs;
};
