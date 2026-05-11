const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User",
    },
  },
  {
    timestamps: true, // Tự động thêm createdAt, updatedAt
  },
);

// Lệnh này giúp tự động tạo bảng nếu chưa có trong MySQL
User.sync();

module.exports = User;
