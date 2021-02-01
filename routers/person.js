var express = require("express")
var router = express.Router();
var userRouter = require("./user")
// BÀI 2: cho obj = { name : " nodemy "}
var person = { name : " nodemy "}
// a) tạo api hiển thị toàn bộ thuộc tính của obj
router.get("/hien-thi", function(req, res){
    res.json({
        message: "Hiển thị dữ liệu thành công",
        data: person
    })
})
// b) tạo api hiển thị giá trị thuộc tính của obj theo key
router.get("/:key", function(req, res){
    res.json({
        message: "Hiển thị dữ liệu thành công",
        data: person[req.params.key]
    })
})
// c) Tạo 1 api thêm mới 1 thuộc tính vào obj. ví dụ là sau khi thêm obj có dạng { name:"nodemy", age: 20};
router.post("/", function(req, res){
    person = Object.assign(person, req.body)
    res.json({
        message: "Hiển thị dữ liệu thành công",
        data: person
    })
})
// d) Tạo 1 api cập nhật giá trị thuộc của obj theo key, nếu key không tồn tại hãy in ra thông báo
router.put("/:key", function(req, res){
    if(person[req.params.key]){
        person[req.params.key] = req.body.value
        return res.json("cập nhật thành công")
    }
    return res.json("cập nhật không thành công")

})
// e) tạo 1 api xóa thuộc tính của obj theo key
router.delete("/", function(req, res){
    if(person[req.query.key]){
        delete person[req.query.key]
        return res.json("xóa thành công")
    }
    return res.json("xóa không thành công")

})
module.exports = router;