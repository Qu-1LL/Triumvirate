
import express from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/db.js';

const triumvirate_app = express();

const PORT = 3000; 

triumvirate_app.use(express.json());

triumvirate_app.get('/rooms', (req, res) => {
   res.send('entered rooms')
});

console.log(process.env.MONGO_URI);

triumvirate_app.listen(PORT,() =>{
  connectDB();
  console.log(`Trimvirate Server Running on http://localhost:${PORT}`);
});
//HdK2GnQKkmS0MrKR