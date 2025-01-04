import { mongo } from 'mongoose';
import Room from '../models/room.js';
import { getPlayer } from './playerService.js';
import Player from '../models/player.js';

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
export async function joinRoom(roomId, playerId){
    try {
        const room = Room.find({roomId})
        const player = Player.find({playerId}) 
        if (!room | !player) {
            console.log((player ? 'Room' : 'Player'),' not found');
            return;
        }
        room.players.push(playerId); // fix this it doesn't like the "push" function
        const updatedRoom = await room.save();
        return updatedRoom;
    } catch (error) {
        console.log(`Error joining room, ${error}`)
    }
};