var router = require("express").Router();
var path = require("path")
router.get("/sign-up", function(req, res){
    res.sendFile(path.join(__dirname, "../views/index.html"))
})

module.exports = router