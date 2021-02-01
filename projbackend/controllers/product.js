const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }

    //TODO: restrictions on field
    let product = new Product(fields);

    const {name, description, price, category, stock} = fields;

    if(!name || !description || !price || !category || !stock){
        return res.status(400).json({
            err : "Please enter all the fields!"
        })
    }

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

 // middleware for sending images when requested
exports.photo = (req,res,next) => {
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

exports.deleteProduct = (req,res) => {


    // TODO: Check whether this method works
    // Product.findByIdAndDelete(req.product._id).exec((err,product) => {
    //     if(err){
    //         return res.status(400).json({err: "Not able to delete the product!"})
    //     }
    //     res.json(product)
    // })

    // Working one!
    const product = req.product;
    product.remove((err,product) => {
        if(err){
            return res.status(400).json({err: "Product has not been able to be deleted!"})
        }
        res.json(product);
    })

}

exports.updateProduct = (req,res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, file) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image"
        });
      }
  
      //Updation code
      let product = req.product;
      product = _.extend(product, fields);
  
      //handle file here
      if (file.photo) {
        if (file.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        product.photo.data = fs.readFileSync(file.photo.path);
        product.photo.contentType = file.photo.type;
      }
  
      //save to the DB
      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Updateing product in DB failed"
          });
        }
        res.json(product);
      });
    });
}

exports.getAllProducts = (req,res) => {
  const limit = parseInt(req.query.limit) || 8;
  const sortBy = req.query.sortBy || "_id";
  Product.find({})
  .select("-photo")
  .populate("category")
  .sort([[sortBy, "asc"]])
  .limit(limit)
  .exec((err,products) => {
    if(err){
      return res.status(400).json({err: "Not able to get the products"})
    }
    res.json(products);
  })
}

exports.updateStock = (req,res,next) => {
  
  //looping through the orders and returning the array of objects that we have to use in bultwrite
  const myOps = req.body.order.products.map(product => {
    return {
      updateOne : {
        filter: {_id: product._id},
        update: {$inc: {stock: -product.count, sold: +product.count}}
      }
    }
  })

  //Bulk write
  Product.bulkWrite(myOps,{},(err, result) => {
    if(err) {
      return res.status(400).json({err : "Bulk operation unsuccesful!"})
    }
    next();
  })
}

exports.listCategories = (req,res) => {
  Product.distinct("category", {}, (err,category) => {
    if(err) {
      return res.status(400).json({err: "Not able to get the cateogories!"})
    }
  })
}