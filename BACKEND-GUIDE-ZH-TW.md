# VGAME 個人網站後台操作指南

## 入口網址

- 公開網站：`https://vgame-mavis.github.io/`
- GitHub 儲存庫：`https://github.com/Vgame-Mavis/Vgame-Mavis.github.io`
- Pages CMS 內容後台：`https://app.pagescms.org/`

## 第一次啟用 Pages CMS

1. 開啟 Pages CMS，選擇使用 GitHub 登入。
2. GitHub 要求安裝或授權 Pages CMS 時，只允許它存取 `Vgame-Mavis.github.io` 這一個儲存庫。
3. 回到 Pages CMS，選擇 `Vgame-Mavis.github.io`。
4. 左側會顯示 `Site Settings` 與 `Products`。

## Site Settings（網站設定）

可管理公開名稱、頁首簡稱、英文身份說明、首頁標題與介紹、聯絡資訊、按鈕文字及詢問表單收件端點。

- `Publish contact details`：關閉時，網站不顯示公開聯絡方式。
- `Location`：目前保持空白，因此網站不顯示所在地或時區。
- `Form submission endpoint`：目前使用 FormSubmit，把詢問寄至 `vgame.mvs@gmail.com`。

## Products（商品）

可新增、修改、排序或隱藏商品。每筆資料包含：

- Product title：商品英文名稱
- Category：商品分類
- Series label：系列標籤
- Player configuration：玩家／座位配置
- Product introduction：網站上顯示的商品簡介
- Product focus tag：商品卡片上的重點標籤
- Product photo：已獲授權的商品照片或遊戲畫面；不可用 FI、BI、IN 等縮寫替代
- Product photo description：英文圖片說明，供無障礙閱讀與搜尋引擎使用
- YouTube gameplay URL：選填，只能放官方或已確認可公開的 YouTube 影片
- Show on website：開啟時公開顯示；關閉時保留資料但不顯示

商品卡片不連到其他 VGAME 官網；主要按鈕會進入本站詢問表單。外部產品資訊入口僅允許 Alibaba.com，以及由網站擁有人確認過的 YouTube 網址。若尚未取得可靠照片，請先關閉 `Show on website`，不要用無關圖片或生成圖片代替。

## 儲存與發布

1. 在 Pages CMS 完成修改後按儲存。
2. Pages CMS 會把變更寫入 GitHub。
3. GitHub Pages 通常會在幾分鐘內自動更新公開網站。
4. 若要復原，可在 GitHub 儲存庫的提交記錄中找到舊版本。

## 啟用詢問表單

網站首次送出測試詢問後，FormSubmit 會寄啟用信到 `vgame.mvs@gmail.com`。必須由信箱持有人點擊啟用連結，之後正式詢問才會正常轉寄。測試時不要輸入真實客戶的敏感資料。

## 安全原則

- 不要在網站或 GitHub 儲存庫放入密碼、驗證碼、身分證件、銀行或付款資料。
- 只授予 Pages CMS 存取這一個網站儲存庫的權限。
- 商品名稱、圖片、功能與用途必須真實，不應以改寫字詞掩飾產品用途。
- 發布前確認所有商品文字、公開聯絡資訊及 Alibaba／YouTube 連結仍正確。
