require('dotenv').config;

const triumvirate_app = require('express')();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io')()
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