
import express from 'express';
//import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPlayer, deletePlayer, createPlayer } from './services/playerService.js';

import { joinRoom, getAllRooms, createRoom } from './services/roomService.js';

import {v4 as uuidv4} from 'uuid';
dotenv.config();

import connectDB from './config/db.js';
import playerSchema from './models/player.js'

const triumvirate_app = express();

const PORT = 5000; 

//triumvirate_app.use(express.json());


const corsOptions = {
  origin: '*',  
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
};

triumvirate_app.use(cors(corsOptions));
triumvirate_app.use(express.json())

triumvirate_app.listen(PORT,() =>{
  connectDB();
  console.log(`Trimvirate Server Running on http://localhost:${PORT}`);
});

// triumvirate_app.get('/', (req, res) => {
//   res.send('server is ready')
// });

triumvirate_app.post('/player/:playername', async(req, res) => {
  const sname = req.params.playername;
  const player_data = await createPlayer({playername: sname});
  res.json(player_data);
});

// triumvirate_app.get('/player')

// triumvirate_app.post('/rooms/:roomdata', async (req, res){

// });
triumvirate_app.get('/rooms', async (req, res) => {  
  const rooms = await getAllRooms();
  res.json(rooms);
});

triumvirate_app.put('/rooms/join', async (req, res) => {
  const roomId = await req.body['roomId']
  const playerId = await req.body['playerId']
  const joinedRoom = await joinRoom(roomId,playerId);
  res.json(joinedRoom);
})

triumvirate_app.get('/player/:uid', async (req, res) => {
  const playerId = req.params.uid
  const player_data = await getPlayer(playerId);
  res.send(player_data)

});

triumvirate_app.delete('/player/:uid', async (req, res) => {
  const playerId = req.params.uid
  const player_data = await deletePlayer(playerId);
  res.send(player_data)
});

