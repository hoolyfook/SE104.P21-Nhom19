// migrations/[timestamp]-create-bangdiems.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BangDiems', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      maHS: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        allowNull: false
      },
      maLop: {
        type: Sequelize.STRING,
        references: {
          model: 'Lops',
          key: 'maLop'
        },
        allowNull: false
      },
      maMon: {
        type: Sequelize.STRING,
        references: {
          model: 'MonHocs',
          key: 'maMon'
        },
        allowNull: false
      },
      hocKy: {
        type: Sequelize.ENUM('I', 'II'),
        allowNull: false
      },
      diem15p: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      diem1Tiet: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      diemTB: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BangDiems');
  }
};
