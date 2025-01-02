import { mongo } from 'mongoose';
import Room from '../models/room.js';

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