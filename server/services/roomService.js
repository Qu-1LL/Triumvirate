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
async function updatePlayerCount(roomId){

};

export async function setPlayerHost(roomId, playerId){
    try{
        const room = await Room.findById(roomid).populate('players', 'ishost');
        const playerExists = await room.players.includes(playerId);

        if (!room | playerExists){
            console.log(`The room with id: (${roomId}) or player: (${playerId}) does not exist`)
            return null
        }
        room.players.forEach((player) => {
            if (player.ishost === true){
                console.log(`Cannot set player: (${playerId}) as host because player: (${player._id}) is already the host`);
                return null;
            }
        });
        const player = room.player.find(p => p._id === playerId);
        const playerHostStatus = player.ishost;

        player.ishost = !playerHostStatus;

        await player.save();
        const updatedRoom = await room.save();
        return updatedRoom;
    }catch(error){
            console.log(`An error has occured trying to set the player as a host: ${error}`);        };

} 
export async function joinRoom(roomId, playerId){
    try {
        const player = Player.findById(playerId); 
        const room = Room.findByIdAndUpdate(roomId, {$push : {players: playerId}}, {$inc: {playercount: 1}}, {new: true})
        if (!room | !player) {
            console.error((player ? 'Room' : 'Player'),' not found');
            return;
        }
        updatePlayerCount(roomId);
        return room;
    } catch (error) {
        console.log(`Error joining room, ${error}`)
    }
};