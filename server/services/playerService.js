import Player from './models/player.js';

async function createPlayer(){
   try {
    const newPlayer = new Player(playerData);
    const savedPlayer = await newPlayer.save();

    return savedPlayer;
   } catch(error) {
    console.error(`Error creating player isntance ${error}`);
    throw new Error('Error creating player');
   }
};

modules.exports = { createPlayer }