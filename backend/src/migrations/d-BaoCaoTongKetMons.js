// migrations/YYYYMMDDHHMMSS-create-baocaotongketmons.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BaoCaoTongKetMons', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      maMon: {
        type: Sequelize.STRING,
        references: {
          model: 'MonHocs',
          key: 'maMon',
        },
      },
      hocKy: {
        type: Sequelize.ENUM('I', 'II'),
        allowNull: false,
      },
      maLop: {
        type: Sequelize.STRING,
        references: {
          model: 'Lops',
          key: 'maLop',
        },
      },
      siSo: {
        type: Sequelize.INTEGER,
      },
      soLuongDat: {
        type: Sequelize.INTEGER,
      },
      tiLe: {
        type: Sequelize.FLOAT,
      },
      namHoc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BaoCaoTongKetMons');
  },
};
