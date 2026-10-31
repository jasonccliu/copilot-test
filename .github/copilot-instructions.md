# GitHub Copilot 協作指示

## 技術限制
- 這是一個純前端專案，只使用 HTML、CSS、原生 JavaScript。
- 禁止引入任何框架或套件，不要建立 `package.json`，也不要執行 `npm install`。
- 不要引用外部 CDN，必須能離線運作。
- 檔案結構固定為根目錄的 `index.html`、`styles.css`、`app.js`。

## 程式風格
- 註解一律使用繁體中文。
- 變數與函式命名使用英文 `camelCase`。
- CSS 顏色一律使用 `:root` 定義的 CSS 變數，不要寫死色碼。
- 使用 `const` / `let`，不要使用 `var`。
- 產生 DOM 內容時，優先使用 `textContent` 或 `createElement`，不要用 `innerHTML` 組字串。

## 協作方式
- 動手改之前，先條列說明打算修改哪些檔案、做什麼變動，等確認後再開始實作。
- 一次只處理一件事，不要順手做我沒有要求的重構。
- 修改完成後，必須說明要如何在瀏覽器中驗證這些功能。

## 實作原則
- 以最小範圍修改為原則，避免不必要的變更。
- 儘量保持程式碼簡潔、可維護，並符合目前專案的結構與風格。
- 若資料需要持久化，優先使用 `localStorage`。
- 若要處理使用者互動，請保留原生 JavaScript 的事件模型與 DOM 操作方式。
