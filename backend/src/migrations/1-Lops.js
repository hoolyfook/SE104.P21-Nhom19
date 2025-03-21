// migrations/YYYYMMDDHHMMSS-create-lops.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Lops', {
        maLop: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        tenLop: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        khoiLop: {
          type: Sequelize.ENUM('10', '11', '12'),
          allowNull: false,
        },
        siSo: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Lops');
    },
  };
  