const Budget = require('../models/budget');
const Transaction = require('../models/transaction');

const createBudget = async (req, res) => {
    try {
        const { name, targetAmount } = req.body;
        const userId = req.user.userId;
        const budget = await Budget.create({ name, targetAmount, userId });
        res.status(201).json({ message: 'Budget created successfully', budget });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const addTransaction = async (req, res) => {
    try {
        const { type, amount, category } = req.body;
        const budgetId = req.params.budgetId;
        const transaction = await Transaction.create({ type, amount, category, budgetId });
        res.status(201).json({ message: 'Transaction added successfully', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getBudgetOverview = async (req, res) => {
    try {
         const budgetId = req.params.budgetId;
          const budget = await Budget.findOne({where: {id:budgetId}})
          if(!budget){
            return res.status(404).json({message: "Budget not found"})
          }
         const transactions = await Transaction.findAll({where: {budgetId}})

        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
            } else if (transaction.type === 'expense') {
                totalExpenses += transaction.amount;
            }
        });
          const remainingBalance = budget.targetAmount - totalExpenses + totalIncome
        res.status(200).json({
            budget,
            totalIncome,
            totalExpenses,
            remainingBalance,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTransactionHistory = async (req, res) => {
    try {
         const budgetId = req.params.budgetId;
         const page = parseInt(req.query.page) || 1
         const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const transactions = await Transaction.findAll({
             where: { budgetId },
           limit,
           offset
       });
        res.status(200).json({ transactions, page, limit });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = { createBudget, addTransaction, getBudgetOverview, getTransactionHistory };
