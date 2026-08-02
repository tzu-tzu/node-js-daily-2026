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

-- 撈出所有會員，依 credits 由高到低排列（所有欄位）
SELECT *
  FROM MEMBERS
 ORDER BY CREDITS DESC;

-- 撈出 credits 最高的前 3 名會員的 name 與 credits
SELECT NAME, CREDITS
  FROM MEMBERS
  ORDER BY CREDITS DESC
  LIMIT 3;

-- 撈出 level 為 VIP 的會員，依 credits 由低到高排列（所有欄位）
SELECT * 
  FROM MEMBERS
 WHERE LEVEL = 'VIP'
 ORDER BY CREDITS ASC;
