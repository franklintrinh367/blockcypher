const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const router = require('./backend/router')
const mongoose = require('mongoose')
const dbUrl = "mongodb://admin:admin123@ds159025.mlab.com:59025/chatroom";

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', router)

mongoose.connect(dbUrl, { useNewUrlParser: true }, () => {
    console.log("Sucessfully Connected to database")
})
app.listen(port, () => {
    console.log(`Listenting to port : ${port}`)
})