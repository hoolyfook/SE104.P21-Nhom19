// models/MonHocs.js
module.exports = (sequelize, DataTypes) => {
    const MonHocs = sequelize.define("MonHocs", {
        maMon: { type: DataTypes.STRING, primaryKey: true },
        tenMon: { type: DataTypes.STRING, allowNull: false }
    });

    MonHocs.associate = function(models) {
        MonHocs.hasMany(models.BangDiems, { foreignKey: 'maMon' });
        MonHocs.hasMany(models.BaoCaoTongKetMons, { foreignKey: 'maMon' });
        MonHocs.hasMany(models.GiangVien_Lop_Mons, { foreignKey: 'maMon' });
    };

    return MonHocs;
};
