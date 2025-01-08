import Player from '../models/player.js';
import Room from '../models/room.js'

export async function createPlayer(playerData) {
   try {
      const newPlayer = new Player(playerData);
      const savedPlayer = await newPlayer.save();
      return savedPlayer;
   } catch(error) {
    console.error(`Error creating player isntance ${error}`);
    throw new Error('Error creating player');
   }
};
export async function getPlayer(playerId) { 
   try {
      return await Player.findOne({_id: playerId});
   } catch(error) {
      console.error(`Error when trying to fetch player data from id ${error}`);
   }
};

export async function deletePlayer(playerId) {
   console.log('Made it to the Service', playerId)
   try {
      const deletedPlayer = await Player.findOne(playerId);
      await deletedPlayer.remove();
      return deletedPlayer;
   } catch (error) {
      console.error(`Error deleting player: ${error}`);
   }
};
export async function setPlayerHost(playerId, roomId) {
   console.log(`Making player with id: (${playerId}) into the room host of room of id: (${roomId})`);
   const 
   const updateUser = await Player.findOneAndUpdate(playerId, {ishost: true}, {new: true});
   try {

   }
}