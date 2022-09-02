const express = require("express")
const knex = require("./connection/db.js")
const {createToken,veryfyToken} = require("./auth/token.js")
const validate= require("./validate/check.js")
const app = express();
const port = 6000;
app.use(express.json())

app.post("/register",validate, async (req,res) => {
    try {
    const {name,mo_number,personal} = req.body
    const data = await knex("info_p").insert(req.body)
    res.send({massage:"successful" , status:req.body})
    }
    catch(errr) {
       res.send({massage:errr})
    }
})

app.get("/login",async(req,res) => {
    try {
        const {email,password} = req.body
        const data = await knex('info_p').where({email,password})
        // console.log(data);
        const token =await createToken(data[0]["id"])
        res.cookie("cookie",token)
        console.log(token);
        res.send({massage:"successful",status:data})
    }
    catch {
        res.send("login fail..")
    
    }
})

app.get("/About",veryfyToken, async (req,res) => {
    try {
        await res.send(`This is about page of ${req.userdata[0].name} `)
    }catch {
        res.send("something went wrong..")
    }
})

app.post("/info",veryfyToken,async(req,res)=> {
    try{
        await res.send(`This post share by ${req.userdata[0].name}`)
    }
    catch{
        res.send("Something went wrong...")
    }
})


app.get("/contact",veryfyToken,async (req,res) => {
    try {
        res.send(`This is the contact page of ${req.userdata[0].name} and contact number is ${req.userdata[0].contact}.`)
    }
    catch{
        res.send("something went wrong...")
    }
})

app.listen(port,()=> {
    console.log("server listing...")
})
// 