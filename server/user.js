const express = require('express')
const router = express.Router()

router.post('/register', function (req, res) {
  res.send({code: 1, msg: '注册成功'})
} )

router.post('/login', function (req, res) {
  res.cookie('isLogin', 1, {
    httpOnly: false
  })
  res.send({msg: 'haha'})
})

router.post('/info', function (req, res) {
  res.send({code: 0})
})

module.exports = router