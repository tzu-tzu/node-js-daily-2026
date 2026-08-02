// 任務要求：

// 建立 .env，設定變數 JWT_SECRET 為任意字串（例如：my-gym-secret）。
// 安裝並引入 jsonwebtoken 與 dotenv。
// 建立 generateToken(user) 函式：
// 從參數 user 物件中取出 id 與 email。
// 使用 jwt.sign 將 { userId, email } 簽發成 Token，secret 從 process.env.JWT_SECRET 讀取，過期時間設為 '7d'。
// 回傳簽發好的 Token。
// 在主程式呼叫 generateToken({ id: 1, email: 'member@gym.com' }) 並印出 Token。
// 初始程式碼

// app.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

function generateToken(user) {
    // === 請在此處撰寫你的程式碼 ===
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
    // ============================
}

// 測試執行
const token = generateToken({ id: 1, email: 'member@gym.com' });
console.log('簽發的 Token：', token);
