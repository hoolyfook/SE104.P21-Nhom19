'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaoCaoTongKetHocKys extends Model {
    static associate(models) {
      BaoCaoTongKetHocKys.belongsTo(models.Lops, { foreignKey: 'maLop', as: 'Lops' });
    }
  }
  BaoCaoTongKetHocKys.init({
    maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
    siSo: { type: DataTypes.INTEGER },
    soLuongDat: { type: DataTypes.INTEGER },
    tiLe: { type: DataTypes.FLOAT },
    hocKy: { type: DataTypes.ENUM('I', 'II'), allowNull: false }
  }, {
    sequelize,
    modelName: 'BaoCaoTongKetHocKys',
  });
  return BaoCaoTongKetHocKys;
};
