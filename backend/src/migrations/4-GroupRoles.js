// migrations/YYYYMMDDHHMMSS-create-grouproles.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('GroupRoles', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        GroupID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'GroupUsers',
            key: 'id',
          },
        },
        RoleID: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Roles',
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
      await queryInterface.dropTable('GroupRoles');
    },
  };
  