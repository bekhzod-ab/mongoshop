require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");




const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
});

const Users = mongoose.connection.model("users", userSchema)

async function login(bodyName,bodyPass) {
    const user = await Users.findOne({name : bodyName})
    if (bcrypt.compareSync(bodyPass.toString(), user.password)) {
        return true
    }else {
        console.log("back off")
        return false
    }
}




async function addUser(bodyname,bodyemail,bodypass) {
   return new Promise((resolve,reject) => { 
        const newUser = new Users({
            name: bodyname, 
            email: bodyemail,
            password: bcrypt.hashSync(bodypass,12) 
        })
        newUser.save()
        .then((result) => resolve(result))
        .catch((error) => reject(error))
    })
}


module.exports = {login, addUser}