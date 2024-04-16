const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');
const Book = require('../Book');

const store = {
  books : [
    {
      id: '1',
      title: "Мифы Ктулху",
      description: "string",
      authors: "Говард Филлипс Лавкрафт",
      favorite: true,
      fileCover: "string",
      fileName: "CthulhuMythos",
      fileBook: "someFileBook"
    }
  ]
}

router.get('/', (req, res) => {
  const {books} = store;
  res.json(books);
})

router.get('/:id', (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const index = books.findIndex((elem) => elem.id === id);
  if (index !== -1) {
    res.json(books[index]);
  } else {

    res.status(404);
    res.json('404 | такой книги не найдено');
  }
})

router.get('/:id/download', fileMulter.single('filebook'), (req, res) => {
  const {books} = store;
  const {id} = req.params;
  const index = books.findIndex(elem => elem.id === id);
  if (index !== -1) {
    res.download(`${__dirname}/../public/books/${books[index]}.fileBook`, books[index].fileName, (err) => {
      if(err) {
        res.status(404);
        res.json(err);
      }
    });
  } else {
    res.status(404);
    res.json('404 | такой книги не найдено');
  }
})

router.post('/', fileMulter.single('filebook'), (req, res) => {
  const {books} = store;
  const bodyBook = req.body;
  const newBook = new Book(...bodyBook);
  books.push(newBook);
  res.status(201);
  res.json(newBook);
  
})

router.put('/:id', fileMulter.single('filebook'), (req, res) => {
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

router.delete('/:id', (req, res) => {
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