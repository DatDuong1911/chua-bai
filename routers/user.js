var express = require("express")
var router = express.Router();
var userServies = require("../services/userServies");
const bcrypt = require('bcrypt');
const { updateUser } = require("../services/userServies");
const saltRounds = 10;
var jwt = require('jsonwebtoken');

//api giải mã token
router.get("/decode", function(req, res){
    try {
          // body, params, query
      var token = req.query.token || req.headers.authorization.split("Bearer ")[1];
      var decode = jwt.verify(token, "nodemy");
      userServies.getDetailUser(decode._id)
      .then((result) => {
        res.json({
            message: "thông tin người dùng",
            user: result
        })
      })
    } catch (error) {
        res.json(error)
    }
  })
  


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

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            userServies
            .createUser(username, email, hash, age)
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
        });
    });
    
})
router.post("/login", function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    userServies.checkEmail(email).then((user) => {
        if(!user){
            return res.json({
                message: "Nguời dùng không tồn tại",
                error: true
            })
        }
        bcrypt.compare(password, user.password).then(function(result) {
            if(result){
                var token = jwt.sign({ _id: user._id }, "nodemy", { expiresIn: "1d"});
                // giá trị mà mình sẽ sử dụng sau khi người dùng gửi lại mã token này
                // privateKey: là thông tin khóa bí mật(khóa này không được tiết lộ ra ngoài)
                // option: thông tin thuật toán mã hóa, ... thời gian tồn tại của token: expiresIn dưới dạng ms
                return res.json({
                    message: "Đăng nhập thành công",
                    error: false,
                    user: user,
                    token: token
                })
            }
         
            return res.json({
                message: "Đăng nhập không thành công",
                error: true,
            })
        });
    }).catch((err) => {
        res.json({
            error: true,
            message: "không thể kết nối được server"
        })
    });
})



module.exports = router