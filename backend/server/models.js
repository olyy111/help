const mongoose = require('mongoose')
const models = {
  user: {
    user: {type: String, require: true},
    pwd: {type: String, require: true},
    // genius 或者 boss
    type: {type: String, require: true},
    //头像
		'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String}
  },
  chat: {
    'chatId': {'type': String, required: true},
    'from': {'type': String, require: true},
    'to': {'type': String, require: true},
    'content': {type: String, require: true, default: ''},
    'createTime': {'type': Number, default: +new Date()},
    'read': {'type': Boolean, default: false}
  }
}

for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name){
    return mongoose.model(name)
  }
}