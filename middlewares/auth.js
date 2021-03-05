var userServies = require("../services/userServies");
function checkAuthEmail(req, res, next){
    var email = req.body.email;
    userServies.checkEmail(email).then((user) => {
        if(user){
            return res.json({
                error: false,
                message: "Tài khoản đã tồn tại vui lòng đăng kí tài khoản khác"
            })
        }
        next();
    }).catch((err) => {
        
    });
}
module.exports = {
    checkAuthEmail
}