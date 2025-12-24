# Cutie War 開發會議紀錄

**日期**: 2024-12-24  
**專案**: Cutie War 萌寵大戰甜點怪  
**參與者**: 開發者 + AI 助手

---

## 📋 會議摘要

本次會議主要處理遊戲的 Bug 修復、UI/UX 優化、以及劇情內容調整。

---

## ✅ 已完成項目

### 1. UI/UX 改進

#### 1.1 戰鬥角色尺寸放大
- **問題**: 戰鬥和劇情中的角色太小
- **修改檔案**: `Adventure.jsx`
- **改動**:
  - 劇情對話角色: `w-48 h-48` → `w-64 h-64`
  - 戰鬥我方角色: `w-20 h-20` → `w-24 h-24`
  - 戰鬥敵方角色: `w-32 h-32` → `w-40 h-40`

#### 1.2 聊天室導航列遮擋問題
- **問題**: 聊天室輸入框被底部導航列遮擋
- **解決方案**: 進入聊天室時自動隱藏導航列
- **修改檔案**: `App.jsx`, `Chat.jsx`
- **改動**:
  - 新增 `hideNavbar` 狀態
  - `Chat` 組件接收 `onChatRoomChange` callback

#### 1.3 所有頁面加入返回按鈕
- **問題**: 抽卡結果被導航列遮擋，無法點確認
- **解決方案**: 各頁面加入返回首頁按鈕，統一 UX
- **修改檔案**: `App.jsx`, `Gacha.jsx`, `Team.jsx`, `Chat.jsx`, `About.jsx`
- **改動**:
  - 各頁面 Header 加入 `ArrowLeft` 返回按鈕
  - 傳遞 `onBack` prop 給各頁面

#### 1.4 抽卡頁面排版修正
- **問題**: 抽卡結果出現時按鈕被擠到畫面外
- **修改檔案**: `Gacha.jsx`
- **改動**:
  - 改為雙層容器結構，外層可滾動
  - 所有元素加上 `shrink-0` 防止壓縮
  - 按鈕文字動態顯示（抽取中...）

#### 1.5 首頁角色輪播
- **新功能**: 左側角色區改為自動輪播
- **修改檔案**: `Home.jsx`
- **功能**:
  - 每 3 秒自動切換已解鎖角色
  - 左右箭頭手動切換
  - 底部輪播指示器
  - 顯示角色名稱 + 職業

---

### 2. 遊戲邏輯修復

#### 2.1 劇情無限重播問題
- **問題**: 打完一章後劇情又跑一次
- **原因**: `useEffect` 同時監聽 `currentChapterId` 和 `unlockedCharacters`，解鎖角色時觸發重載
- **修改檔案**: `Adventure.jsx`
- **解決方案**: 拆分為兩個 `useEffect`
  - Effect 1: 只監聽 `currentChapterId`，負責載入劇本
  - Effect 2: 監聽 `unlockedCharacters`，負責角色防呆

#### 2.2 抽卡劇透問題
- **問題**: 可以抽到尚未解鎖的角色，造成劇透
- **修改檔案**: `Gacha.jsx`
- **解決方案**: 
  - 抽卡池改為只包含已解鎖的夥伴角色
  - 功能改為「欣賞夥伴」模式
  - 不退幣（金幣只能從冒險獲得）

#### 2.3 frogs 初始解鎖
- **問題**: frogs 應該是初始角色之一
- **修改檔案**: `useGameStore.js`
- **改動**:
  - 初始角色: `['buibui']` → `['buibui', 'frogs']`
  - 重置時也包含 frogs
  - 第 2 章解鎖列表移除 frogs

---

### 3. 劇情內容調整

#### 3.1 第一章加入 frogs 劇情
- **修改檔案**: `story.js`
- **改動**:
  - 標題: 「甜點的逆襲」→「午睡危機」
  - 加入腳皮 Kaphue 和鼻屎 Pesai 的對話
  - 展示雙蛙個性（腳皮暴躁、鼻屎高冷）

#### 3.2 第二章加入新夥伴過場
- **修改檔案**: `story.js`
- **改動**: 結尾加入阿土、大福、麻糬的台詞
  - 阿土: 慢半拍、憨厚
  - 大福: 溫柔甜美
  - 麻糬: 囤積症

---

### 4. 其他修復

#### 4.1 Favicon 錯誤
- **問題**: Vercel 顯示 "There was an issue rendering your favicon"
- **修改檔案**: `index.html`
- **解決方案**: 使用空白 favicon `href="data:,"`

---

## 📝 待辦事項

1. **製作自訂 Favicon**: 可使用肥肥頭像作為網站圖示
2. **舊存檔問題**: 用戶需重置進度才能看到 frogs 初始解鎖效果

---

## 🔧 技術筆記

### localStorage 與初始值衝突
Zustand 的 `persist` 會將狀態存到 localStorage。當程式碼的初始值改變時，localStorage 裡的舊資料優先級更高。解決方法是清除存檔或重置進度。

### React useEffect 依賴管理
當一個 useEffect 有多個依賴時，任何依賴改變都會觸發。若不希望某些狀態改變時觸發，應拆分為多個 useEffect。

---

## 📁 修改檔案清單

| 檔案 | 修改類型 |
|------|----------|
| `src/pages/Adventure.jsx` | Bug 修復、UI 調整 |
| `src/pages/Gacha.jsx` | 邏輯重構、UI 調整 |
| `src/pages/Home.jsx` | 新增輪播功能 |
| `src/pages/Chat.jsx` | UI 調整 |
| `src/pages/Team.jsx` | UI 調整 |
| `src/pages/About.jsx` | UI 調整 |
| `src/App.jsx` | 導航邏輯調整 |
| `src/store/useGameStore.js` | 初始值修改 |
| `src/data/story.js` | 劇情內容更新 |
| `index.html` | Favicon 修復 |

---

*會議紀錄結束*
