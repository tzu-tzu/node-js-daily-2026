// 任務要求：

// 建立 .env 檔案：
// 設定變數 PORT 為 4000。
// 建立 app.js (主程式)：
// 引入 dotenv 與內建的 http 模組。
// 宣告 serverPort 變數去讀取環境變數的 PORT，若環境變數不存在，則預設值為 3000。
// 使用 http.createServer 建立伺服器：
// 回傳狀態碼設定為 200。
// Header 的 Content-Type 請設定為網頁格式並支援中文（text/html; charset=utf-8）。
// 網頁內容請輸出：「<h2>歡迎來到我的第一個 Node.js 網站！</h2>」。
// 讓伺服器成功監聽讀取到的 Port 號，並在終端機印出啟動提示。

const dotenv = require('dotenv');
dotenv.config();
const http = require('http');

// 1. 建立伺服器，傳入一個 Callback 函式處理每一次的連線
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h2>歡迎來到我的第一個 Node.js 網站！</h2>');
  res.end();
});

// 2. 讓伺服器監聽 3000 Port
const PORT = process.env.LOCALHOST_PORT || 3000;
server.listen(PORT, () => {
  console.log(`[系統] 伺服器已啟動！請打開瀏覽器輸入：http://localhost:${PORT}`);
});