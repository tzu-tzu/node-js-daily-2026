// Seq Scan：從頭到尾一筆一筆掃過整張表。資料量小沒差，資料一多就會變慢。
// Index Scan：透過索引直接定位到需要的資料，不用整張表掃過一遍。
// Rows Removed by Filter：撈出來之後又被篩選掉幾筆。這個數字如果很大，代表資料庫做了很多「白工」——掃了一堆用不到的資料才找到答案。


-- 建立索引前：
EXPLAIN ANALYZE
SELECT * FROM bookings WHERE member_id = 1;

Seq Scan on bookings  (cost=0.00..1834.00 rows=200 width=20) (actual time=0.015..18.432 rows=200 loops=1)
  Filter: (member_id = 1)
  Rows Removed by Filter: 99800
Planning Time: 0.089 ms
Execution Time: 20.104 ms

-- 建立索引後（CREATE INDEX idx_bookings_member_id ON bookings(member_id);）：
EXPLAIN ANALYZE
SELECT * FROM bookings WHERE member_id = 1;

Index Scan using idx_bookings_member_id on bookings  (cost=0.42..8.44 rows=200 width=20) (actual time=0.021..0.115 rows=200 loops=1)
  Index Cond: (member_id = 1)
Planning Time: 0.102 ms
Execution Time: 0.203 ms

-- 加上第二個篩選條件之後（200 筆中約 100 筆符合 class_id = 2）：
EXPLAIN ANALYZE
SELECT * FROM bookings WHERE member_id = 1 AND class_id = 2;

Index Scan using idx_bookings_member_id on bookings  (cost=0.42..8.44 rows=100 width=20) (actual time=0.021..0.089 rows=100 loops=1)
  Index Cond: (member_id = 1)
  Filter: (class_id = 2)
  Rows Removed by Filter: 100
Planning Time: 0.098 ms
Execution Time: 0.152 ms


-- 請閱讀上面三份執行計畫，回答以下問題：

-- 建立索引前後，執行計畫用的方法（Seq Scan / Index Scan）與 Execution Time 各是多少？為什麼建立索引後會變快？
計畫一: Seq Scan, 20.104 ms
計畫二: Index Scan, 0.203 ms
計畫三: Index Scan, 0.152 ms

因為先將表單依照索引進行整理，不需要掃描整張表，而是依照索引，鎖定目標範圍的資料進行查找。

為什麼建立索引後會變快？
Seq Scan 必須把整張表（約 100000 筆）全部讀進來，然後逐筆檢查 member_id = 1，其中 9800 筆被 filter 掉。
Index Scan 只需要在 B‑tree 索引上定位到 member_id = 1 的葉節點，直接取得符合條件的 200 筆（或 100 筆），不必讀取其餘 99800 筆資料。
索引本身的大小遠小於整張表，且大多數情況下可以在記憶體（或快取）中完成定位，因而 I/O 與 CPU 開銷都大幅降低，執行時間從 20 ms 降到 0.2 ms（約 100 倍）。
小提醒：execution time 受硬體、快取、同時執行的工作負載等因素影響，實際數值會有波動，但相對差距（Seq Scan ≫ Index Scan）在大多數情況下都會保持。

-- 第三份執行計畫比第二份多了 class_id 的篩選條件，因此出現了 Rows Removed by Filter: 100。對照文中「先認得三個關鍵字」的說明，這代表資料庫多做了什麼事？
資料撈出來之後，又有幾筆資料被篩選掉。

1. 索引只涵蓋 member_id，因此 PostgreSQL 只能利用這個索引先找出所有 member_id = 1 的列（200 筆）。
2. 接著在取得每筆列的完整資料（從主表）後，額外檢查 class_id = 2，其中 100 筆 不符合條件，被 filter 移除。
3. 這段「filter」的工作是 在資料行層面（row‑level） 進行的，屬於「白工」：已經讀取了資料卻發現不需要返回。

為什麼會出現 rows removed by filter？
因為索引只包含 member_id，而 class_id 並未在索引中。若索引同時包含 class_id（或使用複合索引），這個額外的 filter 就可以在索引階段完成，rows removed by filter 會變成 0。

-- 這篇範例示範了「幫 member_id 建索引」讓查詢變快。如果你想讓第三份執行計畫的查詢再更快一點，依照同樣的做法，你會建議怎麼做？
CREATE INDEX IF NOT EXISTS idx_bookings
ON bookings (member_id, class_id);


單獨為 class_id 建立索引會讓 PostgreSQL 在某些情況下選擇 class_id 索引（如果 class_id = 2 的選擇性更好），但在本例中查詢同時使用 member_id 與 class_id，最理想的做法是 建立複合索引：
sql: CREATE INDEX idx_bookings_member_class ON bookings(member_id, class_id);
這樣的索引同時包含兩個條件，查詢可以在索引階段直接定位到 member_id = 1 AND class_id = 2，不需要再做 filter，rows removed by filter 會變成 0，執行時間會更短。