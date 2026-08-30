// 你接手 LiveFit 健身房的後端專案，發現前一位工程師寫的連線與啟動流程有幾個問題。請閱讀下面的程式碼，指出問題並說明該怎麼改。

// 這段 data-source.js 有什麼風險？該怎麼調整？
// 問題：主機、帳號、密碼全部寫死在程式碼裡。這份檔案一旦推上 GitHub，
// 正式環境的資料庫密碼就等於公開外流；而且本機、測試、正式環境的連線資訊不同，
// 寫死代表每換一個環境就得改程式碼、重新部署。
// 調整：把這些值移到 .env（並把 .env 加進 .gitignore），程式改讀 process.env。
// 另外 process.env 讀出來都是字串，port 要用 Number() 轉型：
//
// const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   poolSize: Number(process.env.DB_POOL_SIZE) || 10,
//   synchronize: false,
//   entities: [],
// });

// 實務做法是把它們放在 .env（且 .env 要列進 .gitignore），程式再用 process.env 讀出來：
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=gym
DB_PASSWORD=gympass
DB_DATABASE=livefit
DB_POOL_SIZE=10
PORT=3000

// 這段 server.js 的啟動順序有什麼問題？會造成什麼後果？該怎麼改？
// 問題：app.listen() 寫在 initialize() 之前，等於資料庫還沒連上就先對外開放收請求。
// 後果：服務啟動後的那段空窗期，進來的請求一查資料庫就會爆錯；
// 更糟的是 catch 只印了錯誤訊息，就算資料庫根本連不上，HTTP 服務仍然照常運作，
// 對外表現成「有回應、但功能全壞」，監控也不容易發現。
// 調整：把 listen 移進 initialize() 成功後的 then，失敗則結束程式：
AppDataSource.initialize()
    .then(() => {
        console.log('資料庫連線成功');
        app.listen(3000, () => console.log('Server 啟動於 http://localhost:3000'));
    })
    .catch((err) => {
        console.error('資料庫連線失敗，服務不啟動：', err.message);
        process.exit(1);
    });

// 這個 /healthcheck 跟課程範例中「實際查一次資料庫」的版本差在哪裡？在什麼情況下它會回報錯誤的結果？
// 差別：它只回固定的 200，完全沒有碰資料庫，所以只證明「HTTP 服務本身還活著」，
// 不能證明「服務具備正常提供功能的條件」。
// 會誤判的情況：資料庫掛掉、網路斷線、連線數被佔滿、密碼被改掉時，
// 這支 API 依然回 200，部署平台與監控工具會以為服務一切正常、繼續把流量導進來，
// 但使用者實際打其他 API 全部失敗。
// 改法：在裡面實際下一句最便宜的查詢（SELECT 1），查得動才回 200、查不動回 503。
app.get('/healthcheck', async (req, res) => {
    try {
        await AppDataSource.query('SELECT 1');
        res.status(200).json({ status: 'ok' });
    } catch (err) {
        res.status(503).json({ status: 'error' });
    }
});

// **部署平台、CI 或監控工具需要一個統一的方式確認服務狀態，這類檢查通常統稱為 Health Check；
// **若檢查的是服務目前是否已具備接收流量的條件，則可稱為 Readiness Check。

// 如果把 poolSize 設成 1，跟設成 100，各自可能發生什麼狀況？
// 設 1：整個服務同時只有一條連線可用，所有請求都得排隊輪流使用。
// 只要有一個查詢跑比較久，後面的請求全部被卡住，吞吐量極低、回應時間暴增。
// 設 100：可同時處理的查詢變多，但每條連線在資料庫端都要吃記憶體與資源，
// 而且資料庫本身有連線數上限（postgres 預設 max_connections 通常是 100），
// 多個服務實例各開 100 條就容易超過上限，導致新連線直接被拒絕。
// 實務上要依資料庫規格與服務實例數量取一個中間值，不是越大越好。