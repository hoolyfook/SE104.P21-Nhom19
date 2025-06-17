'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BangDiems extends Model {
    static associate(models) {
      BangDiems.belongsTo(models.Users, { foreignKey: 'maHS', as: 'Users' });
      BangDiems.belongsTo(models.Lops, { foreignKey: 'maLop', as: 'Lops' });
      BangDiems.belongsTo(models.MonHocs, { foreignKey: 'maMon', as: 'MonHocs' });
    }
  }
  BangDiems.init({
    maHS: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'id' } },
    maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
    maMon: { type: DataTypes.STRING, references: { model: 'MonHocs', key: 'maMon' } },
    hocKy: { type: DataTypes.ENUM('I', 'II'), allowNull: false },
    diem15p: { type: DataTypes.FLOAT },
    diem1Tiet: { type: DataTypes.FLOAT },
    diemTB: { type: DataTypes.FLOAT }
  }, {
    sequelize,
    modelName: 'BangDiems',
  });
  return BangDiems;
};
