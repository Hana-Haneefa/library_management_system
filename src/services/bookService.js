import pool from "../../db/connection.js";
import qrcode from "qrcode";

export async function getAllBooks() {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    return rows;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

export async function getBookById(id) {
  try {
    const [rows] = await pool.query("SELECT * FROM books WHERE bId = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
}

export async function createBook(book) {
  try {
    const { title, author, isbn, genre, publisher, year, quantity } = book;

    const [result] = await pool.query(
      "INSERT INTO books (bTitle, bAuthor, bIsbn, bGenre, bPublisher, bYear, bQuantity) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, author, isbn, genre, publisher, year, quantity],
    );

    const bookId = result.insertId;

    //generate QR using book details
    const qrContent = `ID:${bookId}|Title:${title}|Author:${author}|ISBN:${isbn}`;
    const qrBase64 = await qrcode.toDataURL(qrContent);

    //save QR back to the same row
    await pool.query(`UPDATE books SET bQR =? WHERE bId = ?`, [
      qrBase64,
      bookId,
    ]);

    const [newBook] = await pool.query("SELECT * FROM books WHERE bId = ?", [
      bookId,
    ]);

    return newBook[0];
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
}

export async function updateBook(id, book) {
  try {
    const columns = [];
    const values = [];

    if (book.title !== undefined) {
      columns.push("bTitle = ?");
      values.push(book.title);
    }
    if (book.author !== undefined) {
      columns.push("bAuthor = ?");
      values.push(book.author);
    }
    if (book.isbn !== undefined) {
      columns.push("bIsbn = ?");
      values.push(book.isbn);
    }
    if (book.genre !== undefined) {
      columns.push("bGenre = ?");
      values.push(book.genre);
    }
    if (book.publisher !== undefined) {
      columns.push("bPublisher = ?");
      values.push(book.publisher);
    }
    if (book.year !== undefined) {
      columns.push("bYear = ?");
      values.push(book.year);
    }
    if (book.quantity !== undefined) {
      columns.push("bQuantity = ?");
      values.push(book.quantity);
    }

    if (columns.length === 0) {
      throw new Error("No valid fields to update");
    }

    values.push(id);

    const [result] = await pool.query(
      `UPDATE books SET ${columns.join(", ")} WHERE bId = ?`,
      values,
    );

    if (result.affectedRows === 0) {
      return null;
    }

    const [updatedBook] = await pool.query(
      "SELECT * FROM books WHERE bId = ?",
      [id],
    );
    return updatedBook[0];
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
}

export async function deleteBook(id) {
  try {
    const [result] = await pool.query("DELETE FROM books WHERE bId = ?", [id]);
    if (result.affectedRows === 0) {
      throw new Error("Book not found");
    }
    return { message: "Book deleted successfully" };
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
}
