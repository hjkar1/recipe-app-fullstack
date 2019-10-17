const config = require('./config');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const userRouter = require('./controllers/userRouter');
const recipeRouter = require('./controllers/recipeRouter');
const mongoose = require('mongoose');
const morgan = require('morgan');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log(error.message);
  });

app.use(cors());
app.use(bodyParser.json());

// Disable logging in the test environment.
if (app.get('env') !== 'test') {
  app.use(morgan('tiny'));
}

// Static files.
app.use(express.static(path.resolve(__dirname, './client/build')));

// API requests.
app.use('/api/recipes', recipeRouter);
app.use('/api/users', userRouter);
app.use('/api', notFound);
app.use('/api', errorHandler);

// React app.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

module.exports = app;
