# Crosshair Overlay

[English](README.md) | 繁體中文

這是一個使用 Electron 開發的 Windows 桌面應用程式，提供可自訂、透明且永遠置頂的準星（Crosshair）覆蓋層。非常適合 FPS 射擊遊戲，或是任何需要螢幕中心參考點的應用場景。

## 下載

[⬇️ 從 GitHub Releases 下載最新版本](https://github.com/jonny030/crosshair-overlay/releases/latest)

## 功能特色

- **永遠置頂與滑鼠穿透：** 準星會固定顯示在所有視窗的最上層，並且會穿透滑鼠點擊（完全不會干擾您的遊戲或日常操作）。
- **即時設定面板：** 調整設定後可立即預覽準星變化，無需重新啟動應用程式。
- **多種準星風格：** 提供十字 (Cross)、圓點 (Dot)、圓圈 (Circle)、T型 (T-Shape) 以及十字加圓點 (Cross + Dot) 等多種樣式供選擇。
- **完全客製化：** 可自由調整顏色、大小、粗細、間距與透明度。
- **位置偏移微調：** 可輕鬆調整 X 軸與 Y 軸的偏移量（預設為稍微偏下的位置，這也是許多現代 FPS 遊戲常用的視角設定）。
- **自動儲存設定：** 您的設定會在每次變更後自動儲存，並在下次啟動時自動載入套用。

## 設定檔位置

您的所有設定會自動儲存在以下路徑：
- **Windows:** `%APPDATA%\crosshair-overlay\settings.json`

如果您想要將所有設定恢復為預設值，只需關閉應用程式，刪除該檔案並重新啟動即可。

## 開發指南

### 環境要求
- 系統中需安裝 [Node.js](https://nodejs.org/)。

### 開始使用

1. 複製此專案到本機：
   ```bash
   git clone <your-repo-url>
   cd Crosshair
   ```
2. 安裝所需套件：
   ```bash
   npm install
   ```
3. 在開發模式下啟動應用程式：
   ```bash
   npm run dev
   ```

## 封裝為 Windows 執行檔

若要將應用程式打包為獨立的 Windows 安裝檔與免安裝的 `.exe` 檔，請執行：

```bash
npm run build
```
編譯完成的發布檔案將會生成在 `dist` 資料夾中。