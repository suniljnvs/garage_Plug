let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["regular", "gold", "platinum"],
        default: "regular"
    },

    mobile : {
        type : Number,
        require : true
    },
   
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema); 