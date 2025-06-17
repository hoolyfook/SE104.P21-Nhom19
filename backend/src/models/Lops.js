'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lops extends Model {
    static associate(models) {
      Lops.hasMany(models.BangDiems, {
        foreignKey: 'maLop',
        as: 'BangDiems'
      });
      Lops.hasMany(models.GiangVien_Lop_Mons, {
        foreignKey: 'maLop',
        as: 'GiangVien_Lop_Mons'
      });
      Lops.hasMany(models.BaoCaoTongKetMons, {
        foreignKey: 'maLop',
        as: 'BaoCaoTongKetMons'
      });
      Lops.hasMany(models.BaoCaoTongKetHocKys, {
        foreignKey: 'maLop',
        as: 'BaoCaoTongKetHocKys'
      });
      Lops.belongsToMany(models.Users, {
        through: models.HocSinh_Lops,
        foreignKey: 'maLop'
      });
      Lops.belongsTo(models.Users, {
        foreignKey: 'chuNhiem',
        as: 'ChuNhiemUser'
      });
    }
  }
  Lops.init({
    maLop: { type: DataTypes.STRING, primaryKey: true },
    tenLop: { type: DataTypes.STRING, allowNull: false },
    khoiLop: { type: DataTypes.ENUM('10', '11', '12'), allowNull: false },
    siSo: { type: DataTypes.INTEGER },
    chuNhiem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Users', key: 'id' }
    },
    namHoc: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Lops',
  });
  return Lops;
};
