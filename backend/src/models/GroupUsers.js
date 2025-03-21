// models/GroupUsers.js
module.exports = (sequelize, DataTypes) => {
    const GroupUsers = sequelize.define("GroupUsers", {
        name: { type: DataTypes.STRING, allowNull: false }
    });

    GroupUsers.associate = function(models) {
        GroupUsers.hasMany(models.Users, { foreignKey: 'groupUserId' });
    };

    return GroupUsers;
};
