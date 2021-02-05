var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var userRouter = require("./routers/user")

//config cho app
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(express.static("public"))
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./views/index.html"))
})

app.use("/user", userRouter);

// tên api = tên server + tên router
// "/person" + "/hien-thi" = "/person/hien-thi"

app.listen(3000, function(){
    console.log("dang ket noi tai cong 3000");
})