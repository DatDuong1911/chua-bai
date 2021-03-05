var mongoose = require("../config/dbConnect")
//tạo bảng dữ liệu
let Schema = mongoose.Schema;
//định nghĩa các cột 
let userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
    roles: {
        default: "user",
        type: String
    }
})
//định nghĩa tên bảng
//tên này khi mà chạy mongodb thì nó sẽ TỰ ĐỘNG THÊM 's' vào sau tên mà mình muốn
let UserModel = mongoose.model("user", userSchema);
module.exports = UserModel
