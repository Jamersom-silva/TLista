require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { db } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const initSql = fs.readFileSync(path.join(__dirname, 'migrations', 'init.sql'), 'utf8');
db.exec(initSql, (err) => {
  if (err) console.error('Migration error', err);
  else console.log('DB ready');
});

app.use("/admin", require("./routes/admin"));
app.use('/auth', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server listening on', PORT));
