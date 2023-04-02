const { Truyen, TacGia, TheLoai, Chapter, TaiKhoan } = require("../model/model");
const catecontroller = {
  GetCate: async (req, res) => {
    session = req.session;
    if (session.userid) {
      TaiKhoan.findOne({ TaiKhoan: session.userid }, function (err, item) {
        TheLoai.find(function (err, items) {
          if (err) {
            console.log(err);
            res.render("../views/category/category", { listcate: [], item });
          } else {
            res.render("../views/category/category", { listcate: items, item });
          }
        });
      });
    } else {
      res.redirect("/login");
    }
  },
  GetCreateCate: async (req, res) => {
    session = req.session;
    if (session.userid) {
      TaiKhoan.findOne({ TaiKhoan: session.userid }, function (err, item) {
        res.render("../views/category/addCategory", { message: 2, item });
      });
    } else {
      res.redirect("/login");
    }
  },
  PostCreateCate: async (req, res) => {
    var cate = new TheLoai({
      TenTheLoai: req.body.TenTheLoai,
    });
    TaiKhoan.findOne({ TaiKhoan: session.userid }, function (err, item) {
      cate.save(function (err) {
        if (err) {
          console.log("save category error:" + err);
          res.render("../views/category/addCategory", { message: 0, item });
        } else {
          console.log("save category successfully with id category :" + cate._id);
          res.render("../views/category/addCategory", { message: 1, item });
        }
      });
    });
  },
  GetUpdateCate: async (req, res) => {
    session = req.session;
    if (session.userid) {
      TaiKhoan.findOne({ TaiKhoan: session.userid }, function (err, item) {
        TheLoai.findById(req.params.id, function (error, cate) {
          if (error) {
          } else {
            res.render("../views/category/updateCategory", {
              message: 2,
              item,
              cate,
            });
          }
        });
      });
    } else {
      res.redirect("/login");
    }
  },
  PostUpdateCate: async (req, res) => {
    var update = { TenTheLoai: req.body.TenTheLoai };
    TheLoai.findByIdAndUpdate(req.params.id, update, function (err, item) {
      if (err) {
        res.render("../views/category/updateCategory", { message: 0, item });
      } else {
        res.redirect("/category");
      }
    });
  },
};
module.exports = catecontroller;
