require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    database: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'fintech_db'
    },
    secretKey: process.env.SECRET_KEY || 'your_secret_key'
};
