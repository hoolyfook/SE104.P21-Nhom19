// migrations/YYYYMMDDHHMMSS-create-monhocs.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MonHocs', {
      maMon: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      tenMon: {
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
    await queryInterface.dropTable('MonHocs');
  },
};
