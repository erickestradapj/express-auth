const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

const app = express();

// Database
dbConnection();

// Public directory
app.use(express.static('public'));

// CORS
app.use(cors());

// Read and parse body
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
   console.log(`App listening at http://localhost:${process.env.PORT}`);
});
