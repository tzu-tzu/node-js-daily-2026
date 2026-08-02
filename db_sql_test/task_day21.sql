CREATE TABLE books (
  id       INT PRIMARY KEY,
  title    VARCHAR(100),
  author   VARCHAR(50),
  category VARCHAR(20),
  price    INT,
  stock    INT
);
INSERT INTO books VALUES
(1, '深入淺出 Node.js', '朴靈',         '後端', 580, 15),
(2, 'JavaScript 大全',  '大衛·佛蘭納根', '前端', 750,  8),
(3, '設計模式',         'GoF',           '後端', 680,  3),
(4, 'CSS 秘密花園',     'Lea Verou',     '前端', 520, 20),
(5, '重構',             '馬丁·福勒',     '後端', 630,  6);


-- 任務要求：

-- 撈出所有書籍的完整資料
SELECT * 
  FROM BOOKS;

-- 只撈出 category 為 後端 的書籍，依 price 由低到高排列（所有欄位）
SELECT * 
  FROM BOOKS
 WHERE CATEGORY = '後端'
 ORDER BY PRICE ASC;

-- 撈出 price 在 600 以下的書籍的 title 與 price，依 price 由高到低排列
SELECT TITLE, PRICE
  FROM BOOKS
 WHERE PRICE <600
 ORDER BY PRICE DESC;

-- 撈出庫存（stock）最低的前 2 本書的 title 與 stock
SELECT TITLE, STOCK
  FROM BOOKS
 ORDER BY STOCK ASC
 LIMIT 2;

-- 新增一本書：id 6、title Clean Code、author Robert C. Martin、category 後端、price 560、stock 12
INSERT INTO BOOKS VALUES
(6, 'Clean Code', 'Robert C. Martin', '後端', 560, 12);

-- 將 id 為 3 的書（設計模式）庫存更新為 10
UPDATE BOOKS
   SET STOCK = 10
 WHERE ID = 3;