// LiveFit 健身房要新增幾支後台 API，資料表就是上面的 users、courses、bookings。請用 TypeORM Repository 寫出對應的程式碼（假設 AppDataSource 已經連線完成）。

// 查詢 email 為 ming@gym.com 的會員，只要取回 id、name、credits 三個欄位。
const userRepo = AppDataSource.getRepository('User');
const user = await userRepo.findOne({
    where: { email: 'ming@gym.com' },
    select: { id: true, name: true, credits: true },
});
// => { id: 1, name: '小明', credits: 120 }
// 注意 select 要用物件語法，新版 TypeORM 已移除 ['id', 'name'] 這種字串陣列寫法。


// 查詢會員 id 為 1、尚未取消（cancelled_at 為 NULL）的所有預約，並把每筆預約對應的課程資料一起帶出來，依 created_at 由新到舊排序。
const { IsNull } = require('typeorm');
const bookingRepo = AppDataSource.getRepository('Booking');
const activeBookings = await bookingRepo.find({
    where: { user: { id: 1 }, cancelled_at: IsNull() },
    relations: { course: true },
    order: { created_at: 'DESC' },
});

// 建立一位 name 為 小華、email 為 hua@gym.com、credits 為 0 的會員並寫入資料庫，接著把會員 id 為 1 的 credits 改成 999。並回答：如果只呼叫 create 沒有呼叫 save，資料庫會有這筆資料嗎？
const newUser = userRepo.create({ name: '小華', email: 'hua@gym.com', credits: 0 });
await userRepo.save(newUser);

const result = await userRepo.update({ id: 1 }, { credits: 999 });
// 如果只呼叫 create 沒有呼叫 save，資料庫不會有這筆資料。create 只是建立一個實體物件，
// 並不會自動寫入資料庫，必須呼叫 save 才會把它存進資料庫。

// 閱讀下面這段統計程式碼，用註解回答兩件事：它查出來的是什麼？以及為什麼 userId 要用 :userId 傳值，而不是直接把變數接進字串裡？

const stats = await bookingRepo
    .createQueryBuilder('b')
    .select('b.course_id', 'courseId')
    .addSelect('COUNT(*)', 'total')
    .where('b.cancelled_at IS NULL')
    .andWhere('b.user_id = :userId', { userId })
    .groupBy('b.course_id')
    .getRawMany();

// 查出來的是會員 userId 的所有有效預約（cancelled_at 為 NULL），依課程 course_id 分組後的統計數量。
// userId 要用 :userId 傳值，而不是直接把變數接進字串裡，是為了避免 SQL Injection 攻擊，TypeORM 會自動幫我們把傳入的值做轉義處理，確保安全性。