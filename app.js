const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const db = require('./config/db');
const allRouter = require('./routes');

const app = express();

// check db
db.then(() => {
  console.log('database terkoneksi');
}).catch((err) => {
  console.log(err);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: 'auto',
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173','http://localhost:3000'],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(allRouter);

app.listen(process.env.PORT, () => {
  console.log('server running on http://localhost:' + process.env.PORT);
});
