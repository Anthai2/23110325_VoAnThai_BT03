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

    const products = await Product.findAll({
      where,
      order,
      limit: Number(limit),
      offset,
    });

    return res.status(200).json(products);
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
    return res.status(200).json(product);
  } catch (error) {
    console.error("getProductById error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
