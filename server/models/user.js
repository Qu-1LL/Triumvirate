import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const playerSchema = new mongoose.Schema({
    uid: {
        type: uuidv4,
        required: true
    },
    isuser: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;