import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cors from "cors"
const app = express()
app.listen(8080, () =>{
    mongoose.connect("mongodb://localhost:27017/gcet ")
    console.log("Server Started")
});

const userSchema =mongoose.Schema({
    name: {type: String},
    email: {type: String},
    pass: {type: String}
   
});

const user = mongoose.model("user", userSchema);
app.use(cors());
app.use(express.json())

app.post("/register", async (req, res) => {
    const {name,email,pass} = req.body
    const result = await user.insertOne({name,email,pass});
    return res.json(result);
});

const loginSchema =mongoose.Schema({
    name: {type: String},
    email: {type: String},
    pass: {type: String}
   
});
const login = mongoose.model("login", loginSchema);
app.use(cors());
app.use(express.json())

app.post("/login", async (req, res) => {
    const {email,pass} = req.body
    const result = await user.insertOne({email,pass});
    return res.json(result);
});

app.get("/",(req,res)=>{
    return res.send("hello world")
})
app.get("/greet",(req,res)=>{
   return res.send (("Greetinngs"))
})
app.get("/name",(req,res)=> {res.send("Sricharan")})
app.get("/weather",(req,res)=> {res.send("31Degrees")}) 
app.get("/morning",(req,res)=> {res.send("Good morniing!!")}) 

















