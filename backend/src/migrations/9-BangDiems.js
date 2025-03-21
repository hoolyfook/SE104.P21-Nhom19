// migrations/YYYYMMDDHHMMSS-create-bangdiems.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BangDiems', {
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
      maMon: {
        type: Sequelize.STRING,
        references: {
          model: 'MonHocs',
          key: 'maMon',
        },
      },
      hocKy: {
        type: Sequelize.ENUM('I', 'II'),
        allowNull: false,
      },
      diem15p: {
        type: Sequelize.FLOAT,
      },
      diem1Tiet: {
        type: Sequelize.FLOAT,
      },
      diemTB: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable('BangDiems');
  },
};
