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
    const { title, author, isbn, genre, publisher, year, quantity, coverImg } =
      book;

    const [result] = await pool.query(
      "INSERT INTO books (bTitle, bAuthor, bIsbn, bGenre, bPublisher, bYear, bQuantity, coverImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [title, author, isbn, genre, publisher, year, quantity, coverImg],
    );

    const bookId = result.insertId;

    //generate QR using book details
    const qrContent = `ID:${bookId}|Title:${title}|Author:${author}|ISBN:${isbn}`;
    const qrBase64 = await qrcode.toDataURL(qrContent, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    });

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
export async function searchBookData(filters, { offset, limit }) {
  let sql = "SELECT * FROM books WHERE 1=1";
  const params = [];

  if (filters.query) {
    sql += " AND (bTitle LIKE ? OR bAuthor LIKE ? OR bGenre LIKE ?)";
    params.push(
      `%${filters.query}%`,
      `%${filters.query}%`,
      `%${filters.query}%`,
    );
  }
  if (filters.isbn) {
    sql += " AND bISBN LIKE ?";
    params.push(`%${filters.isbn}%`);
  }
  if (filters.genre) {
    sql += " AND bGenre = ?"; // exact match, since genre comes from a dropdown
    params.push(filters.genre);
  }

  sql += " ORDER BY bTitle LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const [rows] = await pool.query(sql, params);
  return rows;
}

export async function countBooksData(filters) {
  let sql = "SELECT COUNT(*) AS total FROM books WHERE 1=1";
  const params = [];

  if (filters.query) {
    sql += " AND (bTitle LIKE ? OR bAuthor LIKE ? OR bGenre LIKE ?)";
    params.push(
      `%${filters.query}%`,
      `%${filters.query}%`,
      `%${filters.query}%`,
    );
  }
  if (filters.isbn) {
    sql += " AND bISBN LIKE ?";
    params.push(`%${filters.isbn}%`);
  }
  if (filters.genre) {
    sql += " AND bGenre = ?";
    params.push(filters.genre);
  }

  const [rows] = await pool.query(sql, params);
  return rows[0].total;
}

export async function searchBookService({ query, genre, page, limit }) {
  const filters = {};
  if (query) filters.query = query;
  if (genre) filters.genre = genre;

  const offset = (page - 1) * limit;

  const [books, total] = await Promise.all([
    searchBookData(filters, { offset, limit }),
    countBooksData(filters),
  ]);

  return {
    books,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
    },
  };
}

export async function getDistinctGenres() {
  const [rows] = await pool.query(
    "SELECT DISTINCT bGenre FROM books WHERE bGenre IS NOT NULL ORDER BY bGenre",
  );
  return rows.map((r) => r.bGenre);
}
