import { mongo } from 'mongoose';
import mongoose from 'mongoose';
import Room from '../models/room.js';
import { getPlayer } from './playerService.js';
import Player from '../models/player.js';

export async function createRoom(uid){
    try {
        const myPlayer = await getPlayer(uid)
        const newRoom  = new Room({roomname: myPlayer.playername + '\'s Room'});
        const savedRoom = await newRoom.save();
        const roomId = await savedRoom._id.toString();
        joinRoom(roomId, uid);
        const newRoomData = await setPlayerHost(roomId, uid)
        updatePlayerCount(roomId)
        return newRoomData;
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

export async function getRoom(roomId) {
    try {
        const myRoom = Room.findOne({_id: roomId})
        return myRoom 
    } catch (error) {
        console.log(`Error finding the room with id: ${roomId}, ${error}`)
    }
}

export async function setPlayerHost(roomId, playerId){
    try{
        const room = await Room.findById(roomId).populate('players', 'ishost');
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
        const player = await  Player.findById(playerId);
        const playerHostStatus = !player.ishost;

        const updatedPlayer = await Player.findByIdAndUpdate(playerId, {$set:{ishost: playerHostStatus}}, {new: true})
        const updatedRoom = await Room.findByIdAndUpdate(roomId, {'players':playerId}, {new: true})

        return updatedRoom;
    }catch(error){
            console.log(`An error has occured trying to set the player as a host: ${error}`);        };

}

async function updatePlayerCount(roomId){
    try{
    const room = await Room.findById(roomId).select('players');
    const newPlayerCount = room.players.length;
    const updatedRoom = await Room.findByIdAndUpdate(roomId, {playercount: newPlayerCount}, {new: true});
    if (newPlayerCount === 0){
        updatedRoom = await Room.findByIdAndDelete(roomId)
        console.log(`Deleted room with id: (${roomId}) because there were 0 players.`)
        return null;
    }
    return updatedRoom;
    } catch(error) {
        console.log(`An error as occured when trying to calculate the player count ${error}`)
    }
};

export async function joinRoom(roomId, playerId){
    try {
        const player = await Player.findById(playerId);
        const updatedRoomStatus = await Player.findByIdAndUpdate(playerId, {inroom: true}, {new: true})
        const room = await Room.findByIdAndUpdate(roomId, {$push : {players: playerId}}, {new: true})
        
        if (!room | !player) {
            console.error((player ? 'Room' : 'Player'),' not found');
            return;
        }

        const updatedRoom = await updatePlayerCount(roomId);

        return updatedRoom;
    } catch (error) {
        console.log(`Error joining room, ${error}`)
    }
};

export async function kickPlayer(roomId, playerId, playerToKickId){
    try{

        const room = await Room.findById(roomId);
        const playerInRoom = room.players.includes(playerToKickId)
        const player = await Player.findById(playerId)
        const playerIsHost = player.ishost
        if (playerIsHost && playerInRoom && player){
            await Room.findByIdAndUpdate(roomId, {$pull: {players: playerToKickId}}, {new: true});
            await Player.findByIdAndUpdate(playerToKickId, {inroom: false}, {new: true});
            const updatedRoom = await updatePlayerCount(roomId);
            return updatedRoom;
        }
        else {
            console.log(`Cannot kick player because player: (${playerId}) is not the host or player to kick is not in room.`)
        }
    } catch(error){
        console.log(`Cannot kick player with id: (${playerToKickId}) Error: ${error}`)
    }
}

export async function changeHost(roomId, playerId, playerToHostId){ // remember to omit host id from client accesibility on front end. Can probably tackle this issue with jwt 
    try{
        const room = await Room.findById(roomId);
        const playerInRoom = room.includes({players: playerToHostId})
        const player = await Player.findById(playerId);
        const playerIsHost = await player.ishost;

        if (playerIsHost | playerInRoom){
            setPlayerHost(playerId)
            const updatedRoom = setPlayerHost(playerToHostId)
            return updatedRoom;
        }
        else {
            console.log(`The player you are trying to make a host is not in the game.`)
        }
    } catch(error){
        console.log(`Encountered an error while trying to make (${playerToHost}) the host. The current host is (${playerToHost})`);
    }
}

export async function leaveRoom(roomId, playerId){
    try{
    const player = Player.findById(playerId);
    const playerHostStatus = player.ishost; 
    await Room.findByIdAndUpdate(roomId, {$pull: {players: playerId}}, {new: true});
    await updatePlayerCount(roomId);
    if (playerHostStatus && updatedRoom !== null){
        await Player.findByIdAndUpdate(playerId, {ishost: false, inroom: false}, {new: true});  
        const nextPlayerInRoomId = updatedRoom.players[0]._id.toString();
        await setPlayerHost(roomId, nextPlayerInRoomId);
        console.log('Host left setting another player to host.');
        return;
    } else {
        await Player.findByIdAndUpdate(playerId, {inroom: false}, {new: true});

        console.log('Host has left the room, deleting the room.');
        return;
    }
    } catch(error){
        console.log(`Encountered an error when player: (${playerId}) attempted to leave room: (${roomId}) Error: ${error}`);

    }
}

export async function deletePlayer(playerId) {
   try {
      const player = await Player.findById(playerId);
      console.log(player.inroom)
      if (player.inroom){
         const deleteRoomId = await Room.findOne({players: playerId});
         await leaveRoom(deleteRoomId._id.toString(), playerId.toString());
      }

      await Player.findByIdAndDelete(playerId);
   } catch (error) {
   }
};
 