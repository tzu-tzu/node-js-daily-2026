// 任務要求：

// 建立 routes/members.js，使用 express.Router() 設計以下兩條路由：
// GET /：回傳狀態碼 200 與 { "status": "success", "message": "所有會員列表" }
// GET /:id：從路徑取出 id，回傳狀態碼 200 與 { "status": "success", "memberId": "取出的 id 值" }
// 最後使用 module.exports 將 router 匯出。
// 建立 app.js，安裝並引入 express、cors，依正確順序掛載 Middleware，並將 routes/members.js 掛載到 /members 前綴，監聽 3000 Port。
// 確認以下實際對應 URL 皆能正常回應：
// GET /members → 回傳所有會員列表
// GET /members/5 → 回傳 memberId: "5"

// app.js
const express = require('express');
const cors = require('cors');
const app = express();

// === 請依正確順序掛載 Middleware ===
const membersRouter = require('./routes/members');
const userRouter = require('./routes/user');
app.use(cors());
app.use(express.json());
// ==================================

// === 掛載 members 路由（引入並指定前綴）===
app.use('/members', membersRouter);
app.use('/user', userRouter);
// ==========================================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`伺服器啟動中：http://localhost:${PORT}`);
});
