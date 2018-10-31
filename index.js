/*
    by 杨益汉
    time 2017/12/10
                */

//express
var servers = require("./server/index")
var app = servers.app

//mongodb
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';

app.get('/', function (req, res) {
    console.log("主页 GET 请求");
    res.send('Hello GET');
})

//注册登陆
var register = require("./computed/register/index")
app.post("/member/register",function (req,res) {
    register.insertData(req,res,DB_CONN_STR,MongoClient)
})
app.post("/member/login",function (req,res) {
    register.login(req,res,DB_CONN_STR,MongoClient)
})


//用户管理
var member = require("./computed/memberData/index")
app.post("/memberData/query",function (req,res) {
    member.queryMember(req,res,DB_CONN_STR,MongoClient)
})
app.post("/memberData/add",function (req,res) {
    member.addMember(req,res,DB_CONN_STR,MongoClient)
})

//活动管理
var activity = require("./computed/activity/index")
app.post("/activity/add",function (req,res) {
    activity.addActivity(req,res,DB_CONN_STR,MongoClient)
})
app.post("/activity/query",function (req,res) {
    activity.queryActivity(req,res,DB_CONN_STR,MongoClient)
})
app.get("/activity/delete",function (req,res) {
    activity.deleteActivity(req,res,DB_CONN_STR,MongoClient)
})
app.post("/activity/desc",function (req,res) {
    activity.ActivityDesc(req,res,DB_CONN_STR,MongoClient)
})