// models/HocSinh_Lops.js
module.exports = (sequelize, DataTypes) => {
    const HocSinh_Lops = sequelize.define("HocSinh_Lops", {
        maHS: { type: DataTypes.INTEGER, references: { model: 'HocSinhs', key: 'maHS' } },
        maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } }
    });

    return HocSinh_Lops;
};
