// models/Users.js
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        hoTen: { type: DataTypes.STRING, allowNull: false },
        gioiTinh: { type: DataTypes.ENUM('Male', 'Female'), allowNull: false },
        ngaySinh: { type: DataTypes.DATE, allowNull: false },
        diaChi: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        mk: { type: DataTypes.STRING, allowNull: false }, // Trường mật khẩu
        groupUserId: { type: DataTypes.INTEGER, references: { model: 'GroupUsers', key: 'id' } }
    });

    Users.associate = function(models) {
        Users.belongsTo(models.GroupUsers, { foreignKey: 'groupUserId' });
        Users.belongsToMany(models.Roles, { through: models.GroupRoles, foreignKey: 'userId' });
    };

    return Users;
};
