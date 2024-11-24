const Book = require("../models/book");

// Fetch all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Error fetching books" });
  }
};

// Add a new book
const addBook = async (req, res) => {
  const { title, author, isbn, publishedYear } = req.body;

  if (!title || !author || !isbn || !publishedYear) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newBook = new Book({ title, author, isbn, publishedYear });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: "Error adding book" });
  }
};

// Update a book by ID
const updateBook = async (req, res) => {
  const { title, author, isbn, publishedYear } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, isbn, publishedYear },
      { new: true, runValidators: true }
    );

    if (!updatedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: "Error updating book" });
  }
};

// Delete a book by ID
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting book" });
  }
};

// Get a random book recommendation
const getRecommendation = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0)
      return res.status(404).json({ error: "No books available" });

    const randomBook = books[Math.floor(Math.random() * books.length)];
    res.status(200).json(randomBook);
  } catch (err) {
    res.status(500).json({ error: "Error fetching recommendations" });
  }
};

// Mark a book as favorite
const markAsFavorite = async (req, res) => {
  try {
    const favoriteBook = await Book.findByIdAndUpdate(
      req.params.id,
      { isFavorite: true },
      { new: true }
    );

    if (!favoriteBook) return res.status(404).json({ error: "Book not found" });

    res
      .status(200)
      .json({ message: "Book marked as favorite", book: favoriteBook });
  } catch (err) {
    res.status(500).json({ error: "Error marking book as favorite" });
  }
};

// Fetch favorite books
const favouriteBooks = async (req, res) => {
  try {
    const favoriteBooks = await Book.find({ isFavorite: true });
    res.status(200).json(favoriteBooks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorite books", error });
  }
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  deleteBook,
  getRecommendation,
  markAsFavorite,
  favouriteBooks,
};
