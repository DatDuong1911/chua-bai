var UserModel = require("../models/userModel");

//thêm, sửa xóa tìm kiếm,....
// b1: xác định số lượng giá trị cần từ người dùng
// b2: sử dụng hàm tương tác với DB tương ứng
function createUser(username, email, password, age){
    return UserModel.create({
        username: username,
        email: email,
        password: password,
        age: age,
    })
}

function login(email, password){
    return UserModel.findOne({
        email: email,
        password: password
    })
}

function getAllUser(){
    return UserModel.find()
}
function getDetailUser(id){
    return UserModel.findOne({
        _id: id
    })
}

function checkEmail(email){
    return UserModel.findOne({email: email})
}

function updateUser(id, data){
    return UserModel.updateOne({
        _id: id
    }, data)
}
module.exports = {
    createUser: createUser,
    login: login,
    getAllUser: getAllUser,
    getDetailUser,
    updateUser,
    checkEmail
}