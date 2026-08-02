// 任務要求：

// 安裝並引入 express 與 cors 套件。
// 依照正確順序掛載以下兩個 Middleware：
// cors()：解決跨域問題
// express.json()：解析請求內容，確保 req.body 能正確取得資料
// 建立 GET / 路由，回傳狀態碼 200 與：{ "status": "success", "message": "API 運作中" }
// 建立 POST /members 路由，從 req.body 取出 name 欄位，回傳狀態碼 201 與：{ "status": "success", "data": { "name": "取出的 name 值" } }
// 監聽 3000 Port。

// app.js
const express = require('express');
const cors = require('cors');
const app = express();

// === 請依正確順序掛載 Middleware ===
app.use(cors());
app.use(express.json());
// ==================================

// GET /
app.get('/', (req, res) => {
	// === 請在此處撰寫你的程式碼 ===
	res.status(200).json({ status: 'success', message: 'API 運作中' });
	// ============================
});

// POST /members
app.post('/members', (req, res) => {
	// === 請在此處撰寫你的程式碼 ===
	console.log(req.body);
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ status: 'error', message: '缺少 name 欄位' });
	}
	res.status(201).json({ status: 'success', data: { name } });
	// ============================
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`伺服器啟動中：http://localhost:${PORT}`);
});
