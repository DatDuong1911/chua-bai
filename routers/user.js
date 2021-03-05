var express = require("express")
var router = express.Router();
var userServies = require("../services/userServies");
const bcrypt = require('bcrypt');
let checkAuth = require("../middlewares/auth")
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
  

//hiển thị toàn bộ-> chỉ dành cho admin, nếu là tìa khoản thường sẽ không được phép hiển thị toàn bộ
router.get("/", function(req, res, next){
    try {
        var token = req.query.token;
        var decode = jwt.verify(token, "nodemy");
        userServies.getDetailUser(decode._id).then((user) => {
            if(!user){
                return res.json({
                    error: true,
                    message: "Tài khoản không tồn tại"
                })
            }
            req.user = user;
            next();
        }).catch((err) => {
            
        });
    } catch (error) {
        console.log(error);
        if(error.message === "jwt must be provided"){
            return res.json({
                error: true,
                message: "Bạn phải cung cấp mã token"
            })
        }
        if(error.message === "invalid signature"){
            return res.json({
                error: true,
                message: "Mã token không đúng"
            })
        }
        return res.json({
            err: "lỗi",
            message: error,
        })
    }
}, function(req, res, next){
    if(req.user.roles !== "admin"){
        return res.json({
            error: true,
            message: "Bạn không có quyền"
        })
    }
    next();
}, function(req, res){
    userServies.getAllUser().then((listUser) => {
        res.status(200).json({
            error: false,
            message: "hiển thị dữ liệu thành công",
            data: listUser,
            user: req.user
        })
    }).catch((err) => {
        res.status(500).json({
            error: true,
            message: err,
        })
    });
})
//hiển thị chi tiết người dùng, nếu là admin hoặc user thì được hiển thị thông tin của nó,
// nếu mà là tài khoản khác người dùng hoặc admin thì không cho vào 
router.get("/:id", function(req, res, next){
    try {
        var token = req.query.token;
        var decode = jwt.verify(token, "nodemy");
        userServies.getDetailUser(decode._id).then((user) => {
            if(user._id === req.params._id || user.roles === "admin"){
               return next();
            }
        }).catch((err) => {
            
        });
    } catch (error) {
        return res.json({
            err: "lỗi",
            message: error,
        })
    }
} ,function(req, res){
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

//middleware: check người dùng => người dùng chưa đăng nhập và người dùng đã đăng nhập




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

router.post("/",checkAuth.checkAuthEmail, function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var age = req.body.age;
    // var roles = req.body.roles;
    console.log("bạn đang ở function sau");
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