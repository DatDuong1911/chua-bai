var router = require("express").Router();
var path = require("path")
router.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "../views/home.html"))
})

router.get("/detail-user/:id", function(req,res){
    res.sendFile(path.join(__dirname, "../views/detailUser.html"))
})

router.get("/sign-up", function(req, res){
    res.sendFile(path.join(__dirname, "../views/index.html"))
})

module.exports = router