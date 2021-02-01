const express = require("express");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
  getCategoryById,
  createCategory,
  getCategory,
  getCategories,
  updateCategory,
  removeCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");
const router = express.Router();

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//routes
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/category/:categoryId", getCategory);
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  updateCategory
);
router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuthenticated,
    removeCategory
  );
router.get("/categories", getCategories);

module.exports = router;
