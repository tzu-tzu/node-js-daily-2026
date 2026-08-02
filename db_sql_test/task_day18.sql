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

-- 撈出所有 level 為 VIP 的會員（所有欄位）
SELECT *
  FROM MEMBERS
 WHERE LEVEL ='VIP';

-- 撈出 credits 大於等於 300 的會員（所有欄位）
SELECT *
  FROM MEMBERS
 WHERE CREDITS >= 300;

-- 只撈出居住在 台北 的會員的 name 與 city
SELECT NAME, CITY
  FROM MEMBERS
 WHERE CITY = '台北';
