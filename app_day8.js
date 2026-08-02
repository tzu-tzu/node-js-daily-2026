// 任務要求：

// 安裝並引入 express，建立應用程式實例，監聽 3000 Port。
// 設計以下 2 條路由：
// 路由一：GET /coaches/:id，從路徑中取出教練 ID，回傳狀態碼 200 與：{ "status": "success", "coachId": "取出的 id 值" }
// 路由二：GET /courses，從查詢字串取出 type 與 limit 兩個參數，回傳狀態碼 200 與：{ "status": "success", "filter": { "type": "取出的 type 值", "limit": "取出的 limit 值" } }

// app.js
const express = require('express');
const app = express();

// 路由一：取得單一教練資料
app.get('/coaches/:id', (req, res) => {
	// === 請在此處撰寫你的程式碼 ===	
	const coachId = req.params.id;
	if (!coachId) {
		return res.status(400).json({ status: 'error', message: '缺少教練 ID' });
	}
	res.status(200).json({ status: 'success', coachId });
	// ============================
});

// 路由二：篩選課程列表
app.get('/courses', (req, res) => {
	// === 請在此處撰寫你的程式碼 ===
	const { type, limit } = req.query;
	if (!type || !limit) {
		return res.status(400).json({ status: 'error', message: '缺少必要參數' });
	}
	res.status(200).json({ status: 'success', filter: { type, limit } });
	// ============================
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`伺服器啟動中：http://localhost:${PORT}`);
});
