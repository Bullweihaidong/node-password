/**
 * @author:水痕
 * @time:2017-07-13 14:14
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:03_express
 * @title:
 */
'use strict';
const express = require("express");
const app = express();
//引入关于post提交数据的
const bodyParser = require("body-parser");
//引入cookie文件
const cookieParser = require("cookie-parser");
//引入session模块
const session = require("express-session");



//配置模板的文件路径
app.set("views",__dirname+"/views");
//配置模板引擎
app.set("view engine","ejs");
//设置静态文件的加载(js,css,img)
app.use(express.static(__dirname+"/public"));
//设置用来接收json格式的数据
app.use(bodyParser.json());
//设置接收任何数据类型
app.use(bodyParser.urlencoded({extended:true}));
//设置cookie,其中()里面的是密钥，随便写
app.use(cookieParser("aaa"))
//给session设置密钥
app.use(session({secret:"bbb"}));

app.use((req,res,next)=>{
    if (req.cookies.login){
        res.locals.login = req.cookies.login.name;
    }
    //不管怎么样都往下执行
    next();
})


app.use("/",require("./router/03_router"));

app.listen(3000);