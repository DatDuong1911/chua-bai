var express = require("express")
var router = express.Router();
var userServies = require("../services/userServies");
router.get("/", function(req, res){
    //hiển thị toàn dữ liệu trong database
    // 200, 201, 400, 403, 401, 500, 404, 300
    userServies.getAllUser().then((listUser) => {
        res.status(200).json({
            error: false,
            message: "hiển thị dữ liệu thành công",
            data: listUser
        })
    }).catch((err) => {
        res.status(500).json({
            error: true,
            message: err,
        })
    });
})

router.get("/:id", function(req, res){
    var id = req.params.id;
    userServies.getDetailUser(id).then(user => {
        res.status(200).json({
            error: false,
            message: "hiển thị dữ liệu thành công",
            data:user
        })
    }).catch((err) => {
        res.status(500).json({
            error: true,
            message: err,
        })
    });
})

router.put("/:id", function(req, res){
    var id = req.params.id;
    //cập nhật toàn bộ giá trị theo id
    userServies.updateUser(id, req.body).then(result => {
        res.status(200).json({
            error: false,
            message: "cập nhật dữ liệu thành công",
        })
    }).catch((err) => {
        res.status(500).json({
            error: true,
            message: err,
        })
    });
})

router.delete("/:id", function(req, res){
    var id = req.params.id;
    //xóa người dung theo id
})

router.post("/", function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var age = req.body.age;
    userServies
    .createUser(username, email, password,age)
    .then((data) => {
        res.json({
            error: false,
            message: "đăng kí thành công"
        })
    }).catch((err) => {
        res.json({
            error: true,
            message: "đăng kí không thành công"
        })
    });
})

router.post("/login", function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    userServies
    .login(email, password)
    .then((data) => {
    // tồn tại dữ liệu => data là { }
    // không tồn tại => data là null
      if(!data){
        return res.json({
            message: "Sai tên hoặc mật khẩu",
            error: true
        })
      }
      return res.json({
        message: "Đăng nhập thành công",
        error: false
    })
    }).catch((err) => {
        res.json("không thể kết nối được server")
    });
})

module.exports = router