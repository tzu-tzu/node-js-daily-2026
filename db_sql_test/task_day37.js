openapi: 3.0.3
info:
  title: LiveFit 健身房 API
  version: 1.0.0
servers:
  - url: https://api.livefit.tw/v1
paths:
  /auth/login:
    post:
      summary: 登入取得 token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - email
                - password
              properties:
                email:
                  type: string
                password:
                  type: string
      responses:
        '200':
          description: 登入成功，回傳 JWT token
        '401':
          description: 帳號或密碼錯誤
  /courses:
    get:
      summary: 取得課程列表
      parameters:
        - name: level
          in: query
          required: false
          schema:
            type: string
            enum: [beginner, advanced]
        - name: page
          in: query
          required: false
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: 成功取得課程列表
  /courses/{courseId}:
    get:
      summary: 取得單一課程
      parameters:
        - name: courseId
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: 成功
        '404':
          description: 找不到課程
  /users/me:
    get:
      summary: 取得個人資料
      security:
        - bearerAuth: []
      parameters:
        - name: Accept-Language
          in: header
          required: false
          schema:
            type: string
            example: zh-TW
      responses:
        '200':
          description: 成功
        '401':
          description: 尚未登入
  /enrollments:
    post:
      summary: 報名課程
      security:
        - bearerAuth: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - courseId
              properties:
                courseId:
                  type: integer
                note:
                  type: string
      responses:
        '201':
          description: 報名成功
        '401':
          description: 尚未登入
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT


// 你是 LiveFit 前端工程師，後端把上面那份 OpenAPI 規格丟給你，要你在還沒看到任何後端程式碼的情況下，先照規格把幾支 API 的呼叫方式搞清楚。請只依據上方規格回答下列問題。

// 客服想查詢「進階等級（advanced）」的課程列表，而且要看第 2 頁。請寫出這次請求應使用的 HTTP 方法與完整路徑（含 query string）。
GET https://api.livefit.tw/v1/courses?level=advanced&page=2

// 請把規格中出現過的參數，依照 Path、Query、Header、Request Body 四類各自歸類，列出各類分別有哪些參數。
Path (in:path): courseId
Query (in:query): level, page
Header (in: header): Accept-Language
Request Body (requestBody): email, password, courseId, note

// 呼叫「報名課程」時，Request Body 裡哪個欄位是必填、哪個可以省略？如果報名成功，預期會回哪個狀態碼？
必填: courseId
可以省略: note
如果報名成功，預期會回 201 

// 你直接對「取得個人資料（GET /users/me）」按下 Try it out → Execute，卻收到 401。請說明原因，以及在 Swagger UI 上要先做哪些動作才能成功呼叫。
因為 GET /users/me 受 security: - bearerAuth: [] 保護，需要先登入才能呼叫。

// 流程是先打 POST /auth/login、用 email 與 password 換到一組 JWT token，之後再把這組 token 帶在需要登入的請求上。

在 Swagger UI 右上角（或每支 API 旁邊的鎖頭圖示）會有一個 Authorize 按鈕，這就是設定登入憑證的地方：
先呼叫 POST /auth/login 拿到 JWT token。 
按 Authorize，把 token 貼進去（Swagger UI 會自動幫你加上 Bearer  前綴，通常只要貼 token 本身）。
之後對有鎖頭的 API 按 Try it out → 填參數 → Execute，請求就會自動帶上 Authorization: Bearer <token>。