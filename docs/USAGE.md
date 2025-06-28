# 🎮 HOLY LABEL 使い方ガイド

このガイドでは、HOLY LABEL外部ライブラリの実際の使用方法を説明します。

## 🚀 クイックスタート

### 1. 基本セットアップ（5分で完了）

HTMLファイルの`<head>`セクションに以下のCDNリンクを追加してください：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- ... 既存のhead要素 ... -->
  
  <!-- HOLY LABEL 外部ライブラリ -->
  
  <!-- CSS ライブラリ（順序重要） -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/components-bundle.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/product-detail-bundle.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/forms-bundle.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/responsive-bundle.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/footer-pages-bundle.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/special-pages-bundle.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/ui-components-bundle.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/base-integration-bundle.min.css">
  
</head>
<body>
  <!-- ... 既存のbody要素 ... -->
  
  <!-- JavaScript ライブラリ（body終了前） -->
  <script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/extended-bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/advanced-bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/final-bundle.min.js"></script>
  
</body>
</html>
```

### 2. 動作確認

ライブラリが正常に読み込まれているかを確認：

```javascript
// ブラウザのコンソールで実行
console.log('DOM Utils:', typeof window.HolyLabelDOMUtils);
console.log('Page State:', typeof window.HolyLabelPageState);
console.log('Animation Config:', typeof window.HolyLabelAnimationConfig);

// すべて "object" と表示されれば成功
```

## 📚 ライブラリ詳細ガイド

### Core Bundle - 基盤機能

#### DOM Utils
DOM要素の効率的な取得・操作を提供します。

```javascript
// 基本的な要素取得
const header = HolyLabelDOMUtils.get('header');
const menuButton = HolyLabelDOMUtils.getId('menu-btn');

// ショートカット関数
const hamburger = HolyLabelDOMUtils.hamburger();
const body = HolyLabelDOMUtils.body();

// クラス操作
HolyLabelDOMUtils.toggleClass(element, 'active');
HolyLabelDOMUtils.addClass(element, 'loaded');
```

#### Page State  
現在のページタイプを自動判定します。

```javascript
// ページタイプの確認
if (HolyLabelPageState.isHomePage()) {
  console.log('トップページです');
}

if (HolyLabelPageState.isShopDetailPage()) {
  console.log('商品詳細ページです');
}

// 現在のページタイプを取得
const pageType = HolyLabelPageState.getPageType();
console.log('現在のページ:', pageType);
```

#### Animation Config
レスポンシブ対応のアニメーション設定を管理します。

```javascript
// アニメーション設定の初期化
HolyLabelAnimationConfig.init();

// レスポンシブ設定の取得
const config = HolyLabelAnimationConfig.getResponsiveConfig();

// CSS変数の適用
HolyLabelAnimationConfig.applyCSSVariables();
```

### Extended Bundle - 拡張機能

#### Animation Manager
高度なアニメーション制御を提供します。

```javascript
// フェードインアニメーション
HolyLabelAnimationManager.fadeIn(element, 300);

// スライドアニメーション
HolyLabelAnimationManager.slideDown(element, {
  duration: 500,
  easing: 'ease-out'
});

// スクロールアニメーション
HolyLabelAnimationManager.scrollTo(targetElement, {
  duration: 800,
  offset: -100
});
```

#### Navigation Manager
ナビゲーション機能を統合管理します。

```javascript
// ハンバーガーメニューの制御
HolyLabelNavigationManager.toggleMenu();

// メニュー状態の確認
if (HolyLabelNavigationManager.isMenuOpen()) {
  // メニューが開いている場合の処理
}

// サブメニューの制御
HolyLabelNavigationManager.handleSubmenu(menuItem);
```

#### Modal Utils
モーダル表示機能を提供します。

```javascript
// モーダルを開く
HolyLabelModalUtils.open('modal-id', {
  overlay: true,
  closeOnClick: true
});

// モーダルを閉じる
HolyLabelModalUtils.close('modal-id');

// 全モーダルを閉じる
HolyLabelModalUtils.closeAll();
```

### Advanced Bundle - 高度機能

#### Product Image Gallery
商品画像ギャラリー機能を提供します。

```javascript
// ギャラリーの初期化
HolyLabelProductImageGallery.init();

// サムネイル画像の切り替え
HolyLabelProductImageGallery.switchImage(imageIndex);

// ズーム機能の有効化
HolyLabelProductImageGallery.enableZoom();
```

#### Load More Manager
Ajax読み込み機能を管理します。

```javascript
// さらに読み込みボタンの制御
HolyLabelLoadMoreManager.init({
  container: '#product-list',
  loadButton: '#load-more-btn',
  itemsPerPage: 12
});

// 手動での読み込み実行
HolyLabelLoadMoreManager.loadMore();
```

#### Logo Manager
ロゴ画像の動的制御を提供します。

```javascript
// ロゴの初期化
HolyLabelLogoManager.init();

// レスポンシブロゴの切り替え
HolyLabelLogoManager.switchResponsiveLogo();
```

### Final Bundle - 最終機能

#### Initialization Manager
全体の初期化プロセスを統合管理します。

```javascript
// 自動初期化（通常は自動実行）
HolyLabelInitializationManager.autoInit();

// 手動初期化
HolyLabelInitializationManager.init({
  enableAnimations: true,
  enableModal: true,
  enableGallery: true
});
```

#### Language Manager
多言語対応機能を提供します。

```javascript
// 言語の切り替え
HolyLabelLanguageManager.switchLanguage('en');

