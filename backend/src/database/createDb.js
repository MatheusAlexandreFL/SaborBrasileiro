import 'dotenv/config.js';
import mysql from 'mysql2/promise';

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.SERVER_HOST,
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PASSWORD,
    port: process.env.SERVER_DB_PORT
  });

  const dbName = process.env.SERVER_DATABASE;
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  console.log(`Banco de dados '${dbName}' verificado/criado com sucesso.`);
  await connection.end();
}

createDatabase().catch(err => {
  console.error('Erro ao criar o banco de dados:', err);
  process.exit(1);
});
