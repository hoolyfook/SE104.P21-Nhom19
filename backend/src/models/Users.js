'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsTo(models.GroupUsers, { foreignKey: 'groupUserId', as: 'GroupUsers' });
      Users.hasMany(models.BangDiems, { foreignKey: 'maHS', as: 'BangDiems' });
      Users.belongsToMany(models.Lops, { through: models.HocSinh_Lops, foreignKey: 'maHS', as: 'Lops' });
    }
  }
  Users.init({
    hoTen: { type: DataTypes.STRING, allowNull: false },
    gioiTinh: { type: DataTypes.ENUM('Male', 'Female'), allowNull: false },
    ngaySinh: { type: DataTypes.DATE, allowNull: false },
    diaChi: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    mk: { type: DataTypes.STRING, allowNull: false },
    groupUserId: { type: DataTypes.INTEGER, references: { model: 'GroupUsers', key: 'id' } }
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
