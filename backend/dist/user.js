"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const utils = require('utility');
const models_1 = require("./models");
const models_2 = require("./models");
router.post('/update', function (req, res) {
    const body = req.body;
    const id = req.cookies.userid;
    (() => __awaiter(this, void 0, void 0, function* () {
        const rs = yield models_1.User.findByIdAndUpdate(id, body);
        if (rs) {
            const data = Object.assign({}, rs, body);
            return res.send({ data, code: 0, msg: '信息更新成功' });
        }
        else {
            return res.send({ code: 1, msg: '保存失败' });
        }
    }))();
});
router.post('/register', function (req, res) {
    const { user, pwd, type } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const prevData = yield models_1.User.findOne({ user });
        if (prevData) {
            return res.send({ code: 1, msg: '用户名已经存在' });
        }
        const rs = yield models_1.User.create({ user, type, pwd: md5(pwd) });
        if (rs) {
            res.cookie('userid', rs._id);
            return res.send({ code: 0, msg: '新建用户成功', data: rs });
        }
    }))();
});
// User.remove({}, function (err, data) {
//   console.log(data)
// })
router.get('/list', function (req, res) {
    const type = req.query.type;
    if (!type) {
        return res.json({ code: 1, msg: 'type字段必须要传参' });
    }
    ;
    (() => __awaiter(this, void 0, void 0, function* () {
        const list = yield models_1.User.find({ type });
        return res.json({ code: 0, data: list, msg: '获取列表成功' });
    }))();
});
router.get('/chatMsgList', function (req, res) {
    const { userid } = req.cookies;
    (() => __awaiter(this, void 0, void 0, function* () {
        const usersRs = yield models_1.User.find({});
        const users = {};
        usersRs.forEach(user => {
            users[user._id] = { name: user.user, avatar: user.avatar };
        });
        const msgList = yield models_2.Chat.find({ '$or': [{ to: userid }, { from: userid }] });
        return res.json({ data: { msgList, users }, code: 0 });
    }))();
});
router.post('/login', function (req, res) {
    const { user, pwd } = req.body;
    (() => __awaiter(this, void 0, void 0, function* () {
        const rs = yield models_1.User.findOne({ user, pwd: md5(pwd) });
        if (rs) {
            res.cookie('userid', String(rs._id)); // 注意此处id的类型
            return res.send({ data: rs, code: 0, msg: '登陆成功' });
        }
        else {
            return res.send({ code: 1, msg: '用户名或者密码不正确' });
        }
    }))();
});
router.get('/info', function (req, res) {
    const { userid } = req.cookies;
    setTimeout(function () {
        // 
        if (!userid) {
            return res.json({ code: 3 });
        }
        ;
        (() => __awaiter(this, void 0, void 0, function* () {
            const doc = yield models_1.User.findOne({ _id: userid });
            if (!doc) {
                return res.json({ code: 3, msg: '请求异常' });
            }
            return res.json({ code: 0, data: doc });
        }))();
    }, 1000);
});
const md5 = (str) => {
    const salt = 'help_chat_!&123456';
    return utils.md5(utils.md5(str + salt));
};
module.exports = router;
//# sourceMappingURL=user.js.map