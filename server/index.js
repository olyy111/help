const express = require('express')
const cookieParse = require('cookie-parser')
const bodyParse = require('body-parser')
const app = express()
const userRouter = require('./user')
const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/help'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('mongodb connect successfully')
})


app.use(cookieParse())
app.use(bodyParse.json())

app.use('/user', userRouter)


app.listen('9999', function () {
  console.log('服务启动起来了')
})