require('dotenv').config;

const express = require('express');
const triumvirate_app = express();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io')()

triumvirate_app.use(express.json());
const PORT = 3000
triumvirate_app.listen(
  PORT,
  () => console.log(`Trimvirate Server Running on http://localhost:${PORT}`)
);

triumvirate_app.get('/rooms', (req, res) => {
  res.status(200).json({
    message: 'Hello world'
  })
});