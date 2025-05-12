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
        type: Sequelize.STRING,
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
    },
      {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('QuyDinhs');
  },
};
