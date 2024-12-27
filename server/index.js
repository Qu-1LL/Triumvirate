require('dotenv');

const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const triumvirate_app = express();
const express = require('express');  // Import express
const app = express();  // Create an Express app instance

app.use(cors({
    origin: 'http://localhost:2400',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

