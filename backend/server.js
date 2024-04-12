const express = require('express');
const {v4: uuid} = require('uuid');

class Book {
  constructor(id = uuid(), title = '', description = '', authors = '', favorite = '', fileCover = '', fileName = '') {
    this.id = id,
    this.title = title,
    this.description = description,
    this.authors = authors,
    this.favorite = favorite,
    this.fileCover = fileCover,
    this.fileName = fileName
  }
}

const store = {
  books : []
}

const app = express();
app.use(express.json());

app.get('/api/books', (req, res) => {
  const {books} = store;
  res.json(books);
})

app.get('/api/books/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const index = books.findIndex(elem => elem.id === id);
  if (index !== -1) {
    res.json(books[index]);
  } else {
    res.status(404);
    res.json('404 | такой книги не найдено');
  }
})

app.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
})

app.post('/api/books', (req, res) => {
  const {books} = store;
  const bodyBook = req.body;
  const newBook = new Book(...bodyBook);
  books.push(newBook);
  res.status(201);
  res.json(newBook);
  
})

app.put('/api/books/:id', (req, res) => {
  const {books} = store;
  const book = req.params
  const {id} = req.params;
  const index = books.findIndex(elem => elem.id === id);
  if (index !== -1) {
    books[index] = {
      ...book
    }
  } else {
    res.status(404);
    res.json('404 | такой книги не найдено');
  }
})

app.delete('/api/books/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const index = books.findIndex(elem => elem.id === id);

  if(index !== -1) {
    books.splice(index, 1);
    res.json('Книга успешно удалена!');
  } else {
    res.status(404);
    res.json('404 | такой книги не найдено');
  }
})

const PORT = process.env.PORT || 8080
app.listen(PORT);