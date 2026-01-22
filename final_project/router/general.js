const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    if (isValid(username)) {
      users.push({ username, password });
      return res.status(200).json({ message: "User successfully registered" });
    }
    return res.status(404).json({ message: "User already exists!" });
  }
  return res.status(404).json({ message: "Unable to register user." });
});

public_users.get('/', (req, res) => {
  res.status(200).send(JSON.stringify(books, null, 2));
});

public_users.get('/isbn/:isbn', (req, res) => {
  res.status(200).json(books[req.params.isbn]);
});

public_users.get('/author/:author', (req, res) => {
  const result = [];
  for (let key in books)
    if (books[key].author === req.params.author)
      result.push(books[key]);
  res.status(200).json(result);
});

public_users.get('/title/:title', (req, res) => {
  const result = [];
  for (let key in books)
    if (books[key].title === req.params.title)
      result.push(books[key]);
  res.status(200).json(result);
});

public_users.get('/review/:isbn', (req, res) => {
  res.status(200).json(books[req.params.isbn].reviews);
});

public_users.get('/async/books', async (req, res) => {
  const response = await axios.get('http://localhost:5000/');
  res.status(200).json(response.data);
});

public_users.get('/async/isbn/:isbn', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/isbn/${req.params.isbn}`);
  res.status(200).json(response.data);
});

public_users.get('/async/author/:author', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
  res.status(200).json(response.data);
});

public_users.get('/async/title/:title', async (req, res) => {
  const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
  res.status(200).json(response.data);
});

module.exports.general = public_users;
