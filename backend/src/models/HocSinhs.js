// models/HocSinhs.js
module.exports = (sequelize, DataTypes) => {
    const HocSinhs = sequelize.define("HocSinhs", {
        hoTen: { type: DataTypes.STRING, allowNull: false },
        gioiTinh: { type: DataTypes.ENUM('Male', 'Female'), allowNull: false },
        ngaySinh: { type: DataTypes.DATE, allowNull: false },
        diaChi: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        mk: { type: DataTypes.STRING, allowNull: false } // Trường mật khẩu
    });

    HocSinhs.associate = function(models) {
        HocSinhs.hasMany(models.BangDiems, { foreignKey: 'maHS' });
        HocSinhs.belongsToMany(models.Lops, { through: models.HocSinh_Lops, foreignKey: 'maHS' });
    };

    return HocSinhs;
};
