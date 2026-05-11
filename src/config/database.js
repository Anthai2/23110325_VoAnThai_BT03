require("dotenv").config();
const { Sequelize } = require("sequelize");

// Khởi tạo instance Sequelize kết nối tới MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // Tắt log query SQL ra terminal cho đỡ rối
  },
);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL database successfully.");
  } catch (error) {
    console.error(">>> Error connect to MySQL DB:", error);
  }
};

module.exports = { sequelize, connection };
