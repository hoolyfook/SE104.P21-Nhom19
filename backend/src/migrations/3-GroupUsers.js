// migrations/YYYYMMDDHHMMSS-create-groupusers.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('GroupUsers', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
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
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('GroupUsers');
    },
  };
  