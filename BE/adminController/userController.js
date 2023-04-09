const { Truyen, TacGia, TheLoai, Chapter, TaiKhoan } = require("../model/model");
const jwt = require("jsonwebtoken");
const usercontroller = {
  GetUser: async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, item) => {
        TaiKhoan.find({ TaiKhoan: item.TaiKhoan }, function (err, items) {
          if (err) {
            console.log(err);
            res.render("../views/user/user", { listuser: [], item });
          } else {
            //không thể lấy ra admin tổng
            var nonAdminUsers = items.filter(function (user) {
              return user.TaiKhoan !== "admin";
            });
            res.render("../views/user/user", { listuser: nonAdminUsers, item });
          }
        });
      });
    } else {
      res.redirect("/login");
    }
  },
  GetCreateUser: async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, item) => {
        res.render("../views/user/addUser", { message: 2, item });
      });
    } else {
      res.redirect("/login");
    }
  },
  PostCreateUser: async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, item) => {
        try {
          if (req.body.MatKhau != req.body.XacNhanMatKhau) {
            //thông báo xác nhận mật khẩu sai
            res.render("../views/user/addUser", { message: 1, item });
          }
          const salt = await bcrypt.genSalt(10);
          const hashed = await bcrypt.hash(req.body.MatKhau, salt);
          //tạo tài khoản mới
          var user = new TaiKhoan({
            TaiKhoan: req.body.TaiKhoan,
            MatKhau: hashed,
            HoTen: req.body.HoTen,
            Email: req.body.Email,
            PhanQuyen: req.body.isAdmin,
            TrangThai: req.body.isActive,
          });
          //lưu vào database
          await user.save();
          res.redirect("/user");
        } catch (err) {
          res.render("../views/user/addUser", { message: 0, item });
        }
      });
    }
  },
  GetUpdateUser: async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, item) => {
        TaiKhoan.findById(req.params.id, function (error, user) {
          if (error) {
          } else {
            //2 là thông báo bình thường
            res.render("../views/user/updateUser", { message: 2, item, user });
          }
        });
      });
    } else {
      res.redirect("/login");
    }
  },
  PostUpdateUser: async (req, res) => {
    var update = {
      TaiKhoan: req.body.TaiKhoan,
      HoTen: req.body.HoTen,
      Email: req.body.Email,
      PhanQuyen: req.body.isAdmin,
      TrangThai: req.body.isActive,
    };
    TaiKhoan.findByIdAndUpdate(req.params.id, update, function (err, item) {
      if (err) {
        //2 là thông báo bình thường
        res.render("../views/user/updateUser", { message: 2, item, user });
      } else {
        res.redirect("/user");
      }
    });
  },
  //show update admin
  GetUpdateAdmin: async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, async (err, item) => {
        TaiKhoan.findById(req.params.id, function (error, admin) {
          if (error) {
          } else {
            //2 là thông báo bình thường
            res.render("../views/user/updateAdmin", { message: 2, item, admin });
          }
        });
      });
    } else {
      res.redirect("/login");
    }
  },
  //update admin
  PostUpdateAdmin: async (req, res) => {
    var update = {
      TaiKhoan: req.body.TaiKhoan,
      HoTen: req.body.HoTen,
      Email: req.body.Email,
    };
    TaiKhoan.findByIdAndUpdate(req.params.id, update, function (err, item) {
      if (err) {
        //2 là thông báo bình thường
        res.render("../views/user/updateAdmin", { message: 2, item, admin });
      } else {
        res.redirect("/login");
      }
    });
  },
};
module.exports = usercontroller;
