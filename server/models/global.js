const mongoose = require('mongoose');

const globalSchema = new mongoose.Schema({
    region: {
        type: String
    },
    rooms: {
        type: [String],
        default: [],
    }
});