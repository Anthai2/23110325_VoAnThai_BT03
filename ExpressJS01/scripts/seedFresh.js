const mysql = require("mysql2/promise");
require("dotenv").config();

const seed = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // Drop table nếu tồn tại
    await connection.execute("DROP TABLE IF EXISTS Products");
    console.log("✅ Dropped Products table");

    // Tạo bảng mới
    await connection.execute(`
      CREATE TABLE Products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(12, 2),
        stock INT DEFAULT 0,
        sold INT DEFAULT 0,
        category VARCHAR(100),
        images JSON,
        isPromotion BOOLEAN DEFAULT FALSE,
        viewCount INT DEFAULT 0,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Created Products table");

    // Insert products - Using Unsplash (Free, reliable, always accessible)
    const products = [
      [
        "Samsung Galaxy S21",
        "Điện thoại flagship cao cấp với màn hình AMOLED 120Hz",
        15999000,
        50,
        250,
        "Electronics",
        JSON.stringify([
          "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop",
        ]),
        1,
        1850,
      ],
      [
        "iPhone 13 Pro",
        "Điện thoại Apple cao cấp với chip A15 Bionic",
        22999000,
        30,
        180,
        "Electronics",
        JSON.stringify([
          "https://images.unsplash.com/photo-1592286927505-1def25e329c7?w=500&h=500&fit=crop",
        ]),
        0,
        2100,
      ],
      [
        "MacBook Pro 14 inch",
        "Laptop chuyên nghiệp với chip M1 Pro",
        39999000,
        20,
        95,
        "Electronics",
        JSON.stringify([
          "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
        ]),
        1,
        1650,
      ],
      [
        "iPad Air 5",
        "Máy tính bảng cao cấp 10.9 inch",
        18499000,
        40,
        150,
        "Electronics",
        JSON.stringify([
          "https://images.unsplash.com/photo-1544716278-ca5e3af4abd8?w=500&h=500&fit=crop",
        ]),
        0,
        1200,
      ],
      [
        "Sony WH-1000XM4",
        "Tai nghe chống ồn cao cấp",
        8499000,
        60,
        320,
        "Electronics",
        JSON.stringify([
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        ]),
        1,
        2450,
      ],
      [
        "Áo Polo nam cao cấp",
        "Áo polo cotton 100% thoáng mát",
        499000,
        100,
        280,
        "Fashion",
        JSON.stringify([
          "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
        ]),
        1,
        3200,
      ],
      [
        "Quần jeans đen classic",
        "Quần jeans denim chất lượng cao",
        699000,
        80,
        220,
        "Fashion",
        JSON.stringify([
          "https://images.unsplash.com/photo-1542272215-c82efb67ffa9?w=500&h=500&fit=crop",
        ]),
        0,
        2800,
      ],
      [
        "Giày thể thao Nike Air Force",
        "Giày sneaker cổ điển Nike",
        2199000,
        50,
        190,
        "Fashion",
        JSON.stringify([
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
        ]),
        1,
        2950,
      ],
      [
        "Túi xách da công sở",
        "Túi da cao cấp phù hợp công sở",
        1899000,
        35,
        85,
        "Fashion",
        JSON.stringify([
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
        ]),
        0,
        1950,
      ],
      [
        "Đồng hồ nam Citizen",
        "Đồng hồ thời trang nam",
        3499000,
        25,
        65,
        "Fashion",
        JSON.stringify([
          "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=500&fit=crop",
        ]),
        1,
        1750,
      ],
      [
        "Đèn LED thông minh Philips Hue",
        "Bóng đèn LED WiFi thay đổi màu sắc",
        799000,
        70,
        210,
        "Home & Garden",
        JSON.stringify([
          "https://images.unsplash.com/photo-1565636192335-14ebb94cecfc?w=500&h=500&fit=crop",
        ]),
        1,
        2100,
      ],
      [
        "Máy lọc không khí Xiaomi",
        "Máy lọc không khí cho phòng 30-40m2",
        1299000,
        45,
        130,
        "Home & Garden",
        JSON.stringify([
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=500&fit=crop",
        ]),
        0,
        1650,
      ],
      [
        "Vợt cầu lông Yonex Nanoray",
        "Vợt cầu lông chuyên nghiệp",
        2499000,
        30,
        75,
        "Sports & Outdoors",
        JSON.stringify([
          "https://images.unsplash.com/photo-1611339555312-e607c04352fa?w=500&h=500&fit=crop",
        ]),
        0,
        950,
      ],
      [
        "Xe đạp địa hình XCR",
        "Xe đạp leo núi 24 inch, 21 số",
        3999000,
        15,
        45,
        "Sports & Outdoors",
        JSON.stringify([
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
        ]),
        1,
        1400,
      ],
      [
        "Lập trình JavaScript từ A đến Z",
        "Sách hướng dẫn lập trình JavaScript toàn diện",
        189000,
        200,
        450,
        "Books",
        JSON.stringify([
          "https://images.unsplash.com/photo-1507842217343-583f20270319?w=500&h=500&fit=crop",
        ]),
        1,
        2600,
      ],
      [
        "Tư duy lập trình",
        "Cuốn sách giúp lập trình viên phát triển tư duy",
        159000,
        150,
        320,
        "Books",
        JSON.stringify([
          "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop",
        ]),
        0,
        2200,
      ],
      [
        "Webcam Logitech C920",
        "Webcam FHD 1080p cho streaming",
        1199000,
        55,
        140,
        "Electronics",
        JSON.stringify([
          "https://images.unsplash.com/photo-1598652520899-b68fec0feeee?w=500&h=500&fit=crop",
        ]),
        1,
        1580,
      ],
      [
        "Chuột game Razer DeathAdder",
        "Chuột game với 5 nút lập trình",
        899000,
        65,
        190,
        "Electronics",
        JSON.stringify([
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
        ]),
        0,
        1820,
      ],
      [
        "Bàn phím cơ Ducky",
        "Bàn phím cơ RGB cao cấp",
        2699000,
        40,
        110,
        "Electronics",
        JSON.stringify([
          "https://images.unsplash.com/photo-1587829191301-dc798b83add3?w=500&h=500&fit=crop",
        ]),
        1,
        1450,
      ],
      [
        "Áo khoác gió nam",
        "Áo khoác chống gió, nhẹ, thoáng khí",
        899000,
        90,
        260,
        "Fashion",
        JSON.stringify([
          "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop",
        ]),
        1,
        2780,
      ],
      [
        "Nước hoa Sauvage Dior",
        "Nước hoa nam cao cấp 100ml",
        1599000,
        25,
        95,
        "Fashion",
        JSON.stringify([
          "https://images.unsplash.com/photo-1542602927-5d51e8c2e27c?w=500&h=500&fit=crop",
        ]),
        0,
        1690,
      ],
    ];

    for (const product of products) {
      await connection.execute(
        "INSERT INTO Products (name, description, price, stock, sold, category, images, isPromotion, viewCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        product,
      );
    }

    console.log(`✅ Inserted ${products.length} products`);
    console.log("✅ Seed completed successfully");
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await connection.end();
  }
};

seed();
