// migrations/YYYYMMDDHHMMSS-create-users.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        hoTen: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        gioiTinh: {
          type: Sequelize.ENUM('Male', 'Female'),
          allowNull: false,
        },
        ngaySinh: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        diaChi: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        mk: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        groupUserId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'GroupUsers',
            key: 'id',
          },
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
      await queryInterface.dropTable('Users');
    },
  };
  