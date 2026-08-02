// app.js (主程式檔案)：

// 使用 require() 正確引入 ./fileManager.js 模組。
// 依序呼叫函式：先寫入一個名為 user.txt 的檔案，內容為 "Hello Node.js!"；寫入成功後，再讀取該檔案並將內容 console.log 印出來。

const fileManager = require('./fileManager.js');

async function main() {
    await fileManager.saveData('user.txt', 'Hello Node.js!');
    let fileContent = await fileManager.loadData('user.txt');

    console.log('檔案內容：', fileContent);
}

main();