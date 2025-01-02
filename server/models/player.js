import mongoose from 'mongoose';
import { generate } from 'random-words';

export const playerSchema = new mongoose.Schema({
    // uuid: {
    //     type: String,
    //     require: true,
    // },
    ishost: {
        type: Boolean,
        default: false,
    },
    hand: {
        type: [String],
        default: [],
    } ,
    balance: {
        type: Number,
        default: 3,
    },
    activecards: {
        type: [String],
        default: []
    },
    availableactions: {
        type: [String],
        default: []
    },
    playername: {
        type: String,
        default: generate(1)[0],
    },
},

);

const Player = mongoose.model('Player', playerSchema);

export default Player;