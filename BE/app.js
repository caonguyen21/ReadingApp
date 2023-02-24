const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const tacgiaRoute = require("./routes/TacGia");
const truyenRoute = require("./routes/Truyen");
// const taikhoanRoute = require("./routes/TaiKhoan");
// const chapterRoute = require("./routes/Chapter");
// const binhluanRoute = require("./routes/BinhLuan");
const theloaiRoute = require("./routes/TheLoai");

//giao diện
const http = require("http");
const css = require("css");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors()); //CORS là một cơ chế cho phép nhiều tài nguyên khác nhau (fonts, Javascript, v.v…) của một trang web có thể được truy vấn từ domain khác với domain của trang
app.use(morgan("common")); // khi send request sẽ thông báo dưới terminal

//kết nối database
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL, function (err) {
  if (err) {
    console.log("Connected to MongoDB fail:" + err);
  } else {
    console.log("Connected to MongoDB successful");
  }
});

//Routes
app.use("/TacGia", tacgiaRoute);
app.use("/TheLoai", theloaiRoute);
app.use("/Truyen", truyenRoute);
// app.use("/TaiKhoan", taikhoanRoute);
// app.use("/Chapter", chapterRoute);
// app.use("/BinhLuan", binhluanRoute);

// sử dụng thư mục public
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
//kiểm tra port hoạt động ở 8000
const server = http.Server(app);
server.listen(8000, () => {
  console.log(`Server is running → PORT ${server.address().port}`);
});
//link dẫn
app.get("/", (req, res) => {
  res.render("HomePage");
});
app.get("/login", (req, res) => {
  res.render("Login");
});
