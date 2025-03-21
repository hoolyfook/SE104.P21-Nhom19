// models/GiangVien_Lop_Mons.js
module.exports = (sequelize, DataTypes) => {
    const GiangVien_Lop_Mons = sequelize.define("GiangVien_Lop_Mons", {
        maGV: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'maUser' } },
        maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
        maMon: { type: DataTypes.STRING, references: { model: 'MonHocs', key: 'maMon' } }
    });

    return GiangVien_Lop_Mons;
};
