require('dotenv').config();
module.exports = {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
    username: process.env.DB_USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    //port: process.env.DB_PORT,
    port: parseInt(process.env.DB_PORT, 10),
    define: {
        timestamps: false,
        underscored: false,
        underscoredAll: false,
    }
}
