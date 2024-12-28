const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { authenticate } = require('../middleware/auth');


router.post('/', authenticate,  budgetController.createBudget);
router.post('/:budgetId/transactions', authenticate, budgetController.addTransaction);
router.get('/:budgetId', authenticate, budgetController.getBudgetOverview);
router.get('/:budgetId/transactions', authenticate, budgetController.getTransactionHistory);
module.exports = router;
