const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
require('./config/bookshelf');
require('./models');

const studentRoutes = require('./routes/student');
const professorRoutes = require('./routes/professor');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(methodOverride());
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dir = path.join(__dirname, '..', 'uploads');
app.use(express.static(dir));

app.use(studentRoutes);
app.use(professorRoutes);

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

// ALWAYS USE ERROR MIDDLEWARE LAST !!!!
app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'TEST') {
  const server = app.listen(process.env.PORT || 3000, () => {
    const { port } = server.address();
    console.log('Listening on port ' + port);
  });
}

module.exports = app;
