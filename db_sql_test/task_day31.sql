-- 健身房系統的 bookings.booked_at 已經建立索引。同事想查「2026-07-01 這一天」的所有預約，寫了以下查詢：
SELECT * FROM bookings WHERE DATE(booked_at) = '2026-07-01';
-- 他用 EXPLAIN ANALYZE 檢查後發現，資料庫用的是 Seq Scan，索引完全沒被用到，跟預期的不一樣。

-- 根據以上情境，回答下列問題：

-- 為什麼這條查詢明明 booked_at 有索引，卻還是變成 Seq Scan？
因為索引裡存的是 booked_at 原本完整的時間戳記，不是被 DATE() 處理過的結果。資料庫沒辦法直接拿索引去對應「函式運算後的值」，只能對每一筆資料都先算一次 DATE(booked_at) 再比對，等於整張表都要掃過一遍（Seq Scan）。

-- 請把這條查詢改寫成不會讓索引失效的寫法，並說明查詢結果為什麼不會改變。
SELECT * FROM bookings
WHERE booked_at >= '2026-07-01 00:00:00'
  AND booked_at < '2026-07-02 00:00:00';

查詢結果跟原本完全一樣，但因為 booked_at 沒有被函式包住，資料庫可以直接拿它去比對索引，重新用回 Index Scan。

-- 如果 members 表的 name 欄位也建了索引，同事寫了 WHERE LOWER(name) = 'vip' 這樣的查詢，你覺得索引還會生效嗎？為什麼？
不會，因為name用函式處理字串。

不會生效。跟 DATE(booked_at) 是一樣的道理：索引裡存的是 name 欄位原本的字串，LOWER(name) 是先把每一筆資料轉成小寫之後才比對，資料庫沒辦法拿索引直接對應「轉換過的值」，一樣得整張表逐筆計算 LOWER(name) 再比對，變成 Seq Scan。

