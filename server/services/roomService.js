import { mongo } from 'mongoose';
import mongoose from 'mongoose';
import Room from '../models/room.js';
import { getPlayer, setPlayerHost } from './playerService.js';
import Player from '../models/player.js';

export async function createRoom(uid){
    try {
        const newRoom  = new Room({players:getPlayer(uid)});
        const savedRoom = newRoom.save();

        setPlayerHost(uid,newRoom._id)
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
        const player = Player.findById(playerId) 
        const room = Room.findByIdAndUpdate(roomId, {$push : {players: playerId}}, {new: true})
        if (!room | !player) {
            console.error((player ? 'Room' : 'Player'),' not found');
            return;
        }
        return room;
    } catch (error) {
        console.log(`Error joining room, ${error}`)
    }
};