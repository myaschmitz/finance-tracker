const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_database_user',
    host: 'localhost',
    database: 'your_database_name',
    password: 'your_password',
    port: 5432, // Default PostgreSQL port
  });