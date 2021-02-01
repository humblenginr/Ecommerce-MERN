const User = require('../models/user');
const Order = require('../models/order');



exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({err : "No user was found in Database"})
        }
        req.profile = user;
        next();
    })
}

exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile)
}


exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({
        _id : req.profile._id
    },
    {
        $set: req.body
    },
    {
        new: true, useFindAndModify: false
    },
    (err,user) => {
        user.salt = undefined;
        user.createdAt = undefined;
        user.updatedAt = undefined;
        user.encry_password = undefined;
        if(err){
            return res.status(400).json({err : "You are not authorized to modify this profile!"})
        }
        res.status(200).json(user)
    }
    )
}

exports.userPurchaseList = (req,res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err,order) => {
        if(err || !order){
            return res.status(400).json({err: "No order in the user!"})
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList = (req,res,next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
        User.findOneAndUpdate(
            {_id : req.profile._id},
            {$push: {purchases: purchases}},
            {new: true},
            (err,purchases) => {
                if(err){
                    return res.status(400).json({err : "Unable to save purchases! "})
                }
                next();
            }
        )
    })
    
}