// 現在の言語取得
const currentLang = HolyLabelLanguageManager.getCurrentLanguage();

// 翻訳テキストの取得
const text = HolyLabelLanguageManager.getText('welcome_message');
```

#### Scroll Manager
スクロール関連機能を管理します。

```javascript
// スクロール位置の監視
HolyLabelScrollManager.init();

// 特定位置へのスムーススクロール
HolyLabelScrollManager.scrollTo(1000, {
  duration: 800
});

// スクロール位置の取得
const scrollPos = HolyLabelScrollManager.getScrollPosition();
```

## 🔧 高度な使用方法

### 条件付き読み込み

特定のページでのみライブラリを読み込む場合：

```javascript
// 商品詳細ページでのみギャラリー機能を読み込み
if (HolyLabelPageState.isShopDetailPage()) {
  // すでに advanced-bundle に含まれているため追加読み込み不要
  HolyLabelProductImageGallery.init();
}

// カートページでのみ特定機能を有効化
if (HolyLabelPageState.isCartPage()) {
  HolyLabelModalUtils.init();
}
```

### カスタム初期化

独自の初期化処理を追加する場合：

```javascript
// DOM読み込み完了後の初期化
document.addEventListener('DOMContentLoaded', function() {
  // 基本初期化
  HolyLabelInitializationManager.init();
  
  // カスタム処理
  customInitialization();
});

function customInitialization() {
  // 独自の初期化処理
  console.log('カスタム初期化実行');
  
  // 外部ライブラリとの連携
  if (typeof gtag !== 'undefined') {
    // Google Analytics連携
    setupAnalyticsEvents();
  }
}
```

### イベントハンドリング

外部ライブラリのイベントをカスタマイズ：

```javascript
// モーダル開閉イベントのカスタマイズ
document.addEventListener('modal:open', function(e) {
  console.log('モーダルが開かれました:', e.detail.modalId);
  // カスタム処理
});

document.addEventListener('modal:close', function(e) {
  console.log('モーダルが閉じられました:', e.detail.modalId);
  // カスタム処理
});

// ギャラリー画像変更イベント
document.addEventListener('gallery:imageChange', function(e) {
  console.log('画像が変更されました:', e.detail.imageIndex);
  // Google Analytics イベント送信など
});
```

## 📱 レスポンシブ対応

### ブレークポイント

CSSライブラリで使用されているブレークポイント：

```css
/* モバイル: 0px - 767px */
@media (max-width: 767px) { }

/* タブレット: 768px - 1023px */
@media (min-width: 768px) and (max-width: 1023px) { }

/* デスクトップ: 1024px以上 */
@media (min-width: 1024px) { }
```

### JavaScript でのレスポンシブ制御

```javascript
// 現在のデバイスタイプ確認
const deviceType = HolyLabelAnimationConfig.getDeviceType();

if (deviceType === 'mobile') {
  // モバイル専用処理
  HolyLabelNavigationManager.enableTouchGestures();
} else if (deviceType === 'desktop') {
  // デスクトップ専用処理
  HolyLabelProductImageGallery.enableHoverZoom();
}
```

## 🔍 デバッグとトラブルシューティング

### コンソールでの確認

```javascript
// 読み込み状況確認
console.log('Core:', !!window.HolyLabelDOMUtils);
console.log('Extended:', !!window.HolyLabelAnimationManager);
console.log('Advanced:', !!window.HolyLabelProductImageGallery);
console.log('Final:', !!window.HolyLabelInitializationManager);

// 現在の設定確認
console.log('Page Type:', HolyLabelPageState.getPageType());
console.log('Device Type:', HolyLabelAnimationConfig.getDeviceType());
```

### よくある問題

**Q: ライブラリが読み込まれない**
```javascript
// CDN接続確認
fetch('https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js')
  .then(response => console.log('CDN Status:', response.status))
  .catch(error => console.error('CDN Error:', error));
```

**Q: 機能が動作しない**
```javascript
// 初期化状況確認
if (typeof HolyLabelInitializationManager !== 'undefined') {
  HolyLabelInitializationManager.diagnose();
}
```

## 📈 パフォーマンス最適化

### 読み込み順序の最適化

```html
<!-- 1. Critical CSS（最優先） -->
<link rel="stylesheet" href=".../foundation-bundle.min.css">
<link rel="stylesheet" href=".../components-bundle.min.css">

<!-- 2. ページ固有CSS -->
<link rel="stylesheet" href=".../product-detail-bundle.min.css">

<!-- 3. 機能別CSS -->
<link rel="stylesheet" href=".../ui-components-bundle.min.css">
```

### 遅延読み込み

```javascript
// 非重要機能の遅延読み込み
setTimeout(function() {
  // スクロール監視などの非重要機能を遅延初期化
  if (typeof HolyLabelScrollManager !== 'undefined') {
    HolyLabelScrollManager.init();
  }
}, 2000);
```

---

## 🔗 関連ドキュメント

- **[CDNリファレンス](CDN-REFERENCE.md)** - 全ライブラリのCDNリンク
- **[トラブルシューティング](TROUBLESHOOTING.md)** - 問題解決ガイド
- **[実装ガイド](IMPLEMENTATION.md)** - 技術的詳細
- **[変更履歴](CHANGELOG.md)** - バージョン情報 