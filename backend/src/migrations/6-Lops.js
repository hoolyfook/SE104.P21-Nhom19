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
      chuNhiem: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
    await queryInterface.dropTable('Lops');
  },
};
