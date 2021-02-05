const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bai2', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("kết nối db thành công");
});
let Schema = mongoose.Schema;
//định nghĩa các cột 
let userSchema = new Schema({
    username: String,
    address: String,
    password: String,
    age: Number
})
//định nghĩa tên bảng
//tên này khi mà chạy mongodb thì nó sẽ TỰ ĐỘNG THÊM 's' vào sau tên mà mình muốn
let UserModel = mongoose.model("user", userSchema);

// UserModel.create