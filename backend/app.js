const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/budgets', budgetRoutes);

app.get('/', (req,res)=>{
  res.send('Welcome to FinTech Project')
})

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
