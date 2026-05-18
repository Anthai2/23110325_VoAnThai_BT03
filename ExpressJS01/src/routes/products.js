const express = require("express");
const {
  getProducts,
  getProductById,
  getCategories,
  getByCategory,
  getBestSellers,
  getMostViewed,
} = require("../controllers/productController");

const router = express.Router();

// Lấy danh sách categories
router.get("/categories", getCategories);

// Lấy top 10 bán chạy
router.get("/best-sellers", getBestSellers);

// Lấy top 10 xem nhiều
router.get("/most-viewed", getMostViewed);

// Lấy sản phẩm theo category
router.get("/category/:category", getByCategory);

// Lấy tất cả sản phẩm (với filter, pagination, sort)
router.get("/", getProducts);

// Lấy sản phẩm theo ID
router.get("/:id", getProductById);

module.exports = router;
