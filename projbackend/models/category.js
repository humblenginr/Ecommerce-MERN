const mongoose = require("mongoose")
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    }
}, {timestamps: true});  //timestamps record the exact time of schema being created

module.exports = mongoose.model("Category", categorySchema);