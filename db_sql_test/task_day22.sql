-- 任務要求：

-- 撈出 coach_id = 2 的所有課程（title 與 coach_id）
SELECT TITLE, COACH_ID
  FROM COURSES
 WHERE COACH_ID = 2;

-- 撈出 user_id = 3（Charlie）的所有報名記錄（所有欄位）
SELECT *
  FROM ENROLLMENTS
 WHERE USER_ID = 3;

-- 撈出 course_id = 1（晨間瑜珈）的所有報名記錄（所有欄位）
SELECT *
  FROM ENROLLMENTS
 WHERE COURSE_ID = 1;

-- 問答題（透過註解回答）：
-- coaches 與 courses 是什麼關係？（一對多 / 多對多）
一對多，一個教練可以有多個課程，但一個課程只能有一個教練。
-- users 與 courses 透過 enrollments 是什麼關係？（一對多 / 多對多）
多對多，一個使用者可以報名多個課程，一個課程也可以有多個使用者報名。
所以使用 enrollments 這個中間表來建立 users 與 courses 的多對多關係。