// 建立 .env 檔案：
// 設定 MAX_FILE_SIZE_MB 為 10
// 設定 UPLOAD_DIR 為 ./local_uploads
// 設定 GYM_NAME 為 六角無限健身房

// 建立 app.js (主程式)：
// 正確引入並啟動 dotenv 套件。
// 宣告並建立 getUploadConfig() 函式，使其回傳一個物件，物件內包含：
// uploadDir：讀取環境變數 UPLOAD_DIR，若不存在則預設值為 '/tmp'。
// maxFileSize：讀取環境變數 MAX_FILE_SIZE_MB，若不存在則預設值為 5。
// gymName：讀取環境變數 GYM_NAME，若不存在則預設值為 '未命名健身房'。
// 在主程式最後呼叫 getUploadConfig() 並用 console.log 印出完整回傳物件測試。


const dotenv = require('dotenv');
dotenv.config();

function getUploadConfig(){
    let envMaxFileSize = Number(process.env.MAX_FILE_SIZE_MB) || 5;

    return {
        uploadDir: process.env.UPLOAD_DIR || '/tmp',
        maxFileSize: envMaxFileSize,
        gymName: process.env.GYM_NAME || '未命名健身房'
    };
}

let uploadConfig = getUploadConfig();
console.log(uploadConfig);