import pool from "../../db/connection.js";

export async function addBorrowData(borrowData) {
  try {
    const { studentId, MonitorId, status } = borrowData;
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);
    const formattedReturnDate = returnDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const [result] = await pool.query(
      "INSERT INTO borrows (brStudentId, brMonitorId, brReturnDate, brStatus) VALUES (?, ?, ?, ?)",
      [studentId, MonitorId, formattedReturnDate, status],
    );
    if (result.affectedRows === 0) {
      throw new Error("Failed to add borrow data");
    }
    const borrowId = result.insertId;
    const [newBorrowData] = await pool.query(
      "SELECT * FROM borrows WHERE brId = ?",
      [borrowId],
    );
    return newBorrowData[0];
  } catch (err) {
    throw new Error(`Error adding borrow data: ${err.message}`);
  }
}

export async function getAllBorrowData() {
  try {
    const [rows] = await pool.query("SELECT * FROM borrows");
    return rows;
    if (rows.effectedRows === 0) {
      throw new Error("No borrow data found");
    }
  } catch (err) {
    throw new Error(`Error fetching borrow data: ${err.message}`);
  }
}

export async function getBorrowDataById(borrowId) {
  try {
    const [rows] = await pool.query("SELECT * FROM borrows WHERE brId = ?", [
      borrowId,
    ]);
    if (rows.effectedRows === 0) {
      throw new Error("No borrow data found with the given ID");
    }
    return rows[0];
  } catch (err) {
    throw new Error(`Error fetching borrow data: ${err.message}`);
  }
}

// export async function updateBorrowData(borrowId, updatedData) {
//   try {
//     const [existingBorrow] = await pool.query(
//       "SELECT * FROM borrows WHERE brId = ?",
//       [borrowId],
//     );
//     if (existingBorrow.length === 0) {
//       throw new Error("Borrow data not found with the given ID");
//     }
//     const { status } = updatedData;
//     const [result] = await pool.query(
//       "UPDATE borrows SET brStatus = ? WHERE brId = ?",
//       [status, borrowId],
//     );
//     if (result.affectedRows === 0) {
//       throw new Error("Failed to update borrow data");
//     }

//     const [updatedBorrow] = await pool.query(
//       `SELECT * FROM borrows WHERE brId =?`,
//       [borrowId],
//     );
//     return updatedBorrow[0];
//   } catch (err) {
//     throw new Error(`Error updating borrow data: ${err.message}`);
//   }
// }

export async function updateBorrowData(borrowId, updatedData) {
  try {
    const [existingBorrow] = await pool.query(
      "SELECT * FROM borrows WHERE brId = ?",
      [borrowId],
    );
    if (existingBorrow.length === 0) {
      throw new Error("Borrow data not found with the given ID");
    }

    const { status } = updatedData;
    const allowedStatuses = ["borrowed", "returned"];
    if (!status || !allowedStatuses.includes(status)) {
      throw new Error(`Invalid or missing status value: ${status}`);
    }

    const [result] = await pool.query(
      "UPDATE borrows SET brStatus = ? WHERE brId = ?",
      [status, borrowId],
    );
    if (result.affectedRows === 0) {
      throw new Error("Failed to update borrow data");
    }

    const [updatedBorrow] = await pool.query(
      "SELECT * FROM borrows WHERE brId = ?",
      [borrowId],
    );
    return updatedBorrow[0];
  } catch (err) {
    throw new Error(`Error updating borrow data: ${err.message}`);
  }
}

export async function deleteBorrowData(borrowId) {
  try {
    const [targetBorrow] = await pool.query(
      "SELECT * FROM borrows WHERE brId = ?",
      [borrowId],
    );
    if (targetBorrow.affectedRows === 0) {
      throw new Error("Borrow data not found with the given ID");
    }
    const [result] = await pool.query("DELETE FROM borrows WHERE brId = ?", [
      borrowId,
    ]);
    return targetBorrow[0];
  } catch (err) {
    throw new Error(`Error deleting borrow data: ${err.message}`);
  }
}
