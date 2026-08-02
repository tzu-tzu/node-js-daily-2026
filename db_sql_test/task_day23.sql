-- 任務要求：

-- 用 INNER JOIN 撈出所有課程及其教練姓名，回傳 course_title 與 coach_name（使用資料表別名撰寫）
SELECT C.TITLE AS COURSE_TITLE, CO.NAME AS COACH_NAME
  FROM COURSES AS C
 INNER JOIN COACHES AS CO
    ON C.COACH_ID = CO.ID;

-- 用 INNER JOIN 三表合併，撈出所有報名記錄的學員姓名與課程名稱，回傳 user_name 與 course_title
SELECT U.NAME AS USER_NAME, C.TITLE AS COURSE_TITLE
  FROM ENROLLMENTS AS E
 INNER JOIN USERS AS U
    ON E.USER_ID = U.ID
 INNER JOIN COURSES AS C
    ON E.COURSE_ID = C.ID;

-- 用 LEFT JOIN 撈出所有學員與其報名的課程 id，包含尚未報名的學員（users 為左表），回傳 name、course_id
SELECT U.NAME AS NAME, E.COURSE_ID AS COURSE_ID
  FROM USERS AS U
  LEFT JOIN ENROLLMENTS AS E
    ON U.ID = E.USER_ID