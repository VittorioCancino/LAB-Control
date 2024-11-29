const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`)
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL: process.env.DATABASE_URL || null
}