/**
 * @author:水痕
 * @time:2017-07-13 14:21
 * @email:332904234@qq.com
 * @version:1.0
 * @fileName:03_router
 * @title:
 */
'use strict';
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
//引入数据库文件
const db = require("./../module/db");
//引入生成随机数的
const random = require("./../utils/random");
//引入baset64加密的
const Base64 = require("./../utils/base64");

router.get("/", (req, res) => {
    // const str1 = random(false,8);
    // console.log(`随机数:${str1}`);
    // var base64 = new Base64();
    // console.log(`加密后:${base64.encode(str1)}`);
    // console.log(`解密后:${base64.decode(base64.encode(str1))}`);
    res.render("03_index.ejs");
});

/**
 * 定义post提交数据
 */
router.post("/regest",(req,res)=>{
    console.log(req.body);
    //1.生成8位的随机数
    let randomWord = random(false,8);
    let base64 = new Base64();
    //2.对生成的随机数加密
    let base64Random = base64.encode(randomWord);

    let name = req.body.username;
    let password = req.body.password;
    //3.将第二步的值与密码拼接
    let newPas = base64Random + password;
    let md5 = crypto.createHash("md5");
    //4.将第三步的进行md5加密
    let md5Pas = md5.update(newPas).digest("hex");
    //5.将第四步进行base64加密
    let base64Md5 = base64.encode(md5Pas);
    //6.将第二步与第五步拼接
    let lastPassword = base64Random + base64Md5;
    db("insert into user1(name,password) values(?,?)",[name,lastPassword],(err,data)=>{
        if (err){
            res.send("注册失败");
        }
        console.log(data);
        if (data){
            res.send("注册成功");
        }
    })
});

router.post("/login",(req,res)=>{
    let name = req.body.username;
    let password = req.body.password;
    if (!name || !password){
        res.send("请输入用户名与密码");
        return false;
    }
    db("select * from user1 where name = ?",[name],(err,data)=>{
        if (err){
            res.send("发生错误");
        }
        if (data){
            console.log(data[0].password);
            //1.获取到的密码截取前面随机数通过base64加密的结果
            let base64Random = data[0].password.substring(0,12);
            //2.将第一步的结果与用户输入的密码拼接
            let newPas = base64Random + password;
            //3.将第二步的结果进行MD5加密
            let md5 = crypto.createHash("md5");
            let md5Pas = md5.update(newPas).digest("hex");
            //4.将第三步进行base64加密
            let base64 = new Base64();
            let base64Md5 = base64.encode(md5Pas);
            //5.将第一步与第四步拼接
            let lastPassword = base64Random + base64Md5;
            if (data[0].password === lastPassword){
                res.send("登录成功");
            }else {
                res.send("用户名或密码错误");
            }
        }
    })
})

module.exports = router;
