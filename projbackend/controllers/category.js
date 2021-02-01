const category = require("../models/category");
const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ err: "Category Not found in database" });
    }
    req.category = category;
  });

  next();
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res
        .status(400)
        .json({ err: "Not able to save category in database" });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};
exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({ err: "No categories found!" });
    }
    res.json(categories);
  });
};
exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json("Failed to update category");
    }
    res.json(category);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json("Failed to delete category");
    }
    res.json({ message: "Category deleted succesfully" });
  });
};
