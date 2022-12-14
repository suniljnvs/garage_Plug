const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const OrderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    orderName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);