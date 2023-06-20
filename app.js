const express = require('express');

const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '648fe5ed8d990594523d2947',
  };

  next();
});

app.use('/', routes);

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
