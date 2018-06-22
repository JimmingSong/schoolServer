let http = require('http');
let mysql = require('mysql');
let path = require('path');
let fs = require('fs');
let url = require('url');
let express = require('express');
let bodyParser = require('body-parser')
// let fun = require('./fun.js')
// console.log(fun);

var pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'products'
});

let app = express();

// app.use(express.static('static'))
// app.use(express.static('../school/dist'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/show', function(req, res) {})

app.get('/search', function(req, res, next) {
   setHead(res);
   let obj = url.parse(req.url, true);
   let path = obj.pathname;
   let pro = new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM products WHERE k = 1';
      pool.getConnection(function(err, conn) {
         conn.query(sql, (err, result) => {
            if (err) throw err;
            if (result) {
               resolve(result, conn);
            } else {
               reject('请求失败')
            }
         })
         conn.release();
      })
   })
   let p1 = pro.then((result, conn) => {
      str = result;
      res.json(result);
   })
   let p2 = pro.catch((code) => {
      res.json(code);
   })
})
app.post('/register', (req, res) => {
   setHead(res);
   let obj = url.parse(req.url, true);
   let path = obj.pathname;
   // res.setHeader('Content-Type', 'application/json;charset=utf-8');
   let n = req.body.name;
   let g = req.body.g;
   let t = req.body.tel;
   let e = req.body.email;
   let p = req.body.pwd;
   // console.log(n,g,t,e,p);
   let pro = new Promise((resolve, reject) => {
      let sql = 'INSERT INTO user VALUES(null,?,?,?,?,?)';
      pool.getConnection(function(err, conn) {
         conn.query(sql, [n, g, t, e, p], (err, result) => {
            if (result.affectedRows > 0) {
               res.json('true')
            } else {
               res.json('false')
            }
         })
         conn.release();
      })
   })
   pro.then((result) => {
      // console.log(result);
   })
})
app.post('/login', (req, res) => {
   setHead(res);
   let n = req.body.name;
   let p = req.body.pwd;
   new Promise((resolve,reject)=>{
      let sql = `SELECT * FROM user WHERE name=?`;
      pool.getConnection((err,conn)=>{
         conn.query(sql,[n],(err,result)=>{
            console.log(result);
            if (result.length > 0) {
               let person = {
               name:result[0].name,
               pwd:result[0].pwd
            }
            resolve(person)
            }else{
               reject(false)
            }
         })
         // }
      })
   }).then((person)=>{
      console.log(person);
      let name = person.name;
      let pwd = person.pwd;
      let obj = {};
      if(name){
         if(pwd === p){
            obj.status = true;
            obj.per = name;
            res.json(obj)
         }else{
            obj.status = false;
            obj.per = "密码输入错误,请重新输入";
            res.json(obj);
         }
      }else{
         obj.status = false;
         obj.per = "用户名不存在,请检查是否输入错误";
         res.json(obj);
      }
   }).catch(()=>{
      res.json({status:false,per:'用户名不存在,请检查是否输入错误'})
   })
})
app.use(function(err, req, res, next) {
   res.status(500).send('nothing')
})
var server = app.listen(8088, function(req, res) {
   var host = server.address().address
   var port = server.address().port
   console.log('OK');
})

function setHead(res) {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
   res.header('Content-Type', 'application/json;charset=utf-8');
}