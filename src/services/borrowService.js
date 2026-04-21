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
