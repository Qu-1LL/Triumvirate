import mongoose from 'mongoose'

const senateSchema = mongoose.Schema({
    
    topRow: {
        type: [String],
        default: [],
        required: true
    },

    bottomRow: {
        type: [String],
        default: [],
        required: true
    }

});

const Senate = mongoose.model('Senate', senateSchema);

export default Senate;