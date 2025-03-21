// models/Lops.js
module.exports = (sequelize, DataTypes) => {
    const Lops = sequelize.define("Lops", {
        maLop: { type: DataTypes.STRING, primaryKey: true },
        tenLop: { type: DataTypes.STRING, allowNull: false },
        khoiLop: { type: DataTypes.ENUM('10', '11', '12'), allowNull: false },
        siSo: { type: DataTypes.INTEGER }
    });

    Lops.associate = function(models) {
        Lops.hasMany(models.BangDiems, { foreignKey: 'maLop' });
        Lops.hasMany(models.HocSinh_Lops, { foreignKey: 'maLop' });
        Lops.hasMany(models.GiangVien_Lop_Mons, { foreignKey: 'maLop' });
        Lops.hasMany(models.BaoCaoTongKetMons, { foreignKey: 'maLop' });
        Lops.hasMany(models.BaoCaoTongKetHocKys, { foreignKey: 'maLop' });
    };

    return Lops;
};
