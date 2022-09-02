
const jwt = require("jsonwebtoken")
const knex = require("../connection/db.js")

const createToken = (id) => {
    return jwt.sign({id},"mynameisakash")
}

const veryfyToken = async (req,res,next) => {
    if (req.headers.cookie) {
        const token = (req.headers.cookie).split("=")[1]
        const tr= jwt.verify(token,"mynameisakash")
        // console.log(tr)
        const data = await knex("info_p").where({id:tr["id"]})
        
        req.userdata = data
        console.log(req.userdata);
        next()
    }
    else {
        res.send("your token expired..")
    }
}

module.exports = {createToken,veryfyToken}