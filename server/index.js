const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send({code: 1, msg: 'hello'})
})



app.listen('9999', function () {
  console.log('服务启动起来了')
})