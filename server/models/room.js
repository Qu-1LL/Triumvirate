import mongoose from 'mongoose';
const roomSchema = new mongoose.Schema({
    roomname: {
        type: String,
        required: true
    },
    playercount: {
        type: Number,
        default: 1,
        required: true
    },
    maxplayers: {
        type: Number,
        default: 8,
        required: true
    },
    inprogress: {
        type: Boolean,
        default: false,
        required: true
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player',
    }],
    senate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Senate'
    },
    deck: {
        type: [String],
        default: []
    }, 
    treasury: {
        type: Number,
        default: 0
    },
    turnOrder: {
        type: [String],
        default: []
    },
    currentPlayerTurn: {
        type: String,
        default: ''
    }

});

const Room = mongoose.model('Room', roomSchema);

export default Room;