// migrations/[timestamp]-create-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      hoTen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gioiTinh: {
        type: Sequelize.ENUM('Male', 'Female'),
        allowNull: false
      },
      ngaySinh: {
        type: Sequelize.DATE,
        allowNull: false
      },
      diaChi: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mk: {
        type: Sequelize.STRING,
        allowNull: false
      },
      groupUserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'GroupUsers',
          key: 'id'
        },
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
    await queryInterface.dropTable('Users');
  }
};
