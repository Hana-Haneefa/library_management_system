import pool from "../../db/connection.js";

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
    const [rows] = await pool.query("SELECT * FROM books WHERE id = ?", [id]);
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
      "INSERT INTO books (title, author, isbn, genre, publisher, year, quantity) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, author, isbn, genre, publisher, year, quantity],
    );
    const [newBook] = await pool.query("SELECT * FROM books WHERE id = ?", [
      result.insertId,
    ]);
    return newBook[0];
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
}

export async function updateBook(id, book) {
  try {
    const { title, author, isbn, genre, publisher, year, quantity } = book;
    const columns = [];
    const values = [];

    if (book.title) {
      columns.push("title = ?");
      values.push(book.title);
    }
    if (book.author) {
      columns.push("author = ?");
      values.push(book.author);
    }
    if (book.isbn) {
      columns.push("isbn = ?");
      values.push(book.isbn);
    }
    if (book.genre) {
      columns.push("genre = ?");
      values.push(book.genre);
    }
    if (book.publisher) {
      columns.push("publisher = ?");
      values.push(book.publisher);
    }
    if (book.year) {
      columns.push("year = ?");
      values.push(book.year);
    }
    if (book.quantity) {
      columns.push("quantity = ?");
      values.push(book.quantity);
    }

    if (columns.length === 0) {
      throw new Error("No valid fields to update");
    }

    values.push(id); // Add the id to the end of the values array for the WHERE clause(because there is only one ? left in the query for the id)

    await pool.query(
      `UPDATE books SET ${columns.join(", ")} WHERE id = ?`,
      values,
    );

    const [updatedBook] = await pool.query("SELECT * FROM books WHERE id = ?", [
      id,
    ]);
    return updatedBook[0];
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
}

export async function deleteBook(id) {
  try {
    await pool.query("DELETE FROM books WHERE id = ?", [id]);
    return { message: "Book deleted successfully" };
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
}
