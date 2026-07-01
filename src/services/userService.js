import pool from "../../db/connection.js";

export const getAllUsers = async () => {
  const [rows] = await pool.query(`SELECT * FROM users`);
  return rows;
};

export async function getUserById(id) {
  const [row] = await pool.query(`SELECT * FROM users WHERE uId =?`, [id]);
  return row;
}

export async function addUser(name, email, password) {
  const [info] = await pool.query(
    `INSERT INTO users (uName, uEmail, uPassword) VALUES (?,?,?)`,
    [name, email, password],
  );
  const [addedUser] = await pool.query(`SELECT * FROM users WHERE uId=?`, [
    info.insertId,
  ]);
  return addedUser;
}

export async function updateUser(id, name, email, password) {
  const [editUser] = await pool.query(
    `UPDATE users SET uName=?, uEmail=?, uPassword=? WHERE uId=?`,
    [name, email, password, id],
  );
  if (editUser.affectedRows === 0) {
    return null; // User not found
  }
  const [updatedUser] = await pool.query(`SELECT * FROM users WHERE uId=?`, [
    id,
  ]);
  return updatedUser[0]; // Return the updated user
}

export async function deleteUser(id) {
  const [target] = await pool.query(`SELECT * FROM users WHERE uId=?`, [id]);
  const [targetUser] = await pool.query(`DELETE FROM users WHERE uId=?`, [id]);
  if (targetUser.affectedRows > 0) {
    return target[0];
  }
  return null;
}

//student login
export async function studentLogin(email) {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE uEmail = ?`, [
      email,
    ]);
    if (rows.length === 0) {
      //.length returns 1 if there is a user with the email, 0 if there is no user with the email
      return null; // No user found with the provided email
    }
    return rows[0];
  } catch (err) {
    console.error("Error logging in student:", err);
  }
}
