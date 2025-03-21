// models/BaoCaoTongKetMons.js
module.exports = (sequelize, DataTypes) => {
    const BaoCaoTongKetMons = sequelize.define("BaoCaoTongKetMons", {
        maMon: { type: DataTypes.STRING, references: { model: 'MonHocs', key: 'maMon' } },
        hocKy: { type: DataTypes.ENUM('I', 'II'), allowNull: false },
        maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
        siSo: { type: DataTypes.INTEGER },
        soLuongDat: { type: DataTypes.INTEGER },
        tiLe: { type: DataTypes.FLOAT }
    });

    BaoCaoTongKetMons.associate = function(models) {
        BaoCaoTongKetMons.belongsTo(models.MonHocs, { foreignKey: 'maMon' });
        BaoCaoTongKetMons.belongsTo(models.Lops, { foreignKey: 'maLop' });
    };

    return BaoCaoTongKetMons;
};
