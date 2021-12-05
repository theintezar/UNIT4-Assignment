const express = require("express");

const books = require("../Express/books.json");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(books);
});



app.post("/books", (req, res) => {
  let newUsers = req.body;
  res.send({ ...newUsers, id: books.length + 1 });
});



app.get("/books/:id", (req, res) => {
  let id = req.params.id;
  let newUsers = books.filter((book) => book.id == id);
  res.send(newUsers);
});



app.patch("/books/:id", (req, res) => {
  let id = req.params.id;
  let FullBody = req.body;
  let newUsers = books.filter((book) => book.id == id);
  res.send({ ...newUsers[0], ...FullBody });
});



app.delete("/books/:id", (req, res) => {
  let id = req.params.id;
  let newUsers = books.filter((book) => book.id != id);
  res.send(newUsers);
});



app.listen(1111, () => {
  console.log("port running 1111");
});