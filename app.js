const mongoose = require('mongoose');

const express = require('express');

require('dotenv/config')

const User = require("./model/user")

const app = express();

app.use(express.json())

const port = 3000

const customMiddleware = (req,res,next) => {
    next()
}

app.use(customMiddleware)

app.get("/users", (req,res) => {
    let users = [
        "Ben", "Alice", "Juninho"
    ]

    res.send({
        users: users
    })
})

app.post("/create_user", async (req,res) => {
    
    try{
        const myUser = new User(req.body);

        await myUser.save() 
        res.send(myUser)
    } catch(err) {
        res.send({ message: err });
    }
})

mongoose.connect(process.env.DB_CONNECTION_STRING,
{ useNewUrlParser: true, useUnifiedTopology: true },
(req, res) => {
    console.log("connected to the database")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})