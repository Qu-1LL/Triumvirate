const mongoose = require('mongoose');
const {v4: uuidv4 } = require('uuid')

playerSchema = new mongoose.Schema({
    uid: {
        type: String,
        default: uuidv4,
        required: true,
    },
    isHost: {
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
    activeCards: {
        type: [String],
        default: []
    }

});

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
        default: 0,
        required: true
    },
    senate: {
        type: [String],
        default: []
    }

});
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;