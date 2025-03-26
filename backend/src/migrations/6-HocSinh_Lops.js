// migrations/[timestamp]-create-hocsinh-lops.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('HocSinh_Lops', {
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
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('HocSinh_Lops');
    }
  };
  