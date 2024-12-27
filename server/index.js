require('dotenv').config;

const express = require('express');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const triumvirate_app = express();
const express = require('express');  // Import express

triumvirate_app.use(express.json());
triumvirate_app.use(cors({
    origin: 'http://localhost:2400',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

triumvirate_app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

triumvirate_app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

mongoose.connect('mongodb://localhost:27017/triumviratedb',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');

}).catch(() => {
    console.error('Error connecting to MongoDB:', err);
});