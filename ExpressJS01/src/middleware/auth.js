require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Cho phép các route này đi qua mà không cần token
  const white_lists = ["/", "/register", "/login"];
  const isWhitelisted = white_lists.find(
    (item) => "/v1/api" + item === req.originalUrl,
  );
  const isPublicProductRoute = req.originalUrl.startsWith("/v1/api/products");

  if (isWhitelisted || isPublicProductRoute) {
    next();
  } else {
    // Lấy token từ header Authorization (định dạng: Bearer <token>)
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
          email: decoded.email,
          name: decoded.name,
          createdBy: "hoidanit",
        };
        next();
      } catch (error) {
        return res.status(401).json({
          message: "Token bị hết hạn/hoặc không hợp lệ",
        });
      }
    } else {
      return res.status(401).json({
        message: "Bạn chưa truyền Access Token ở header/Hoặc token bị hết hạn",
      });
    }
  }
};

module.exports = auth;
