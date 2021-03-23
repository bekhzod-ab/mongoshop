require("dotenv").config();
const jwt = require("jsonwebtoken")
const express = require("express");
const cors = require("cors")
const {PrintAll} = require("./ProductsModules.js")
const {login, addUser} = require("./UsersModule.js")
const app = express();
const port = process.env.PORT




app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())


const CheckCredentials= (req,res,next) => {
    if(!req.body.userName && !req.body.passName) {
        return res.status(400).send("Please fill in required field")
    }
    next()
}




app.get("/products", async (req,res)=>{
    const products = await PrintAll()
    res.json(products)
}) 




app.post("/login", CheckCredentials, async(req,res) => {
    const exparationTime = req.body.Timer
    if (await login(req.body.userName, req.body.passName)) {
        const jwToken = jwt.sign(req.body.userName, process.env.SECRET)
        res.cookie("cookieToken", jwToken, {httpOnly: true, maxAge: exparationTime })
        res.status(200).send()
    }else {
        res.status(400).send("back off")
    }

    } 
 )

app.post("/register", async (req,res) => {
    await addUser(req.body.bodyname, req.body.bodyemail, req.body.bodypass)
    res.send(200).send("New user has been added")
}) 






app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
