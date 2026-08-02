-- 健身房系統想新增一個「最新預約列表」功能，會用到以下查詢：
SELECT * FROM bookings ORDER BY booked_at DESC LIMIT 20;
-- 目前 booked_at 沒有建索引，EXPLAIN ANALYZE 顯示資料庫用 Sort 把 10 萬筆資料整個排序過一次，才取出前 20 筆，Execution Time 約 35 ms。

-- 同時，同事也在維護這條關聯查詢：
SELECT members.name, bookings.*
FROM members
JOIN bookings ON members.id = bookings.member_id
WHERE members.email = 'alice@example.com';
-- members 表有 2 萬筆會員資料，members.id 是主鍵；bookings.member_id 目前沒有建索引。

-- 根據以上情境，回答下列問題：

-- 為什麼「取最新 20 筆預約」這種查詢，沒有索引時要排序 10 萬筆資料才能拿到結果？幫 booked_at 建索引後，資料庫的做法會有什麼不同？
因為取最新 20 筆需要用booked_at將時間排序，才知道哪幾筆是最新的。因此每一筆都要執行，才能正確編排。
建立booked_at索引後，會先將這張表存起來，後需要使用，就不用再重新排序，直接使用即可。

沒有索引時，資料庫不知道資料原本的順序，只能先把 10 萬筆全部依 booked_at 排序一次，才能從排好的結果裡取出最前面 20 筆——即使只要 20 筆，也得先處理過全部資料。建了索引之後（CREATE INDEX idx_bookings_booked_at ON bookings(booked_at);），資料庫已經有一份依 booked_at 排好序的副本，可以直接照順序往下讀，讀滿 20 筆就停止，不需要對整張表做排序。

-- bookings 和 members 用 member_id / id 做 JOIN，你會建議幫哪個欄位建索引？members.id 需要另外補索引嗎？為什麼？
member_id，因為 id本身是 primary已經有索引。
需要，建立複合索引，才會將兩張表join起來

應該幫 bookings.member_id 建索引（CREATE INDEX idx_bookings_member_id ON bookings(member_id);）。因為這條查詢是拿會員的 id 去 bookings 表裡找她的所有預約，被翻找的是 bookings.member_id 這一欄，沒有索引就得掃過 10 萬筆。至於 members.id，它是主鍵、建表時就自帶索引，不需要另外補。

-- 假設健身房系統另外有一張 class_types（課程分類：重訓、有氧、瑜伽）的表，長期以來只有 3 筆資料，bookings 表如果也有一個對應的外鍵欄位指到這張表，你覺得幫這個外鍵欄位建索引還有意義嗎？為什麼？
(xxx)有，因為系統會經常使用到types分類的情況。雖然選擇性低，但被使用的次數高，長期是益的

意義不大。class_types 只有 3 筆資料，代表這個外鍵欄位的選擇性很低（全部的值只會落在 3 種可能之一），單一條件過濾能篩掉的資料比例很小，資料庫很可能評估後直接略過索引、選擇整張表掃過去反而更快。幫外鍵欄位建索引主要是為了讓資料庫能透過「對半縮小範圍」快速定位到少數符合條件的資料，但如果被參照的資料表本身筆數很少、對應值的種類也很少，這個優勢就發揮不出來。
