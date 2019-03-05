const express = require('express')
const cookieParse = require('cookie-parser')
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./user')
const { getModel } = require('./models')
const User = getModel('user')

const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);


const DB_URL = 'mongodb://localhost:27017/help'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function () {
  console.log('mongodb connect successfully')
})


app.use(cookieParse())
app.use(function (req, res, next) {
  const userid = req.cookies.userid
  if(!userid){
    return next()
  }
  User.findOne({_id: userid}, function (err, doc) {
    if(err){
      return res.json({code: 3})
    }else{
      return next()
    }
  })
  // const doc = await User.findOne({_id: userid})
  // console.log(doc, ++a)
  // if(doc){
  //   return next()
  // }else{
  //   return res.json({code: 3})
  // }
  ;(async () => {
  })()
  
})
app.use(bodyParse.json())

app.use('/user', userRouter)

io.on('connection', function (socket) {
  console.log('hello, welcome to socket.io')
})

server.listen('9999', function () {
  console.log('服务启动起来了')
})