// 任務要求：

// 安裝並引入 bcrypt。
// 建立 hashPassword(password) 函式：
// 使用 bcrypt.genSalt(10) 產生 Salt。
// 使用 bcrypt.hash 對密碼進行雜湊，並回傳雜湊後的結果。
// 建立 verifyPassword(password, hash) 函式：
// 使用 bcrypt.compare 比對密碼與雜湊值，並回傳比對結果（true / false）。
// 在主程式依序執行：
// 呼叫 hashPassword('hello123') 並印出雜湊結果。
// 用正確密碼 'hello123' 呼叫 verifyPassword，印出比對結果。
// 用錯誤密碼 'wrongPass' 呼叫 verifyPassword，印出比對結果。

// app.js
const bcrypt = require('bcrypt');

async function hashPassword(password) {
    // === 請在此處撰寫你的程式碼 ===
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash;
    // ============================
}

async function verifyPassword(password, hash) {
    // === 請在此處撰寫你的程式碼 ===
    const isPass = await bcrypt.compare(password, hash);
    return isPass;
    // ============================
}

async function main() {
    const hashed = await hashPassword('hello123');
    console.log('雜湊結果：', hashed);

    const correct = await verifyPassword('hello123', hashed);
    console.log('正確密碼比對：', correct);

    const wrong = await verifyPassword('wrongPass', hashed);
    console.log('錯誤密碼比對：', wrong);
}

main();
