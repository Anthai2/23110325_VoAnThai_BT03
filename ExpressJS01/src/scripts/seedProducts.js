require("dotenv").config();

const { sequelize } = require("../config/database");
const Product = require("../models/product");

const seedData = [
  {
    name: "Laptop Aurora X14",
    description: "Laptop mỏng nhẹ cho sinh viên và dân văn phòng.",
    price: 22990000,
    stock: 32,
    sold: 85,
    category: "Laptop",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    ],
    isPromotion: true,
  },
  {
    name: "Laptop Falcon Pro 15",
    description: "Laptop hiệu năng cao cho lập trình và thiết kế.",
    price: 31990000,
    stock: 18,
    sold: 61,
    category: "Laptop",
    images: [
      "https://images.unsplash.com/photo-1484788984921-03950022c9ef",
      "https://images.unsplash.com/photo-1522199710521-72d69614c702",
    ],
    isPromotion: false,
  },
  {
    name: "Laptop Nova Air 13",
    description: "Pin lâu, màn đẹp, phù hợp làm việc di động.",
    price: 19990000,
    stock: 26,
    sold: 103,
    category: "Laptop",
    images: [
      "https://images.unsplash.com/photo-1504707748692-419802cf939d",
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29",
    ],
    isPromotion: true,
  },
  {
    name: "Tai nghe Sonic Buds",
    description: "Tai nghe không dây chống ồn chủ động.",
    price: 1790000,
    stock: 55,
    sold: 245,
    category: "Audio",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    ],
    isPromotion: true,
  },
  {
    name: "Tai nghe Studio Max",
    description: "Âm thanh chi tiết, đeo êm cho thời gian dài.",
    price: 2590000,
    stock: 41,
    sold: 120,
    category: "Audio",
    images: [
      "https://images.unsplash.com/photo-1545127398-14699f92334b",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944",
    ],
    isPromotion: false,
  },
  {
    name: "Chuột Swift M5",
    description: "Chuột bluetooth im lặng, pin dùng 12 tháng.",
    price: 590000,
    stock: 80,
    sold: 198,
    category: "Phu kien",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
    ],
    isPromotion: false,
  },
  {
    name: "Bàn phím Mecha K84",
    description: "Bàn phím cơ gọn nhẹ, switch tactile.",
    price: 1290000,
    stock: 47,
    sold: 174,
    category: "Phu kien",
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    ],
    isPromotion: true,
  },
  {
    name: "Màn hình ViewPro 27",
    description: "Màn hình 2K IPS 144Hz cho làm việc và giải trí.",
    price: 6990000,
    stock: 22,
    sold: 72,
    category: "Monitor",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
      "https://images.unsplash.com/photo-1547082299-de196ea013d6",
    ],
    isPromotion: false,
  },
  {
    name: "Màn hình Creator 32",
    description: "Màn hình 4K màu chuẩn cho đồ họa.",
    price: 13990000,
    stock: 10,
    sold: 34,
    category: "Monitor",
    images: [
      "https://images.unsplash.com/photo-1585792180666-f7347c490ee2",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6",
    ],
    isPromotion: true,
  },
  {
    name: "Webcam Focus 1080p",
    description: "Webcam góc rộng, mic kép lọc ồn.",
    price: 890000,
    stock: 64,
    sold: 156,
    category: "Phu kien",
    images: [
      "https://images.unsplash.com/photo-1593642702909-dec73df255d7",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    ],
    isPromotion: false,
  },
  {
    name: "Loa Mini Boom",
    description: "Loa bluetooth chống nước, pin 10 giờ.",
    price: 1290000,
    stock: 38,
    sold: 139,
    category: "Audio",
    images: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    ],
    isPromotion: true,
  },
  {
    name: "SSD NVMe 1TB",
    description: "Tốc độ đọc ghi cao, nâng cấp máy nhanh chóng.",
    price: 1890000,
    stock: 73,
    sold: 210,
    category: "Luu tru",
    images: [
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988",
      "https://images.unsplash.com/photo-1555617981-dac3880eac6e",
    ],
    isPromotion: false,
  },
  {
    name: "Ổ cứng di động 2TB",
    description: "Nhỏ gọn, sao lưu dữ liệu tiện lợi.",
    price: 1690000,
    stock: 49,
    sold: 167,
    category: "Luu tru",
    images: [
      "https://images.unsplash.com/photo-1531492746076-161ca9bcad58",
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6",
    ],
    isPromotion: true,
  },
  {
    name: "Router WiFi 6 AX3000",
    description: "Phủ sóng mạnh, ổn định cho gia đình.",
    price: 2490000,
    stock: 29,
    sold: 93,
    category: "Network",
    images: [
      "https://images.unsplash.com/photo-1624969862293-b749659ccc4c",
      "https://images.unsplash.com/photo-1520869562399-e772f042f422",
    ],
    isPromotion: false,
  },
  {
    name: "Balo laptop Urban 15",
    description: "Chống sốc, nhiều ngăn, chống nước nhẹ.",
    price: 790000,
    stock: 57,
    sold: 147,
    category: "Phu kien",
    images: [
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7",
      "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    ],
    isPromotion: false,
  },
];

async function runSeed() {
  const shouldReset = process.argv.includes("--reset");

  try {
    await sequelize.authenticate();
    await Product.sync();

    if (shouldReset) {
      await Product.destroy({ where: {}, truncate: true, force: true });
      console.log("[seed] Cleared existing products.");
    }

    const existingCount = await Product.count();
    if (existingCount > 0 && !shouldReset) {
      console.log(
        `[seed] Products already exist (${existingCount}). Use --reset to reseed.`,
      );
      return;
    }

    const now = new Date();
    const payload = seedData.map((item, index) => ({
      ...item,
      createdAt: new Date(now.getTime() - index * 86400000),
      updatedAt: now,
    }));

    await Product.bulkCreate(payload);
    console.log(`[seed] Inserted ${payload.length} products successfully.`);
  } catch (error) {
    console.error("[seed] Failed:", error.message || error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

runSeed();
