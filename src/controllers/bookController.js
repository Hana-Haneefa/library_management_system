import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService";

export async function getAllBooksController(req, res) {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch books", details: error.message });
  }
}

export async function getBookByIdController(req, res) {
  const { id } = req.params;
  try {
    const book = await getBookById(id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json({ message: "Book fetched successfully", data: book });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch book", details: error.message });
  }
}

export async function createBookController(req, res) {
  const { title, author, isbn, genre, publisher, year, quantity } = req.body;
  if (
    !title?.trim() ||
    !author?.trim() ||
    !isbn?.trim() ||
    !genre?.trim() ||
    !publisher?.trim() ||
    !year ||
    !quantity
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newBook = await createBook({
      title,
      author,
      isbn,
      genre,
      publisher,
      year,
      quantity,
    });
    res
      .status(201)
      .json({ message: "Book created successfully", data: newBook });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create book", details: error.message });
  }
}

export async function updateBookController(req, res) {
  const { id } = req.params;
  const { title, author, isbn, genre, publisher, year, quantity } = req.body;
  try {
    const updatedBook = await updateBook(id, {
      title,
      author,
      isbn,
      genre,
      publisher,
      year,
      quantity,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res
      .status(200)
      .json({ message: "Book updated successfully", data: updatedBook });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update book", details: error.message });
  }
}

export async function deleteBookController(req, res) {
  const { id } = req.params;
  try {
    const result = await deleteBook(id);
    res.status(200).json({ message: result.message });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete book", details: error.message });
  }
}
