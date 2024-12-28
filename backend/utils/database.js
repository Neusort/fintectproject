const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
    host: config.database.host,
    dialect: 'mysql'
});

const initDB = async() =>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
         await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initDB()

module.exports = {sequelize}

