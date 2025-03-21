// models/QuyDinhs.js
module.exports = (sequelize, DataTypes) => {
    const QuyDinhs = sequelize.define("QuyDinhs", {
        moTa: { type: DataTypes.TEXT, allowNull: false },
        giaTri: { type: DataTypes.INTEGER, allowNull: true }
    });

    return QuyDinhs;
};
