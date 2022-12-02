const express = require('express');
const cors = require('cors');
const FileUpload = require('express-fileupload');
const session = require('express-session');
require('dotenv').config();
const bodyParser = require('body-parser');
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
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:3000',
      'https://final-project-757nu7zyf-mental-hack.vercel.app',
      'https://final-project-ma8iyu4bm-mental-hack.vercel.app',
      'https://final-project-fe-mental-hack.vercel.app',
      'https://final-project-51ff1ui88-mental-hack.vercel.app/'
    ],
  })
);
app.use(express.json());
app.use(FileUpload());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allRouter);

app.listen(process.env.PORT, () => {
  console.log('server running on http://localhost:' + process.env.PORT);
});
