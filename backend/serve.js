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

const PORT = process.env.PORT || 8080
app.listen(PORT);