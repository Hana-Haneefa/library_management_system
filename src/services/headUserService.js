import pool from "../../db/connection.js";

export async function addHeadUser(user) {
  try {
    const { name, email, password, role } = user;
    const [newUser] = await pool.query(
      `INSERT INTO headusers (hName, hEmail, hPassword, hRole) VALUES (?, ?, ?, ?)`,
      [name, email, password, role],
    );
    const [createdUser] = await pool.query(
      `SELECT * FROM headusers WHERE hId = ?`,
      [newUser.insertId],
    );
    return createdUser;
  } catch (err) {
    console.error("Error adding head user:", err);
    throw err;
    return null;
  }
}

// login head user
export async function loginAuth(email) {
  try {
    const [user] = await pool.query(
      `SELECT * FROM headusers WHERE hEmail = ?`,
      [email],
    );
    if (!user) {
      return null;
    }
    return user;
    console.log(user[0]);
  } catch (err) {
    console.error("Error logging in head user:", err);
    throw err;
  }
}
