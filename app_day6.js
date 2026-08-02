// 任務要求：

// 使用 http.createServer 建立伺服器，監聽 3000 Port。
// 請在 app.js 中設計出以下 3 種路由情境判斷：
// 情境一：當收到 GET 請求且路徑為 / 時，回傳狀態碼 200，網頁內容印出純文字：「歡迎來到健身房系統」。
// 情境二：當收到 GET 請求且路徑為 /api/v1/packages 時，回傳狀態碼 200，並以 JSON 格式 回傳以下軟體包資料（物件內容請參考初始碼）：
// { "status": "success", "data": "方案列表" }
// 情境三：當使用者輸入上述以外的任何路徑時（例如：/hello），回傳狀態碼 404，印出純文字：「路由不存在」。

// app.js
const http = require('http');

const server = http.createServer((req, res) => {
    // === 請在此處撰寫你的路由判斷程式碼 ===
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('歡迎來到健身房系統');
        return;
    }

    if (req.method === 'GET' && req.url === '/api/v1/packages') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const responseData = {
            status: 'success',
            data: '方案列表'
        };
        res.end(JSON.stringify(responseData));
        return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('路由不存在');

    // ==================================
});

// 監聽 3000 port
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
