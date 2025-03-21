// models/Roles.js
module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("Roles", {
        url: { type: DataTypes.STRING, allowNull: false }
    });

    Roles.associate = function(models) {
        Roles.belongsToMany(models.Users, { through: models.GroupRoles, foreignKey: 'roleId' });
    };

    return Roles;
};
