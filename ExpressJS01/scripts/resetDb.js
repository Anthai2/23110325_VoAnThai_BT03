const Product = require("../src/models/product");
const { sequelize } = require("../src/config/database");

const resetDb = async () => {
  try {
    // Drop all tables and recreate them
    await sequelize.sync({ force: true });
    console.log("✅ Database reset successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error resetting database:", error);
    process.exit(1);
  }
};

resetDb();
