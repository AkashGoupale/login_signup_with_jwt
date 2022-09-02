

const validator = require("validator")

const validate = (req,res,next) => {
    const {name,contact,status,email,password} = req.body
    if (!(name && contact  && status && email && password)) {
        return res.send("Please return fully information..")
    }
    if (!((contact.length==10) && validator.isMobilePhone(contact))) {
        return res.send("your mobile number is wrong..")
    }
    if (!validator.isEmail(email)) {
        return res.send({massage:"Please enter valid email.."})
    }
    if (!validator.isStrongPassword(password,{minLength:8,minLowercase:1,minUppercase:1,minNumbers:1,minSymbols:1})) {
        return res.send({massage:"Your password is not strong."})
    }
    next()

}

module.exports = validate

