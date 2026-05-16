require('dotenv').config();
module.exports = {
  client: 'mysql',
  connection: {
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PASSWORD,
    host: process.env.SERVER_HOST,
    database: process.env.SERVER_DATABASE,
    port: process.env.SERVER_DB_PORT
  },
  useNullAsDefault: true
};
 migrations: {
    tableName: 'migrations',
    directory: ${__dirname} /backend/src/database/migrations 
 }