const express = require('express')
const router = express.Router()
const utils = require('utility')
import {User} from './models'
import {Chat} from './models'

router.post('/update', function (req, res) {
  const body = req.body
  const id = req.cookies.userid

  ;(async () => {
    const rs = await User.findByIdAndUpdate(id, body)
    if(rs){
      const data = Object.assign({}, rs, body)
      return res.send({data, code: 0, msg: '信息更新成功'}) 
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
      return res.send({code: 0, msg: '新建用户成功', data: rs}) 
    }
  })()
} )

// User.remove({}, function (err, data) {
//   console.log(data)
// })

router.get('/list', function (req, res) {
  const type = req.query.type

  if(!type){
    return res.json({code: 1, msg: 'type字段必须要传参'})
  }

  ;(async () => {
    const list = await User.find({ type })
    return res.json({code: 0, data: list, msg: '获取列表成功'})
  })()
})

router.get('/chatMsgList', function (req, res) {
  const { userid } = req.cookies
  ;(async() => {
    const usersRs = await User.find({})
    const users = {}
    usersRs.forEach(user => {
      users[user._id] = {name: user.user, avatar: user.avatar}
    })
    const msgList = await Chat.find({'$or': [{to: userid}, {from: userid}]})
    return res.json({data: {msgList, users}, code: 0})
  })()
})

router.post('/login', function (req, res) {
  const { user, pwd } = req.body
  ;(async () => {
    const rs = await User.findOne({user, pwd: md5(pwd)})
    if(rs){
      res.cookie('userid', String(rs._id)) // 注意此处id的类型
      return res.send({data: rs, code: 0, msg: '登陆成功'}) 
    }else{
      return res.send({code: 1, msg: '用户名或者密码不正确'})
    }
  })()
})

router.get('/info', function (req, res) {
  const { userid } = req.cookies
  setTimeout(function (){

    // 
    if(!userid){
      return res.json({code: 3})
    } 
  
    ;(async () => {
      const doc = await User.findOne({_id: userid})
      if(!doc){
        return res.json({code: 3, msg: '请求异常'})
      }
      
      return res.json({code: 0, data: doc})
    })()
  },1000)
})

const md5 = (str) => {
  const salt = 'help_chat_!&123456'
  return utils.md5(utils.md5(str + salt))
}

module.exports = router