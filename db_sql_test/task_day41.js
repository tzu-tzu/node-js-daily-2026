// LiveFit 健身房原本的後端是直接 DELETE 刪資料，客服反映「查不到會員取消過什麼」、行銷也算不出取消率。團隊決定改成保留紀錄的做法，請完成以下調整。

// 會員要取消 id 為 3 的預約（這筆目前尚未取消）。請寫出正確的做法（提示：不是刪除），並用一句註解說明為什麼不用 delete。
const bookingRepo = AppDataSource.getRepository('Booking');
const updateBooking = await bookingRepo.update({ id: 3 }, { cancelled_at: new Date() });

// 這筆預約不會被刪掉，而是把 cancelled_at 填上時間，代表「已取消」。這樣客服或行銷就能查到這筆紀錄，算出取消率。

// 下面這段統計「每堂課目前有效的預約數」的程式碼有問題，請指出問題並改正。
// 缺少 cancelled_at 條件，會將全部(已預約、已取消)的資料都撈出來
SELECT course_id, COUNT(*) AS total
FROM bookings
WHERE cancelled_at IS NULL
GROUP BY course_id;

// users 的 deleted_at 已在 Entity 標記為 deleteDate。請寫出「停用會員 id 1」的程式碼，並回答：停用後直接呼叫 userRepo.find()，會查到這位會員嗎？如果客服需要調閱他的資料，該怎麼查？
const userRepo = AppDataSource.getRepository('User');
const updateUser = await userRepo.update({ id: 1 }, { deleted_at: new Date() });
// 停用後直接呼叫 userRepo.find()，不會查到這位會員，因為 TypeORM 會自動過濾掉 deleted_at 有值的資料。
// 客服要調閱時，明確加上 withDeleted 就能撈出來：
const findUser = await userRepo.findOne({ where: { id: 1 }, withDeleted: true });

// 以下三個需求，各自適合硬刪除、軟刪除，還是更新業務狀態？請簡短說明理由。

// 會員申請刪除帳號，但依規定交易紀錄要保存五年
// >> 軟刪除，保留帳號資料與交易紀錄，方便日後查詢。
// 使用者把課程加入購物車後又移除
// >> 硬刪除，因為這是暫存資料，沒有保留的必要，刪掉即可。
// 會員在開課前一天取消了預約
// >> 更新業務狀態，因為這是正常的業務流程，取消預約只是改變了預約的狀態，而不是刪除資料。