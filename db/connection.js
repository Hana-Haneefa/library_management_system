import mysql from "mysql2/promise";

// module.exports = async function connect() {
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   });
//   return connection;
// };

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true, // Wait for connections when the pool is full without failing
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Unlimited queueing of connection requests (0 means no limit)
});

const promisePool = pool.promise(); // Create a promise-based pool for easier async/await usage

export default promisePool;
