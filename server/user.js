const express = require('express')
const router = express.Router()
const model = require('./models.js')
const User = model.getModel('user')
const utils = require('utility')

router.post('/update', function (req, res) {
  const body = req.body
  const id = req.cookies.userid

  ;(async () => {
    const rs = await User.findByIdAndUpdate(id, body)
    if(rs){
      return res.send({data: rs, code: 0, msg: '信息更新成功'}) 
    }else{
      return res.send({code: 1, msg: '保存失败'})
    }
  })()
})

router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body

  ;(async () => {
    const prevData = await User.findOne({user})
    if(prevData){ 
      return res.send({code: 1, msg: '用户名已经存在'}) 
    }

    const rs = await User.create({user, type, pwd: md5(pwd)})
    if(rs) {
      res.cookie('userid', rs._id) 
      return res.send({code: 0, msg: '新建用户成功', data: createdDate}) 
    }
  })()
} )


router.get('/list', function (req, res) {
  (async () => {
    const list = await User.find({})
    return res.json(list)
  })()
})

router.post('/login', function (req, res) {
  const { user, pwd } = req.body
  ;(async () => {
    const rs = await User.findOne({user, pwd: md5(pwd)})
    if(rs){
      res.cookie('userid', rs._id) 
      return res.send({data: rs, code: 0, msg: '登陆成功'}) 
    }else{
      return res.send({code: 1, msg: '用户名或者密码不正确'})
    }
  })()
})

router.post('/info', function (req, res) {
  res.send({code: 0})
})

const md5 = (str) => {
  const salt = 'help_chat_!&123456'
  return utils.md5(utils.md5(str + salt))
}

module.exports = router