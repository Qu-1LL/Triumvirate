import { mongo } from 'mongoose';
import Room from '../models/room.js';
import { getPlayer } from './playerService.js';

export async function createRoom(roomData){
    try {
        const newRoom  = new Room(roomData);
        const savedRoom = newRoom.save();
        return savedRoom;
    } catch(error) {
        console.log(`Encountered an Error when creating a room: ${error}`)
    };
};

export async function getAllRooms(){
    try {
        const allRooms = Room.find({})
        return allRooms
    } catch(error) {
       console.log(`Error in the getAllRooms function ${error}`) 
    }
};
// export async function joinRoom(joinData){
//     try {
//        const playerId = await joinData.player_id
//        roomId = await 
//        Player.find({playerId}) 



//     }
// }