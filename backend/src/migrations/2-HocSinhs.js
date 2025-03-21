// migrations/YYYYMMDDHHMMSS-create-hocsinhs.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('HocSinhs', {
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
        await queryInterface.dropTable('HocSinhs');
    },
};
