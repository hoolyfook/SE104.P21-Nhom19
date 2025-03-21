// models/GroupRoles.js
module.exports = (sequelize, DataTypes) => {
    const GroupRoles = sequelize.define("GroupRoles", {
        GroupID: { type: DataTypes.INTEGER, references: { model: 'GroupUsers', key: 'id' } },
        RoleID: { type: DataTypes.INTEGER, references: { model: 'Roles', key: 'id' } }
    });

    GroupRoles.associate = function(models) {
        GroupRoles.belongsTo(models.GroupUsers, { foreignKey: 'GroupID' });
        GroupRoles.belongsTo(models.Roles, { foreignKey: 'RoleID' });
    };

    return GroupRoles;
};
