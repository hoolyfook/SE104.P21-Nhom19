// migrations/YYYYMMDDHHMMSS-create-giangvien-lop-mons.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('GiangVien_Lop_Mons', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        maGV: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
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
        maMon: {
          type: Sequelize.STRING,
          references: {
            model: 'MonHocs',
            key: 'maMon',
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
      await queryInterface.dropTable('GiangVien_Lop_Mons');
    },
  };
  