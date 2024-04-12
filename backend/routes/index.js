const express = require('express');
const router = express.Router();

const {v4: uuid} = require('uuid');
const store = {
  books : []
}

class Book {
  constructor(id = uuid(), title = '', description = '', authors = '', favorite = Boolean, fileCover = '', fileName = '',fileBook = '') {
    this.id = id,
    this.title = title,
    this.description = description,
    this.authors = authors,
    this.favorite = favorite,
    this.fileCover = fileCover,
    this.fileName = fileName,
    this.fileBook = fileBook
  }
}

router.get('/api/books', (req, res) => {
  const {books} = store;
  res.json(books);
})

router.get('/api/books/:id', (req, res) => {
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

// router.get('/api/books/:id/download', (req, res) => {
// 	const {books} = store;
//   const {id} = req.params;
// 	const index = books.findIndex(elemm => elemm.id === id);
// 	if(index !== -1) {
// 		res.json(books[index])
// 	}
// })

router.post('/api/user/login', (req, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
})

router.post('/api/books', (req, res) => {
  const {books} = store;
  const bodyBook = req.body;
  const newBook = new Book(...bodyBook);
  books.push(newBook);
  res.status(201);
  res.json(newBook);
  
})

router.put('/api/books/:id', (req, res) => {
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

router.delete('/api/books/:id', (req, res) => {
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

module.exports = router