// models/BangDiems.js
module.exports = (sequelize, DataTypes) => {
    const BangDiems = sequelize.define("BangDiems", {
        maHS: { type: DataTypes.INTEGER, references: { model: 'HocSinhs', key: 'maHS' } },
        maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
        maMon: { type: DataTypes.STRING, references: { model: 'MonHocs', key: 'maMon' } },
        hocKy: { type: DataTypes.ENUM('I', 'II'), allowNull: false },
        diem15p: { type: DataTypes.FLOAT },
        diem1Tiet: { type: DataTypes.FLOAT },
        diemTB: { type: DataTypes.FLOAT }
    });

    BangDiems.associate = function(models) {
        BangDiems.belongsTo(models.HocSinhs, { foreignKey: 'maHS' });
        BangDiems.belongsTo(models.Lops, { foreignKey: 'maLop' });
        BangDiems.belongsTo(models.MonHocs, { foreignKey: 'maMon' });
    };

    return BangDiems;
};
