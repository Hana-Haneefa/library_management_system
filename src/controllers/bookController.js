import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService.js";

// controller for get all books
export async function getAllBooksController(req, res) {
  try {
    const books = await getAllBooks();
    res
      .status(200)
      .json({ message: "Books fetched successfully", data: books });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch books", details: error.message });
  }
}

// controller for get book by id
export async function getBookByIdController(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid book ID" });
  }
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

// controller for create book
export async function createBookController(req, res) {
  const { title, author, isbn, genre, publisher, year, quantity } = req.body;
  const coverImg = req.file ? req.file.filename : null;
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
      coverImg,
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

// controller for update book
export async function updateBookController(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid book ID" });
  }
  const { title, author, isbn, genre, publisher, year, quantity } = req.body;

  // Validate provided fields
  if (title !== undefined && !title?.trim()) {
    return res.status(400).json({ error: "Title cannot be empty" });
  }
  if (author !== undefined && !author?.trim()) {
    return res.status(400).json({ error: "Author cannot be empty" });
  }
  if (isbn !== undefined && !isbn?.trim()) {
    return res.status(400).json({ error: "ISBN cannot be empty" });
  }
  if (genre !== undefined && !genre?.trim()) {
    return res.status(400).json({ error: "Genre cannot be empty" });
  }
  if (publisher !== undefined && !publisher?.trim()) {
    return res.status(400).json({ error: "Publisher cannot be empty" });
  }
  if (year !== undefined && (isNaN(year) || year <= 0)) {
    return res.status(400).json({ error: "Year must be a positive number" });
  }
  if (quantity !== undefined && (isNaN(quantity) || quantity < 0)) {
    return res
      .status(400)
      .json({ error: "Quantity must be a non-negative number" });
  }

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

// controller for delete book
export async function deleteBookController(req, res) {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid book ID" });
  }
  try {
    const result = await deleteBook(id);
    res.status(200).json({ message: result.message });
  } catch (error) {
    if (error.message === "Book not found") {
      return res.status(404).json({ error: "Book not found" });
    }
    res
      .status(500)
      .json({ error: "Failed to delete book", details: error.message });
  }
}
