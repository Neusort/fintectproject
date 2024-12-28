const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const Budget = require('./budget');
const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
});
Transaction.belongsTo(Budget, {foreignKey: 'budgetId'})

module.exports = Transaction;
