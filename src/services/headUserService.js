import pool from "../../db/connection.js";
import bcrypt from "bcrypt";

//add head user
export async function addHeadUser(user) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
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

//view all head users
export async function allHeadUsers() {
  try {
    const [rows] = await pool.query(`SELECT * FROM headusers`);
    if (rows.length === 0) {
      return null;
    }
    return rows;
  } catch (err) {
    throw new Error(`Error occured: ${err.message}`);
  }
}

//view head users by id
export async function headUserById(id) {
  try {
    const [user] = await pool.query(`SELECT * FROM headusers WHERE hId=?`, [
      id,
    ]);

    if (user.length === 0) {
      return null;
    }

    return user[0];
  } catch (error) {
    throw new Error(`Error occurs: ${error.message}`);
  }
}

//edit head users
export async function editHeadUser(id, name, email, role) {
  try {
    const [user] = await pool.query(
      `UPDATE headusers SET hName =?, hEmail =?, hRole=? WHERE hId =?`,
      [name, email, role, id],
    );
    if (user.affectedRows === 0) {
      return null;
    }

    const [updatedUser] = await pool.query(
      `SELECT * FROM headusers WHERE hId =?`,
      [id],
    );
    return updatedUser[0];
  } catch (error) {
    throw new Error(`Error occours: ${error.message}`);
  }
}

//delete head user
export async function deleteHeadUser(id) {
  try {
    const [target] = await pool.query(`SELECT * FROM headusers where hId=?`, [
      id,
    ]);
    if (target.length === 0) {
      return null;
    }
    const [deletedTarget] = await pool.query(
      `DELETE FROM headusers WHERE hId=?`,
      [id],
    );
    if (deletedTarget.affectedRows === 0) {
      return null;
    }

    return target[0];
  } catch (error) {
    throw new Error(`Error occured: ${error.message}`);
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
    return user[0];
  } catch (err) {
    console.error("Error logging in head user:", err);
    throw err;
  }
}
