import pool from "../../db/connection.js";

export async function addBorrowData(borrowData) {
  try {
    const { studentId, monitorId, status, bookId } = borrowData;
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);
    const formattedReturnDate = returnDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // Check book quantity first
    const [bookRows] = await pool.query(
      "SELECT bQuantity FROM books WHERE bId = ?",
      [bookId],
    );
    if (bookRows.length === 0) {
      throw new Error("Book not found");
    }
    if (bookRows[0].bQuantity <= 0) {
      throw new Error("No copies available to borrow");
    }

    // Decrement the book quantity by 1
    await pool.query(
      "UPDATE books SET bQuantity = bQuantity - 1 WHERE bId = ?",
      [bookId],
    );

    const [result] = await pool.query(
      "INSERT INTO borrows (brStudentId, brMonitorId, brReturnDate, brStatus, brBookId) VALUES (?, ?, ?, ?, ?)",
      [studentId, monitorId, formattedReturnDate, status, bookId],
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
    const [rows] = await pool.query(
      `SELECT b.*, bk.bTitle, bk.bAuthor, bk.bGenre, bk.bISBN 
       FROM borrows b 
       LEFT JOIN books bk ON b.brBookId = bk.bId`,
    );
    return rows;
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

    const oldStatus = existingBorrow[0].brStatus;
    const bookId = existingBorrow[0].brBookId;

    if (oldStatus !== status) {
      if (status === "returned") {
        // Increment book quantity
        await pool.query(
          "UPDATE books SET bQuantity = bQuantity + 1 WHERE bId = ?",
          [bookId],
        );
      } else if (status === "borrowed") {
        // Check book quantity first
        const [bookRows] = await pool.query(
          "SELECT bQuantity FROM books WHERE bId = ?",
          [bookId],
        );
        if (bookRows.length === 0) {
          throw new Error("Book not found");
        }
        if (bookRows[0].bQuantity <= 0) {
          throw new Error("No copies available to borrow");
        }
        // Decrement book quantity
        await pool.query(
          "UPDATE books SET bQuantity = bQuantity - 1 WHERE bId = ?",
          [bookId],
        );
      }
    }

    // ── set actualReturnDate when marking as returned ──
    if (status === "returned") {
      const now = new Date();
      const formattedNow = now.toISOString().slice(0, 19).replace("T", " ");

      const [result] = await pool.query(
        "UPDATE borrows SET brStatus = ?, brActualReturnDate = ? WHERE brId = ?",
        [status, formattedNow, borrowId],
      );
      if (result.affectedRows === 0) {
        throw new Error("Failed to update borrow data");
      }
    } else {
      const [result] = await pool.query(
        "UPDATE borrows SET brStatus = ?, brActualReturnDate = NULL WHERE brId = ?",
        [status, borrowId],
      );
      if (result.affectedRows === 0) {
        throw new Error("Failed to update borrow data");
      }
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

export async function getActiveBorrowByBookId(bId) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM borrows WHERE brBookId = ? AND brActualReturnDate IS NULL",
      [bId],
    );
    return rows[0] || null; // Return the first active borrow record or null if none found
  } catch (err) {
    throw new Error(`Error fetching active borrow data: ${err.message}`);
  }
}
