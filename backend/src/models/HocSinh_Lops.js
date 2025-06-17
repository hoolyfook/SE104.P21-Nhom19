'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HocSinh_Lops extends Model {
    static associate(models) {
      // Ensure this association is defined
      HocSinh_Lops.belongsTo(models.Lops, { foreignKey: 'maLop', as: 'Lops' });
      HocSinh_Lops.belongsTo(models.Users, { foreignKey: 'maHS', as: 'Users' });
    }
  }

  HocSinh_Lops.init({
    maHS: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'maHS' } },
    maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } }
  }, {
    sequelize,
    modelName: 'HocSinh_Lops',
  });

  return HocSinh_Lops;
};
