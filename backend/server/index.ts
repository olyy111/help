const cookieParse = require('cookie-parser')
// import cookieParse from 'cookie-parser'
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./user')
import {User} from './models'
import {Chat} from './models'
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', socket => { 
  console.log('user login')
  socket.on('sendMsg', data => {
    const {from, to, content} = data
    const chatId = [from, to].sort().join('-')
    Chat.create({chatId, from, to, content})
      .then(doc => {
        console.log(doc)
        const {content, createTime, read, chatId, from, to, _id} = doc
        io.emit('receiveMsg', {content, createTime, read, chatId, from, to, id: _id})
      })
  })
});



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
})
app.use(bodyParse.json())

app.use('/user', userRouter)

server.listen('9999', function () {
  console.log('node服务起在9999端口')
})

