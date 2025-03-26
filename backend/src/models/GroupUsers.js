'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GroupUsers extends Model {
    static associate(models) {
      GroupUsers.belongsToMany(models.Roles, { through: models.GroupRoles, foreignKey: 'GroupID', otherKey: 'RoleID', as: 'Roles' });
    }
  }
  GroupUsers.init({
    name: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'GroupUsers',
  });
  return GroupUsers;
};
