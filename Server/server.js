require('dotenv/config')
const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require('body-parser');
const cors=require('cors');

const router = require('./routes');



const app=express();
app.use(bodyparser.json());
app.use(cors());


const MongoUrl=process.env.DB_CONNECTION;
mongoose.connect(MongoUrl);
const db=mongoose.connection
db.on('error',console.error.bind(console,"connection error"));
db.on('open',function(){
    console.log("Successfully Connected")
})

app.get('/',(req,res)=>{
    res.send("app is running..")
    
})

app.use('/todos',router)


app.listen("3002",()=>{
    console.log('app is running....')
})