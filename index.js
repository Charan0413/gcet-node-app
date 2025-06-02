import express from 'express'
const app = express()
app.listen(8080, () =>{
    console.log("Server Started")
})

app.get("/",(req,res)=>{
    return res.send("hello world")
})
app.get("/greet",(req,res)=>{
   return res.send (("Greetinngs"))
})
app.get("/name",(req,res)=> {res.send("Sricharan")})
app.get("/weather",(req,res)=> {res.send("31Degrees")}) 