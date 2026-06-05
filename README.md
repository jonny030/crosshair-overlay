# Crosshair Overlay

English | [繁體中文](docs/README_zh-TW.md)

A customizable, transparent, and always-on-top crosshair overlay for Windows, built with Electron. Perfect for FPS games or any application where you need a persistent center-screen reference.

## Features

- **Always on top & Transparent:** The crosshair stays above all other windows and ignores mouse clicks (won't interfere with your games).
- **Live Settings Panel:** Instantly preview your changes without restarting the app.
- **Multiple Styles:** Choose from Cross, Dot, Circle, T-Shape, or Cross + Dot.
- **Fully Customizable:** Adjust Color, Size, Thickness, Gap, and Opacity.
- **Position Offset:** Easily tweak the X and Y offsets (defaults to a slightly lowered position preferred in many modern FPS games).
- **Auto-Save:** Your settings are automatically remembered for the next launch.

## Configuration

Your settings are automatically saved to the following location:
- **Windows:** `%APPDATA%\crosshair-overlay\settings.json`

If you want to completely reset your settings to their default values, simply close the app, delete this file, and restart.

## Development

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your system.

### Getting Started

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Crosshair
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app in development mode:
   ```bash
   npm run dev
   ```

## Building for Windows

To package the application into a standalone Windows installer and a portable `.exe`:

```bash
npm run build
```
The compiled binaries will be available in the `dist` folder.