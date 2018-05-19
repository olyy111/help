const express = require('express')
const app = express()
const userRouter = require('./user')

app.use('/user', userRouter)


app.get('/test', function (req, res) {
  console.log('收到请求了')
  res.send({code: 1, msg: 'hello'})
})





app.listen('9999', function () {
  console.log('服务启动起来了')
})