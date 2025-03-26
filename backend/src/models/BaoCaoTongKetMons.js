'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaoCaoTongKetMons extends Model {
    static associate(models) {
      BaoCaoTongKetMons.belongsTo(models.Users, { foreignKey: 'maHS', as: 'Users' });
      BaoCaoTongKetMons.belongsTo(models.Lops, { foreignKey: 'maLop', as: 'Lops' });
      BaoCaoTongKetMons.belongsTo(models.MonHocs, { foreignKey: 'maMon', as: 'MonHocs' });
    }
  }
  BaoCaoTongKetMons.init({
    maHS: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'maHS' } },
    maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
    maMon: { type: DataTypes.STRING, references: { model: 'MonHocs', key: 'maMon' } },
    hocKy: { type: DataTypes.ENUM('I', 'II'), allowNull: false },
    diem15p: { type: DataTypes.FLOAT },
    diem1Tiet: { type: DataTypes.FLOAT },
    diemTB: { type: DataTypes.FLOAT }
  }, {
    sequelize,
    modelName: 'BaoCaoTongKetMons',
  });
  return BaoCaoTongKetMons;
};
