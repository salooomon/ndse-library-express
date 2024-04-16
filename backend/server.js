const express = require('express');
const bookRouter = require('./routes/books');
const userRouter  = require('./routes/user')
const error  = require('./middleware/error')
const logger = require('./middleware/logger');

const app = express();
app.use(express.json());

app.use(logger);
app.use('/api/books', bookRouter);
app.post('/api/user', userRouter);
app.use(error);

const PORT = process.env.PORT || 8080
app.listen(PORT);