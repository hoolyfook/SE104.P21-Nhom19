// migrations/YYYYMMDDHHMMSS-create-hocsinh-lops.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('HocSinh_Lops', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        maHS: {
          type: Sequelize.INTEGER,
          references: {
            model: 'HocSinhs',
            key: 'id',
          },
        },
        maLop: {
          type: Sequelize.STRING,
          references: {
            model: 'Lops',
            key: 'maLop',
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
      await queryInterface.dropTable('HocSinh_Lops');
    },
  };
  