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

