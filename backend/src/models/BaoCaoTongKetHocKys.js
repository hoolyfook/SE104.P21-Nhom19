// models/BaoCaoTongKetHocKy.js
module.exports = (sequelize, DataTypes) => {
    const BaoCaoTongKetHocKys = sequelize.define("BaoCaoTongKetHocKys", {
        maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
        siSo: { type: DataTypes.INTEGER },
        soLuongDat: { type: DataTypes.INTEGER },
        tiLe: { type: DataTypes.FLOAT },
        hocKy: { type: DataTypes.ENUM('I', 'II'), allowNull: false }
    });

    BaoCaoTongKetHocKys.associate = function(models) {
        BaoCaoTongKetHocKys.belongsTo(models.Lops, { foreignKey: 'maLop' });
    };

    return BaoCaoTongKetHocKys;
};
