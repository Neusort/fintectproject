const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const User = require('./user')
const Budget = sequelize.define('Budget', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  targetAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
});
Budget.belongsTo(User, {foreignKey: 'userId'})
module.exports = Budget;
