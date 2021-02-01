var express = require("express")
var router = express.Router();



var user =[{
    id:1,
 name:"Phong",
 password:"1",
 address:"HN"	
},{
    id:2,
 name:"Sang",
 password:"1",
 address:"HP"	
},
{
    id:3,
 name:"Tan",
 password:"1",
 address:"Bắc Ninh"	
},
{
    id:4,
 name:"Dũng",
 password:"1",
 address:"TQ"	
},
]


// a) Tạo api hiển thị toàn bộ giá trị của mảng
router.get("/", function(req, res){
    res.json({
        message: "Hiển thị dữ liệu thành công",
        data: user
    })
})
// b) Tạo api hiển thị giá trị của mảng theo id
router.get("/:id", function(req, res){
    var dataUser = user.filter((userItem) => {
        return userItem.id === parseInt(req.params.id)
    })
    if(dataUser.length){
        return res.json({
            message: "Hiển thị dữ liệu thành công",
            data: dataUser
        })
    }
    return res.json({
        message: "Người dùng không tồn tại",
    })
})
// c) Tạo api thêm mới giá trị vào array theo dạng
	// {
	// 	id: 5,
	// 	name: "Mạnh",
	// 	password: "1",
	// 	address: "Mỹ"

	// }
router.post("/", function(req, res){
    var id = parseInt(req.body.id);
    var name = req.body.name;
    var password = req.body.password;
    var address = req.body.address;
    user.push({
        id: id,
        name: name,
        password: password,
        address: address
    });
    res.json("thêm mới thành công")
})

// d) Tạo api cập nhật giá trị của mảng theo id = 2, với giá trị theo dạng
// 	{
// 		id: 2,
// 		name: "Vinh",
// 		password: "1",
// 		address: "Mỹ"
// 	}
router.put("/:id", function(req, res){
    var id = parseInt(req.params.id);
    var name = req.body.name;
    var password = req.body.password;
    var address = req.body.address;
    var count = 0;
    for(var i = 0; i < user.length; i++){
        if(user[i].id === id){
            user[i].name = name;
            user[i].password = password;
            user[i].address = address;
            count++;
        }
    }
    if(count){
        return res.json("cập nhật thành công")
    }
    return res.json("người dùng không tồn tại")
});
// e) Tạo api xóa giá trị của mảng theo id
router.delete("/:id", function(req, res){
    var dataUser = user.filter((userItem) => {
        return userItem.id !== parseInt(req.params.id)
    })
    if(dataUser.length < user.length){
        user = dataUser;
        return res.json({
            message: "Xóa dữ liệu thành công",
        })
    }
    return res.json({
        message: "Người dùng không tồn tại",
    })
})
// f) Tạo api đăng nhập theo tài khoản gồm name,password của array
// - Kiểm tra xem tài khoản có tồn tại trong mảng không? Nếu có thì in ra thông báo đăng nhập thành công? 
// Nếu không thì in ra thông báo đăng nhập
// sai name hoặc mật khẩu
router.post("/login", function(req, res){
    var count = 0;
    for(var i = 0; i < user.length; i++){
        if(user[i].name === req.body.name && user[i].password === req.body.password){
            count++;
        }
    }
    if(count){
        return res.json({
            message: "Đăng nhập thành công"
        })
    }
    return res.json({
        message: "Sai tên hoặc mật khẩu"
    })
})

module.exports = router