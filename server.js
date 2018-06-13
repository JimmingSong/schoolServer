let http = require('http');
let mysql = require('mysql');
let path = require('path');
let fs = require('fs');
let url = require('url');
let express = require('express');
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
 app.use(express.static('../school/dist'))

app.get('/show',function(req,res){})
app.get('/search',function(req,res,next){
	res.header('Access-Control-Allow-Origin', '*');  
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');  
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS'); 
	let obj = url.parse(req.url, true);
	let path = obj.pathname;
	res.setHeader('Content-Type','text/json');
	if(path === '/search'){
		res.setHeader('Content-Type','application/json;charset=utf-8');
		// let str;
		// fun.selectProduct(pool,res,str);
		let pro = new Promise((resolve,reject)=>{
			let sql = 'SELECT * FROM products WHERE k = 1';
			pool.getConnection(function(err, conn) {				
				conn.query(sql,(err,result)=>{
					if(err) throw err;
					if(result){
						resolve(result,conn);
					}else{
						reject('请求失败')
					}
				})
				conn.release();
			})
		})
		let p1 = pro.then((result,conn)=>{
			console.log(result);
			str = result;
			res.json(result);
			// conn.release();
		})
		let p2 = pro.catch((code)=>{
			res.json(code);
		})
		// res.json(str);
	}
})
app.use(function(err,req,res,next){
	console.log(err.stack);
	res.status(500).send('nothing')
})
var server = app.listen(8088, function (req,res) {
 	var host = server.address().address
 	var port = server.address().port
 	console.log('OK');
})

let fun = {
	selectProduct(pool,res){
		return new Promise((resolve,reject)=>{
			let sql = 'SELECT * FROM products WHERE k = 1';
			pool.getConnection(function(err,conn) {
				conn.query(sql,(err,result)=>{
					if(err) throw err;
					// res.setHeader('Content-Type','application/json;charset=utf-8');
					resolve(result);
					conn.release();
				})
				// body
			})
		})
	}
};
function async(resolve,reject){

}