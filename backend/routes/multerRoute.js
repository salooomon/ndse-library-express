const express = require('express');
const router = express.Router();
const fileMulter = require('../middleware/file');

router.get('/api/books/:id/download', 
	fileMulter.single('book-download'),
	(req, res) => {
		if(req.file) {
			const {path} = req.file;
			res.json({path});
		}
		res.json();
		// const {books} = store;
		// const {id} = req.params;
		// const index = books.findIndex(elemm => elemm.id === id);
		// if(index !== -1) {
		// 	res.json(books[index])
		// }
	})
	module.exports = router