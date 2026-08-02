// auth.js --day16
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

let users = []; // 假 DB（in-memory），重開 server 就清空

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. 驗證必填欄位
        if (!email || !password) {
            return res.status(400).json({ status: 'error', msg: '缺少欄位' });
        }
        // 2. 查重複 email
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ status: 'error', msg: 'Email 已被註冊' });
        }
        // 3. bcrypt hash
        const hashedPwd = await bcrypt.hash(password, 10);
        // 4. 存入陣列
        users.push({ email, password: hashedPwd });
        // 5. 回傳 201
        res.status(201).json({ status: 'success', msg: '註冊成功' });
    } catch (err) {
        next(err); // 將錯誤傳給錯誤處理 middleware
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // 1. 找使用者 → bcrypt.compare
        const user = users.find(user => user.email === email);
        const comparePwd = await bcrypt.compare(password, user.password);
        if (!user || !comparePwd) {
            return res.status(400).json({ status: 'error', msg: '帳號或密碼錯誤' });
        }
        //2. jwt.sign → 回傳 token
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({ status: 'success', data: { token } });
    } catch (err) {
        next(err); // 將錯誤傳給錯誤處理 middleware
    }
});

module.exports = router;