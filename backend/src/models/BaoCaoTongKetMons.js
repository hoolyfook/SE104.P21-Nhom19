'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaoCaoTongKetMons extends Model {
    static associate(models) {
      BaoCaoTongKetMons.belongsTo(models.MonHocs, { foreignKey: 'maMon', as: 'MonHocs' });
      BaoCaoTongKetMons.belongsTo(models.Lops, { foreignKey: 'maLop', as: 'Lops' });
    }
  }
  BaoCaoTongKetMons.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    maMon: {
      type: DataTypes.STRING,
      references: { model: 'MonHocs', key: 'maMon' },
    },
    hocKy: {
      type: DataTypes.ENUM('I', 'II'),
      allowNull: false,
    },
    maLop: {
      type: DataTypes.STRING,
      references: { model: 'Lops', key: 'maLop' },
    },
    siSo: {
      type: DataTypes.INTEGER,
    },
    soLuongDat: {
      type: DataTypes.INTEGER,
    },
    tiLe: {
      type: DataTypes.FLOAT,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BaoCaoTongKetMons',
    tableName: 'BaoCaoTongKetMons',
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  });
  return BaoCaoTongKetMons;
};