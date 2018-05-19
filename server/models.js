import { model } from 'mongoose';

const mongoose = require('mongoose')
const models = {
  user: {
    name: {type: String, require: true},
    pwd: {type: String, require: true},
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
  }
}

for(let m in models){
  mongoose.models(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function (name){
    return mongoose.models(name)
  }
}