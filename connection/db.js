
const knex = require("knex") ({
    client:"mysql",
    connection:{
        host :"localhost",
        user:"root",
        database:"info_person",
        password:"Akash@123"
    }
})

knex.schema.hasTable("info_p").then((exist) => {
    if (!exist) {
        return knex.schema.createTable("info_p",table => {
            table.increments("id").primary()
            table.string("name")
            table.string("contact").unique()
            table.string("status")
            table.string("email").unique()
            table.string("password")
    }).then(()=> {
        console.log("your table create successful")
    }).catch (()=> {
        console.log("During creating a table something went wrong..")
    })
   }
})


module.exports = knex
