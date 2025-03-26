'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiangVien_Lop_Mons extends Model {}
  GiangVien_Lop_Mons.init({
    maGV: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'maUser' } },
    maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
    maMon: { type: DataTypes.STRING, references: { model: 'MonHocs', key: 'maMon' } }
  }, {
    sequelize,
    modelName: 'GiangVien_Lop_Mons',
  });
  return GiangVien_Lop_Mons;
};
