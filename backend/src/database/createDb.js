require('dotenv').config();
const mysql = require('mysql2/promise');

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.SERVER_HOST || '127.0.0.1',
    user: process.env.SERVER_USER || 'root',
    password: process.env.SERVER_PASSWORD || 'root',
    port: process.env.SERVER_DB_PORT || 3306
  });

  const dbName = process.env.SERVER_DATABASE || 'sabor_brasileiro';
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  console.log(`Banco de dados '${dbName}' verificado/criado com sucesso.`);
  await connection.end();
}

createDatabase().catch(err => {
  console.error('Erro ao criar o banco de dados:', err);
  process.exit(1);
});
