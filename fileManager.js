// fileManager.js (自訂模組檔案)：

// 引入內建的 fs/promises 模組。
// 建立 saveData(fileName, content)：非同步寫入檔案，若成功則印出成功訊息。
// 建立 loadData(fileName)：非同步讀取檔案，需指定 utf-8 編碼，並回傳檔案文字內容。
// 使用 module.exports 將這兩個函式打包匯出。

const fs = require('fs/promises');

async function saveData(fileName, content) {
	try {
		// 2. 寫入檔案：加上 await，檔案寫完才會執行下一行
		await fs.writeFile('./promises-test.txt', '這是新版 fs/promises 寫入的文字');
		console.log('檔案寫入成功囉！');

	} catch (err) {
		// 4. 如果檔案不存在或寫入錯誤，會進入這裡，避免伺服器崩潰
		console.error('發生錯誤：', err.message);
	}
}

async function loadData(fileName) {
	try {
		// 3. 讀取檔案：同樣加上 await 與 'utf-8' 編碼
		const data = await fs.readFile('./promises-test.txt', 'utf-8');
		console.log('讀取到的內容：', data);
		return data;

	} catch (err) {
		// 4. 如果檔案不存在或寫入錯誤，會進入這裡，避免伺服器崩潰
		console.error('發生錯誤：', err.message);
		return null;
	}
}

module.exports = {
	saveData,
	loadData
};