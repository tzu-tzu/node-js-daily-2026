// routes/members.js  --day10
const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
    // === 請在此處撰寫你的程式碼 ===
    res.status(200).json({ status: 'success', message: '所有會員列表' });
    // ============================
});

// GET /:id
router.get('/:id', (req, res) => {
    // === 請在此處撰寫你的程式碼 ===
    const memberId = req.params.id;
    res.status(200).json({ status: 'success', memberId });
    // ============================
});

// 匯出 router
// === 請在此處撰寫你的程式碼 ===
module.exports = router;
// ============================
