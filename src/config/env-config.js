const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
}