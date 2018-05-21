const express = require('express')
const router = express.Router()
const model = require('./models.js')
const User = model.getModel('user')
const utils = require('utility')

router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body;

  (async () => {
    const prevData = await User.findOne({user})
    if(prevData){ return res.send({code: 1, msg: '用户名已经存在'}) }
    const createdDate = await User.create({user, type, pwd: md5(pwd)})
    if(createdDate) { return res.send({code: 1, msg: '新建用户成功', data: createdDate}) }
  })()
} )

router.get('/list', function (req, res) {
  console.log(3333)
  (async () => {
    const list = await User.find({})
    return res.json(list)
  })()
})

router.post('/login', function (req, res) {
  res.cookie('isLogin', 1, {
    httpOnly: false
  })
  res.send({msg: 'haha'})
})

router.post('/info', function (req, res) {
  res.send({code: 0})
})
console.log(utils.md5)
const md5 = (str) => {
  const salt = 'help_chat_!&123456'
  return utils.md5(utils.md5(str + salt))
}

module.exports = router