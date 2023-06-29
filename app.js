const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');

const routes = require('./routes');
// const { createUser, login } = require('./controllers/users');
const serverError = require('./errors/server-err');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

// app.post('/signin', login);
// app.post('/signup', createUser);
app.use(routes);
app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
