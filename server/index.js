
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getPlayer, createPlayer } from './services/playerService.js';
import { joinRoom, getAllRooms, createRoom, getRoom, kickPlayer, deletePlayer, changeHost, leaveRoom} from './services/roomService.js';
import { Server } from 'socket.io';
dotenv.config();

import connectDB from './config/db.js';
import Player from './models/player.js';

const triumvirate_app = express();
const io = Server();

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



io.on('connection', (socket) => {
  const playerId = socket.handshake.auth.playerId;
  console.log('Client connect with player Id: ', playerId);
  io.on('get_all_rooms', (data) => {
    io.to(playerId).emit(getAllRooms())
  });
  io.on('create_room', (data) => {
    io.to(playerId).emit(createRoom(playerId))
    console.log(`Player: (${playerId}) has created a room.`)
  });

  io.on('join_room', (data) => {
    io.to(data.roomId).emit(joinRoom(data.roomId, playerId));
  });

  io.on('leave_room', (data) => {
    io.to(data.roomId).broadcast.emit(leaveRoom(data.roomId, playerId));
  });

  io.on('get_player', (data)=> {
    io.to(playerId).emit(getPlayer(playerId))
  });
  io.on('kick_player', (data) => {
    io.to(data.playerToKickId).emit('You have been kicked')
    io.to(playerId).emit(kickPlayer(data.RoomId, PlayerId, data.playerToKickId))
  })
})

triumvirate_app.post('/player/:playername', async(req, res) => {
  const sname = req.params.playername;
  const player_data = await createPlayer({playername: sname});
  res.json(player_data);
});

// triumvirate_app.get('/player')

triumvirate_app.post('/rooms/:uid', async (req, res) => {
  const room_data = await createRoom(req.params.uid);
  res.json(room_data);
});

triumvirate_app.get('/room/:roomId', async (req,res) => {
  const room_data = await getRoom(req.params.roomId);
  res.json(room_data);
});

triumvirate_app.get('/rooms', async (req, res) => {  
  const rooms = await getAllRooms();
  res.json(rooms);
});

triumvirate_app.put('/lobby/kick', async (req, res) => {
  const roomId = await req.body['roomId']
  const playerId = await req.body['playerId']
  const playerToKickId = await req.body['playerToKickId']
  const updatedRoom = await kickPlayer(roomId, playerId, playerToKickId);
  res.json(updatedRoom)
})
triumvirate_app.put('/lobby/host', async (req, res) => {
  const roomId = await req.body['roomId']
  const playerId = await req.body['playerId']
  const playerToHostId = await req.body['playerToHostId']
  const updatedRoom = await changeHost(roomId, playerId, playerToHostId);
  res.json(updatedRoom)
})
triumvirate_app.put('/lobby/leave', async (req, res) => {
  const roomId = await req.body['roomId'];
  const playerId = await req.body['playerId'];
  await leaveRoom(roomId, playerId);
  res.json('Left Room');

})


triumvirate_app.put('/lobby/join', async (req, res) => {
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
  await deletePlayer(playerId);
});

