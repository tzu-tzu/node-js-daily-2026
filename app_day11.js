// 任務要求：

// 建立 routes/members.js，包含以下內容：
// In-memory 陣列，預設兩筆資料：{ id: 1, name: '王小明' }、{ id: 2, name: '李小花' }
// findById 與 validateFields 兩個 helper 函式
// 四條路由（前綴由 app.use('/members', ...) 提供）：
// GET /：回傳所有會員，狀態碼 200
// POST /：必填欄位 name，成功回傳 201；欄位缺失回傳 400
// PUT /:id：必填欄位 name，找不到回傳 404，欄位缺失回傳 400
// DELETE /:id：成功回傳 204；找不到回傳 404
// 建立 app.js，掛載 cors()、express.json()，將 members 路由掛載到 /members，監聽 3000 Port。

// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const membersRouter = require('./routes/members');

// 掛載 Middleware 與路由
app.use(cors());
app.use(express.json());
app.use('/members', membersRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`伺服器啟動中：http://localhost:${PORT}`);
});