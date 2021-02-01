const mongoose = require("mongoose")
const {Schema} = mongoose; 
const {ObjectId}  = Schema;  //used for linking one schema to the other

const ProductCartSchema = new Schema({
    product: {
        type: ObjectId,
        ref : "Product"  //reference of the model we want it to be linked to 
    },
    name: String,
    count: Number,
    price: Number 
},{timestamps: true})

const OrderSchema = new Schema({
    products: [ProductCartSchema],
    status: {type: String, default: "Received", enum: ["Cancelled","Delivered","Shipped","Processing","Received"]},
    transaction_id: {},
    amount: {type: Number},
    address: String,
    updated: Date,
    user: {
        type : ObjectId,
        ref : "User"
    }
},{timestamps: true});

const Order = mongoose.model("Order",OrderSchema)
const ProductCart = mongoose.model("ProductCart",ProductCartSchema)

module.exports = {Order, ProductCart}; 

