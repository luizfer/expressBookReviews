const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");

const public_users = express.Router();

// Task 10 – Get all books (async/await)
public_users.get('/', async (req, res) => {
  try {
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 11 – Get book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  try {
    const book = books[req.params.isbn];
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book" });
  }
});

// Task 12 – Get books by author
public_users.get('/author/:author', async (req, res) => {
  try {
    const result = [];
    Object.keys(books).forEach(key => {
      if (books[key].author === req.params.author) {
        result.push(books[key]);
      }
    });

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found for this author" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 13 – Get books by title
public_users.get('/title/:title', async (req, res) => {
  try {
    const result = [];
    Object.keys(books).forEach(key => {
      if (books[key].title === req.params.title) {
        result.push(books[key]);
      }
    });

    if (result.length === 0) {
      return res.status(404).json({ message: "No books found with this title" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 5 – Get reviews
public_users.get('/review/:isbn', async (req, res) => {
  try {
    const book = books[req.params.isbn];
    if (!book || Object.keys(book.reviews).length === 0) {
      return res.status(200).json({ message: "No reviews found for this book" });
    }
    res.status(200).json(book.reviews);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reviews" });
  }
});

module.exports.general = public_users;
