import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

playerSchema = new mongoose.Schema({
    uid: {
        type: String,
        default: uuidv4,
        required: true,
    },
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
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
