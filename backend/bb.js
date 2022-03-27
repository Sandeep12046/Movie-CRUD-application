const express=require('express');
const mysql=require('mysql');
const cors=require('cors');
const bodyParser =require('body-parser');
const { use } = require('express/lib/application');

const app=express();


const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"S@ndy12046",
    database:"cruddatabse",
    port:3306
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post("/api/inserts",function(req,res){
    const movieName=req.body.movieName;
    const movieReview=req.body.movieReview;
    var sql="insert into movie_reviews(movieName,movieReview)values(?,?)";
    con.query(sql,[movieName,movieReview],function(err,result){
        res.send(result);
    })
})
app.get("/api/get",function(req,res){
    const sqlSelect="select * from movie_reviews";
    con.query(sqlSelect,function(err,result){
        res.send(result);
    })
})
app.delete("/api/delete:movieName",function(req,res){
    const name=req.params.movieName;
    const deletesql="delete from movie_reviews where movieName=?";
    con.query(deletesql,name,function(err,result){
        if(err) throw err;
        console.log(err);
    })
})

app.put("/api/update",function(req,res){
    const name=req.body.movieName;
    const review=req.body.movieReview;
    const deletesql="update movie_reviews set movieReview=? where movieName=?";
    con.query(deletesql,[review,name],function(err,result){
        if(err) throw err;
        console.log(result);
    })
})


app.listen(7000,function(err){
    if(err) throw err;
    console.log("server is created");
})