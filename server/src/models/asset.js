import mongoose from 'mongoose';

// Define the model
const assetSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    isDivisible: {
        type: Boolean,
        default: true,
    },
    type: {
        type: String,
        default: "public"
    },
    creatorAddr: {
        type: String,
    },
    approvedAddr: {
        type: [String],
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

// Export the model
export default mongoose.model('Asset', assetSchema);