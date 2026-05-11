require("dotenv").config();
const express = require("express");
const cors = require("cors");
const configViewEngine = require("./config/viewEngine");
const { connection } = require("./config/database");

const app = express();
const port = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

configViewEngine(app);

// Tạm comment các route API chưa code tới
// const apiRoutes = require('./routes/api');
// app.use('/v1/api/', apiRoutes);

// Route test cơ bản
app.get("/", (req, res) => {
  res.send("Hello World with Nodejs & MySQL!");
});

(async () => {
  try {
    // Kiểm tra kết nối database
    await connection();

    app.listen(port, () => {
      console.log(`Backend Nodejs App listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>> Error starting server: ", error);
  }
})();
