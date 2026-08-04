// 延續 Day 34 設計的線上課程平台，migration 已經把四張表都建好了，結構如下：

// coaches.id  ← courses.coach_id       這堂課是哪位教練開的
//   users.id  ← enrollments.user_id    這筆報名是哪位學員
// courses.id  ← enrollments.course_id  這筆報名是哪堂課
// 你要寫一個 Seeder，塞入幾筆教練、學員、課程與報名紀錄，確認這四張表都能正常寫入。

// 根據以上情境，回答下列問題：

// 為什麼 Seeder 通常會設計成「先清空、再重新寫入」？如果只寫入、不清空，重複執行幾次之後會發生什麼事？
因為外鍵必須對應到一筆真實存在的資料，如果文章還不存在就先寫入留言，留言的 article_id 會指向一筆不存在的資料，資料庫會直接報錯、拒絕寫入。

所以寫入的順序是：先寫「被指向」的那張表，再寫「指向它」的那張表——先有文章，才能寫入屬於它的留言。

// 這四張表（coaches、users、courses、enrollments）的寫入順序該怎麼安排？請說明理由（提示：想想每個外鍵分別指向誰）。
users、coaches > courses > enrollments
1. 先有 users、coaches ，才能寫入這堂課(courses)是哪位教練開的。
2. 再寫入這筆報名是哪位學員、這筆報名是哪堂課，記錄 enrollments 

// 清除的順序又該怎麼安排？如果先清了 courses，但 enrollments 還有資料，會發生什麼事？
enrollments > courses > users、coaches
如果反過來先刪courses，還留在表裡的enrollments就會指向不存在的資料，資料庫同樣會擋下這個刪除動作、直接報錯。

// 寫入一筆報名紀錄（enrollments）時，需要填 user_id 和 course_id 兩個外鍵。用 ORM 的話，除了「先查出學員和課程的 id、再填進外鍵」之外，還有什麼更直覺的做法？
???

直接把「剛剛寫入的那筆學員資料」和「剛剛寫入的那筆課程資料」指給這筆報名紀錄，例如：

const coach = await coachRepo.save({ name: 'xx教練' });
const user = await userRepo.save({ name: 'yy學員' });
const course = await courseRepo.save({ title: 'zzz班', coach: coach });

await enrollmentRepo.save({
    user: user,      // 這筆報名屬於哪位學員
    course: course,  // 這筆報名屬於哪堂課
});

用「哪一筆資料」來表達關聯，user_id、course_id 這些外鍵的值由 ORM 自動找出對應的 id 填入，不用自己先查一次。