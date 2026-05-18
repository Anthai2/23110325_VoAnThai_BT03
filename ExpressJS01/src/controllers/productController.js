const { Op } = require("sequelize");
const Product = require("../models/product");

exports.getProducts = async (req, res) => {
  try {
    const {
      q,
      category,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 20,
    } = req.query;

    const where = {};

    if (q) {
      where[Op.or] = [
        { name: { [Op.like]: `%${q}%` } },
        { description: { [Op.like]: `%${q}%` } },
      ];
    }

    if (category) where.category = category;
    if (minPrice)
      where.price = { ...(where.price || {}), [Op.gte]: Number(minPrice) };
    if (maxPrice)
      where.price = { ...(where.price || {}), [Op.lte]: Number(maxPrice) };

    const order = [];
    if (sort === "bestseller") order.push(["sold", "DESC"]);
    else if (sort === "newest") order.push(["createdAt", "DESC"]);

    const offset = (Number(page) - 1) * Number(limit || 20);

    const { count, rows } = await Product.findAndCountAll({
      where,
      order,
      limit: Number(limit),
      offset,
    });

    return res.status(200).json({
      products: rows,
      total: count,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(count / Number(limit)),
    });
  } catch (error) {
    console.error("getProducts error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Tăng viewCount
    await product.increment("viewCount");

    return res.status(200).json(product);
  } catch (error) {
    console.error("getProductById error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Lấy danh sách categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Product.findAll({
      attributes: [["category", "name"]],
      group: ["category"],
      raw: true,
    });
    return res.status(200).json(categories.filter((c) => c.name));
  } catch (error) {
    console.error("getCategories error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Lấy sản phẩm theo category với phân trang
exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12, sort = "newest" } = req.query;

    const order = [];
    if (sort === "bestseller") order.push(["sold", "DESC"]);
    else if (sort === "most-viewed") order.push(["viewCount", "DESC"]);
    else order.push(["createdAt", "DESC"]);

    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Product.findAndCountAll({
      where: { category },
      order,
      limit: Number(limit),
      offset,
    });

    return res.status(200).json({
      products: rows,
      total: count,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(count / Number(limit)),
    });
  } catch (error) {
    console.error("getByCategory error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Lấy top 10 sản phẩm bán chạy nhất
exports.getBestSellers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Product.findAndCountAll({
      order: [["sold", "DESC"]],
      limit: Number(limit),
      offset,
    });

    return res.status(200).json({
      products: rows,
      total: count,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(count / Number(limit)),
    });
  } catch (error) {
    console.error("getBestSellers error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// Lấy top 10 sản phẩm xem nhiều nhất
exports.getMostViewed = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const { count, rows } = await Product.findAndCountAll({
      order: [["viewCount", "DESC"]],
      limit: Number(limit),
      offset,
    });

    return res.status(200).json({
      products: rows,
      total: count,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(count / Number(limit)),
    });
  } catch (error) {
    console.error("getMostViewed error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
