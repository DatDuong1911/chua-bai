var router = require("express").Router();
var path = require("path")
router.get("/", function(req,res){
    res.sendFile(path.join(__dirname, "../views/home.html"))
})
router.get("/login", function(req,res){
    res.sendFile(path.join(__dirname, "../views/login.html"))
})
router.get("/demo", function(req,res){
    res.sendFile(path.join(__dirname, "../views/demo.html"))
})
router.get("/detail-user/:id", function(req,res){
    res.sendFile(path.join(__dirname, "../views/detailUser.html"))
})

router.get("/sign-up", function(req, res){
    res.sendFile(path.join(__dirname, "../views/index.html"))
})

module.exports = router