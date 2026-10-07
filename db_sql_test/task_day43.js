// 你接手一個已經上線的專案。前端同事抱怨每支 API 回來的格式都不一樣，串接時要寫好幾套判斷；昨天有支 API 掛掉的時候，瀏覽器上還直接印出了資料庫的連線錯誤。請依序回答下面的問題。

// 1. 統一回應格式
// 請列出這兩支 API 至少三個格式不一致的地方，並用 { status, data } 與 { status, message } 的約定改寫它們。

app.get('/users/:id', (req, res) => {
    const user = users.find((u) => u.id === Number(req.params.id));
    if (!user) {
        // res.status(404).send('user not found');
        res.status(404).json({ status:"false", message:"user not found" });
        return;
    }
    res.json(user);
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        // return res.status(400).json({ error: '欄位不完整' });
        return res.status(400).json({ status:"false", message:"欄位不完整" });
    }
    const user = { id: users.length + 1, name, email };
    users.push(user);
    // res.status(201).json({ result: 'ok', user });
    res.status(201).json({ status:"true", data:user });
});

// 2. 錯誤處理 middleware 沒生效
// 這段有兩個地方會讓錯誤處理 middleware 完全不會被呼叫，請各自指出並說明原因，並說明它沒生效時會有什麼資安風險。
const express = require('express');
const usersRouter = require('./routes/users');
const app = express();

app.use(express.json());
app.use('/api/users', usersRouter); //<<

//<<
app.use((req, res) => {
    res.status(404).json({ status: 'failed', message: '找不到這個路由' });
});

//<<
app.use((err, req, res, next) => {
    console.error('[error]', req.method, req.originalUrl, err.message);

    if (err.isOperational) {
        return res.status(err.statusCode).json({
        status: 'failed',
        message: err.message
        });
    }

    res.status(500).json({
        status: 'failed',
        message: '伺服器發生錯誤，請稍後再試'
    });
});

module.exports = app;


// 3. 這些狀況該怎麼回
// 以下三個情境，請分別回答狀態碼、這個錯誤該在哪一層產生（驗證 middleware、Controller，或 catch 之後），以及對外訊息要寫什麼：
// a. 使用者沒帶 Token 就打 GET /api/users/me
// 狀態碼: 401 //沒帶 Token 或 Token 過期	401 Unauthorized	請重新登入
// b. 學員 A 想修改學員 B 的訂單
// 狀態碼: 403 //有登入但沒有這個權限	403 Forbidden	沒有權限執行此操作
// c. 寫入資料庫時噴出 column "amount" does not exist
// 狀態碼: 500 //程式或資料庫爆掉	500 Internal Server Error	通用錯誤訊息