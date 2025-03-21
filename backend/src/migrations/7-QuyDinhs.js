// migrations/YYYYMMDDHHMMSS-create-quydinhs.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('QuyDinhs', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        moTa: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        giaTri: {
          type: Sequelize.INTEGER,
          allowNull: true,
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
      await queryInterface.dropTable('QuyDinhs');
    },
  };
  