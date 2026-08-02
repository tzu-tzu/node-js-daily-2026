// notes.js --day16
const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/auth');

let notes = [
    { id: 1, userId: 1, title: '筆記 1', content: '這是筆記 1 的內容' },
    { id: 2, userId: 1, title: '筆記 2', content: '這是筆記 2 的內容' },
];

router.get('/', authMiddleware, (req, res) => {
    // 取得當前使用者的筆記列表
    const userId = req.user.userId;
    const userNoteArr = notes.filter(note => note.userId === userId);
    res.status(200).json({ status: 'success', data: userNoteArr, msg: '取得筆記列表成功' });
});

module.exports = router;