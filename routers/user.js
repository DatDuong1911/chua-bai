var express = require("express")
var router = express.Router();
var userServies = require("../services/userServies");

router.get("/", function(req, res){
    //hiển thị toàn dữ liệu trong database
    // userSerives.getAllUser()
})

router.get("/:id", function(req, res){
    var id = req.params.id;
    //hiển thị chi tiết một người dùng theo id
    // userSerives.getUserById()
})

router.put("/:id", function(req, res){
    var id = req.params.id;
    //cập nhật toàn bộ giá trị theo id

//câu khó  
    // check dữ liệu đầu vào có giá trị hay không
    // Nếu có thì cho cập nhật cột mà người dùng gửi lên,
    // nếu 1 cột mà không có giá trị người dùng truyền lên
    // thì không cho cập nhật
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