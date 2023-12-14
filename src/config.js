require('dotenv').config();

module.exports = {
    
    BASE_URL: 'http://localhost:5000',
    KEY_TOKEN:'Q0lNT0w=',

    //Configuração basa de dados
    DB_HOST: process.env.HOST,
    DB_USER: process.env.USER,
    DB_USER_PASS: process.env.PASSWORD,
    DB_DATABASE: process.env.DATABASE
    
  }