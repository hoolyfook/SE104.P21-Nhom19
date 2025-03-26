'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.belongsToMany(models.GroupUsers, { through: models.GroupRoles, foreignKey: 'RoleID', otherKey: 'GroupID', as: 'GroupUsers' });
    }
  }
  Roles.init({
    url: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};
