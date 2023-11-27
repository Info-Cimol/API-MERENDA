async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection({
      host: 'mysql.infocimol.com.br',
      port:'',
      user:'infocimol',
      password : 'c1i2m3o4l5',
      database: 'infocimol'
      
    });
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}

async function query(sql){
  const conn = await connect();
  const [rows] = await conn.query(sql);
  return rows;
}

module.exports={query}