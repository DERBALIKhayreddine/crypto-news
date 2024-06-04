const express = require('express');
const cors = require('cors');
const connection = require('./connection');
const appuserRoute = require('./routes/appuser');
const categoryRoute = require('./routes/category');
const articleRoute = require('./routes/article');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/appuser', appuserRoute);
app.use('/api/category', categoryRoute);
app.use('/api/article', articleRoute);

module.exports = app; // Export the app instance
