require("dotenv").config()
var express = require('express');
var app = express()
const uuid = require("uuid");
const fs = require("fs");
var cors = require('cors');
const upload = require("express-fileupload")
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(upload())
// const axios = require('axios');
app.use(express.static('public'));
const jwt = require('jsonwebtoken');
// const { cos } = require("mathjs");
const TOKEN = '69c65fbc9aeea59efdd9d8e04133485a09ffd78a70aff5700ed1a4b3db52d33392d67f12c1'
function autificationToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, TOKEN, (err, user) => {
        if (err) res.sendStatus(403)
    })
    next()
}





app.get('/users', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    res.status(200).send(User)
})
app.post('/users', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var data = {
        "id": uuid.v1(),
        "email": req.body.email,
        "ism": req.body.ism,
        "phone": req.body.phone,
        "facebook": req.body.facebook,
        "appleId": req.body.appleId,
        "google":req.body.google,
        "katalog":[],
        "oldmessage":[]
    }
    User.unshift(data)
    fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
    res.status(201).send("Yaratildi")

})
app.get("/users/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            res.status(200).send(User[i])
        }
    }

    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.delete('/users/:id', (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var kluch = true
    User.map((item, key) => {
        if (item.id === req.params.id) {
            User.splice(key, 1)
            fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(200).send("Ok")
            kluch = false
        }
    })
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})
app.put("/users/:id", (req, res) => {
    const User = JSON.parse(fs.readFileSync('./Users.json', "utf-8"))
    var kluch = true
    for (let i = 0; i < User.length; i++) {
        if (User[i].id === req.params.id) {
            User[i].email = req.body.email ? req.body.email : User[i].email
            User[i].password = req.body.password ? req.body.password : User[i].password
            User[i].sarlavha = req.body.sarlavha ? req.body.sarlavha : User[i].sarlavha
            User[i].jinsi = req.body.jinsi ? req.body.jinsi : User[i].jinsi
            User[i].ism = req.body.ism ? req.body.ism : User[i].ism
            User[i].fam = req.body.fam ? req.body.fam : User[i].fam
            User[i].yangiliklar = req.body.yangiliklar ? req.body.yangiliklar : User[i].yangiliklar
            User[i].maxfilik = req.body.maxfilik ? req.body.maxfilik : User[i].maxfilik
            fs.writeFileSync("./Users.json", JSON.stringify(User, 0, 2), "utf-8")
            res.status(201).send("Yaratildi")
            kluch = false
        }

    }
    if (kluch) {
        res.status(403).send("ID topilmadi")
    }
})












app.listen(PORT, function () {
    console.log(`Listening to Port ${PORT}`);
});