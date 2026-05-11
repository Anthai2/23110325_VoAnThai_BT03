const path = require('path');
const express = require('express');
const { config } = require('dotenv');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));

const configViewEngine = () => {
  return app;
};

module.exports = configViewEngine;