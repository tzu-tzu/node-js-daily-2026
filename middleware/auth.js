// middleware/auth.js -day14, day16
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    // === 請在此處撰寫你的程式碼 ===
    // 1. 從 req.headers.authorization 取出 Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ status: 'error', msg: '缺少或格式不正確的 Token' });
    }

    const token = authHeader.split(' ')[1];

    // 2. 使用 jwt.verify 驗證 Token
    try {
        const decoded = jwt.verify(token, SECRET);
        // 3. 驗證成功，將 decoded 資料掛到 req.user
        req.user = decoded;
        next(); // * 記得加上 next()，否則請求會卡住
    }catch (err) {
        return res.status(401).json({ status: 'error', msg: 'Token 驗證失敗' });
    }
    // ============================
}

module.exports = authMiddleware;
