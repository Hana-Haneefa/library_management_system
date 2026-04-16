import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
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

async function getAllUsers() {
  const [rows] = await pool.query(`SELECT * FROM users`);
  return rows;
}

//const result = await getAllUsers();

//console.log(result);

async function addUser(name, email, password) {
  const [data] = await pool.query(
    `INSERT INTO users (uName, uEmail, uPassword) VALUES (?,?,?)`,
    [name, email, password],
  );
  return {
    id: data.insertId, //get the uID from insertID
    name,
    email,
  };
}

// const user = await addUser("nobara", "kugisaki@gmail.com", "2222");
// console.log(user);
export default pool;
