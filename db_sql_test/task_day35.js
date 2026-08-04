// 你接手維護一個已經上線的健身房課程系統：資料庫裡的 courses 表已經累積 500 筆課程資料，專案用 ORM 管理結構，目前設定是 synchronize: false。最近有兩件事要處理：

// 同事 A 覺得每次改結構都要跑 migration 很麻煩，提議把 synchronize 改回 true，「讓 ORM 自己同步就好」。
// 需求單要求幫 courses 表加一個 description（課程介紹）欄位。
// 根據以上情境，回答下列問題：

// 你會同意同事 A 的提議嗎？請說明 synchronize: true 在這個「已上線、已有資料」的系統上，可能造成什麼後果。
不同意。它的風險在於這個調整是「自動發生的」：
我們可能不會察覺它更動了什麼
一旦資料庫已經有資料，它為了對齊 entity，是有可能把欄位連同裡面的資料一起刪除的——例如你把 entity 的某個欄位改了名字，ORM 看到的可能是「舊欄位不見了、多了一個新欄位」，於是把舊欄位（和裡面所有資料）刪掉，再建一個空的新欄位

// 承上，如果是「全新專案、資料庫還是空的、還在開發初期」，synchronize: true 有什麼好處？這說明了什麼樣的環境適合用它？
設置為 true 時，每次程式啟動，ORM 會自動把資料庫結構調整成和 entity 一致。這在開發初期很方便：改完 entity 存檔，資料表就跟著更動，不用自己手動處理。

// 用 migration 幫 courses 加上 description 欄位，從產生到套用建議分成哪兩步？為什麼中間要多一道「檢查」？
第一步「產生」：讓工具比對 entity 描述的結構和資料庫現在的結構，把差異整理成一份 migration 檔案。
第二步「檢查後套用」：打開產生出來的檔案，確認裡面的指令正確，再實際套用到資料庫。
中間多一道檢查，是因為產生的指令是工具比對出來的結果，不一定符合你的預期（例如欄位改名可能被理解成「刪舊欄位＋加新欄位」）；套用前先看過，才能在指令真的動到資料庫之前擋下有問題的變動。

// 加 description 欄位時，如果 migration 裡的指令把它設成 NOT NULL（不允許為空）且沒有給預設值，會發生什麼事？該怎麼調整？
舊資料填不上值

-- ⭕ 允許為空：舊資料的 description 先是 NULL，之後再補
ALTER TABLE courses ADD COLUMN description TEXT;

-- ⭕ 或給預設值：舊資料的 description 統一先填上預設值
ALTER TABLE courses ADD COLUMN description TEXT NOT NULL DEFAULT '';