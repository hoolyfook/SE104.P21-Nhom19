'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonHocs extends Model {
    static associate(models) {
      MonHocs.hasMany(models.BangDiems, { foreignKey: 'maMon', as: 'BangDiems' });
      MonHocs.hasMany(models.BaoCaoTongKetMons, { foreignKey: 'maMon', as: 'BaoCaoTongKetMons' });
      MonHocs.hasMany(models.GiangVien_Lop_Mons, { foreignKey: 'maMon', as: 'GiangVien_Lop_Mons' });
    }
  }
  MonHocs.init({
    maMon: { type: DataTypes.STRING, primaryKey: true },
    tenMon: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'MonHocs',
  });
  return MonHocs;
};
