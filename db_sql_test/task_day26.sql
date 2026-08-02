-- 任務要求：
-- 用 IN 搭配子查詢，找出有下過訂單的會員名稱（name）
SELECT name
FROM members
WHERE id IN (
        SELECT member_id
        FROM orders
        GROUP BY member_id
    );

-- 用 NOT IN 搭配子查詢，找出從未下過訂單的會員名稱（name）
SELECT name
FROM members
WHERE id NOT IN (
        SELECT member_id
        FROM orders
        GROUP BY member_id
    );

-- 用 = (SELECT ...) 找出金額等於所有訂單最高金額的訂單，回傳 id、category、amount
SELECT id,
    category,
    amount
FROM orders
WHERE amount = (
        SELECT MAX(amount)
        FROM orders
        ORDER BY id
    );

-- 用 SELECT 子查詢，查出每筆訂單的 id、amount，以及所有訂單的整體平均金額（overall_avg，四捨五入為整數）
SELECT id,
    amount,
    (
        SELECT ROUND(AVG(amount), 0)
        FROM orders
    ) AS overall_avg
FROM orders 

-- 用 FROM 子查詢（衍生表），找出平均消費金額超過 1000 的會員姓名（name）與其平均金額（avg_amount）
SELECT m.name,
    m_avg.amt_avg AS avg_amount
FROM members m
    JOIN (
        SELECT member_id,
            ROUND(AVG(amount), 0) AS amt_avg
        FROM orders
        GROUP BY member_id
    ) m_avg ON m_avg.member_id = m.id
WHERE avg_amount > 1000