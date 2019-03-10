const cookieParse = require('cookie-parser')
const bodyParse = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./user')
const { getModel } = require('./models')
const User = getModel('user')
const Chat = getModel('chat')

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', socket => { 
  console.log('user login')
  socket.on('sendMsg', data => {
    const {from, to, content} = data
    const chatId = [from, to].join('-')
    Chat.create({chatId, from, to, content})
      .then(doc => {
        console.log(doc)
        io.emit('receiveMsg', doc)
      })
      .catch(err => {
        res.json({code: 3, msg: '发送失败'})
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

server.listen('9999', function () {
  console.log('node服务起在9999端口')
})

