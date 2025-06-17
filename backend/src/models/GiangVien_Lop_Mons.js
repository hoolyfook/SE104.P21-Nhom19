'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GiangVien_Lop_Mons extends Model {
    static associate(models) {
      // GiangVien_Lop_Mons belongs to Users (Teachers) via 'maGV'
      GiangVien_Lop_Mons.belongsTo(models.Users, {
        foreignKey: 'maGV',
        as: 'Users' // Alias for teachers (GiangVien)
      });

      // GiangVien_Lop_Mons belongs to Lops (Classes) via 'maLop'
      GiangVien_Lop_Mons.belongsTo(models.Lops, {
        foreignKey: 'maLop',
        as: 'Lops' // Alias for classes (Lop)
      });

      // GiangVien_Lop_Mons belongs to MonHocs (Subjects) via 'maMon'
      GiangVien_Lop_Mons.belongsTo(models.MonHocs, {
        foreignKey: 'maMon',
        as: 'MonHocs' // Alias for subjects (MonHoc)
      });
    }
  }

  GiangVien_Lop_Mons.init({
    maGV: { type: DataTypes.INTEGER, references: { model: 'Users', key: 'maUser' } },
    maLop: { type: DataTypes.STRING, references: { model: 'Lops', key: 'maLop' } },
    maMon: { type: DataTypes.STRING, references: { model: 'MonHocs', key: 'maMon' } }
  }, {
    sequelize,
    modelName: 'GiangVien_Lop_Mons',
  });

  return GiangVien_Lop_Mons;
};
