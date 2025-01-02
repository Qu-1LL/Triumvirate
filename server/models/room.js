import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        default: uuidv4,
        required: true
    },
    createdAt: {
        type: Date, 
        default: []
    },
    roomName: {
        type: String,
        required: true
    },
    playerCount: {
        type: Number,
        default: 1,
        required: true
    },
    maxPlayers: {
        type: Number,
        default: 8,
        required: true
    },
    inProgress: {
        type: Boolean,
        default: false,
        required: true
    },
    players: {
        type: [playerSchema],
        default: []
    },
    deck: {
        type: [String],
        default: []
    }, 
    treasury: {
        type: Number,
        default: 0,Room,
        type: [String],
        default: []
    },
    turnOrder: {
        type: [String],
        default: []
    },
    currentPlayerTurn: {
        type: String
    }

});
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;