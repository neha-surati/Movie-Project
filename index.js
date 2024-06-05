const express=require('express');
const database  = require('./config/database');
const Router= require('./routers/movie.router')
const path= require('path')

const app= express();

app.use(Router);

app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));

app.use("/uploads/image",express.static(path.join(__dirname,"/uploads/image")))

app.listen(8081,(err)=>{
    database();
    if(!err){
        console.log("server start: http://localhost:8081");
    }
})

