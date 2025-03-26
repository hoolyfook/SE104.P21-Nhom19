'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HocSinh_Lops extends Model {}
  HocSinh_Lops.init({
    maHS: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'maHS' } },
    maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } }
  }, {
    sequelize,
    modelName: 'HocSinh_Lops',
  });
  return HocSinh_Lops;
};
