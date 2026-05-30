import 'dotenv/config.js';

export default {
  client: 'mysql2',
  connection: {
    user: process.env.SERVER_USER,
    password: process.env.SERVER_PASSWORD,
    host: process.env.SERVER_HOST,
    database: process.env.SERVER_DATABASE,
    port: process.env.SERVER_DB_PORT
  },
  useNullAsDefault: true,
  migrations: { 
    tableName: 'migrations',
    directory: './src/database/migrations'
  } 
};