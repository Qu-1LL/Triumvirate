import Player from '../models/player.js';

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
      const deletedPlayer = await Player.deleteOne({_id: playerId});
      return deletedPlayer;
   } catch (error) {
      console.error(`Error deleting player: ${error}`);
   }
};