'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupRoles extends Model {
    static associate(models) {
      GroupRoles.belongsTo(models.GroupUsers, { foreignKey: 'GroupID', as: 'GroupUsers' });
      GroupRoles.belongsTo(models.Roles, { foreignKey: 'RoleID', as: 'Roles' });
    }
  }
  GroupRoles.init({
    GroupID: { type: DataTypes.INTEGER, references: { model: 'GroupUsers', key: 'id' } },
    RoleID: { type: DataTypes.INTEGER, references: { model: 'Roles', key: 'id' } }
  }, {
    sequelize,
    modelName: 'GroupRoles',
  });
  return GroupRoles;
};
