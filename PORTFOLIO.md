# 待辦清單 Web App

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App，目的是練習如何使用 AI 協助開發前端功能、處理問題與驗證修正，並同時結合 GitHub MCP 與 Agentic workflow 的開發方式。

## 線上展示

GitHub Pages：https://jasonccliu.github.io/copilot-test/

## 功能

- 新增待辦事項
- 勾選待辦事項為完成狀態
- 取消完成狀態後，項目會回到對應清單中
- 刪除單一待辦項目
- 顯示未完成項目數量：未完成:N 項
- 支援全部 / 未完成 / 已完成三種篩選
- 深色模式切換，並記住使用者偏好
- 若未設定偏好，會依照作業系統的深淺色設定自動跟隨
- 支援批次清除已完成項目，並在刪除前要求確認
- 資料會保存在 `localStorage`，重新整理頁面後仍可保留
- 空白輸入不會新增項目
- 清單為空時會顯示明確提示文字

## 技術

- 使用純 HTML、CSS 與原生 JavaScript 開發
- 不使用框架或套件
- 不依賴外部 CDN，能離線開啟
- 使用 `localStorage` 保存待辦資料與使用者主題偏好
- 使用 CSS 變數管理主題色票，便於維護淺色與深色模式

## 開發方式

這個專案是依照 GitHub Copilot 實戰工作坊的方式進行開發，重點包括：

- 使用 GitHub Copilot Agent Mode 來生成與調整功能邏輯
- 利用 GitHub MCP Server 讀取 GitHub issue、檢視問題內容與需求
- 使用 Microsoft Learn MCP 工具查詢官方文件，確認深色模式與無障礙相關建議
- 依照 `.github/prompts/fix-issue.prompt.md` 的流程處理 issue：先讀取問題、提出計畫、等待確認、再進行修改、提交與建立 PR
- 透過 `localStorage`、篩選邏輯、主題切換與確認對話框，把使用者需求轉成可驗證的前端功能

## 我學到什麼

- 如何把需求拆成小步驟，先定位問題再修正功能
- 如何利用 GitHub Copilot 協助快速產生前端 UI 與交互邏輯
- 如何在前端專案中做資料持久化，並保留使用者偏好設定
- 如何使用 GitHub Issue 與 PR 流程進行小型迭代開發與驗證
- 如何以簡潔而可維護的方式設計純 JavaScript 專案，並保持功能與可讀性一致
 