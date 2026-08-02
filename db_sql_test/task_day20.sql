CREATE TABLE members (
  id      INT PRIMARY KEY,
  name    VARCHAR(50),
  email   VARCHAR(100),
  level   VARCHAR(20),
  city    VARCHAR(50),
  credits INT
);
INSERT INTO members VALUES
(1, 'Alice',   'alice@example.com',   'VIP', '台北', 520),
(2, 'Bob',     'bob@example.com',     '一般', '台中', 80),
(3, 'Charlie', 'charlie@example.com', 'VIP', '高雄', 310),
(4, 'Diana',   'diana@example.com',   '一般', '台北', 350),
(5, 'Eve',     'eve@example.com',     'VIP', '台南', 490);


-- 任務要求：

-- 新增一筆會員資料：id 6、name Frank、email frank@example.com、level 一般、city 新竹、credits 120
INSERT INTO MEMBERS VALUES
(6, 'Frank',   'frank@example.com',   '一般', '新竹', 120);

-- 將 id 為 2 的會員（Bob）的 credits 更新為 300
UPDATE MEMBERS
   SET CREDITS =300
 WHERE ID =2;

-- 將 id 為 4 的會員（Diana）的 level 改為 VIP、credits 改為 400
UPDATE MEMBERS
   SET LEVEL ='VIP',
       CREDITS =400
 WHERE ID =4;

-- 刪除 id 為 6 的會員（Frank）
DELETE FROM MEMBERS
 WHERE ID =6;
