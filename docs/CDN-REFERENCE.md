# 🔗 HOLY LABEL CDNリファレンス

本ガイドでは、HOLY LABEL外部ライブラリの全CDNリンクと使用方法を説明します。

## 🌐 CDN配信情報

### 配信プロバイダー
- **CDN**: jsDelivr
- **リポジトリ**: `irutomo/holy-label-js-divede`
- **ブランチ**: `main`
- **配信URL**: `https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/`

### キャッシュ設定
- **ブラウザキャッシュ**: 最大1年
- **CDNキャッシュ**: 自動更新
- **プリロード対応**: HTTP/2対応

## 📱 CSS ライブラリ

### Phase 1: Foundation Bundle（基盤スタイル）

#### Foundation Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css">
```
- **サイズ**: 2.1KB（圧縮後）
- **内容**: リセットCSS、基本レイアウト、タイポグラフィ
- **対象ページ**: 全ページ（必須）

### Phase 2: Components Bundle（コンポーネント）

#### Components Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/components-bundle.min.css">
```
- **サイズ**: 2.8KB（圧縮後）
- **内容**: メニュー、商品コンポーネント、基本アニメーション
- **対象ページ**: 全ページ（推奨）

### Phase 3: Product Bundle（商品関連）

#### Product Detail Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/product-detail-bundle.min.css">
```
- **サイズ**: 3.2KB（圧縮後）
- **内容**: 商品詳細、購入フォーム、画像ギャラリー
- **対象ページ**: 商品詳細ページ

#### Forms Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/forms-bundle.min.css">
```
- **サイズ**: 2.5KB（圧縮後）
- **内容**: フォーム要素、入力、ボタン、エラーメッセージ
- **対象ページ**: お問い合わせ、購入ページ

#### Responsive Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/responsive-bundle.min.css">
```
- **サイズ**: 1.8KB（圧縮後）
- **内容**: レスポンシブ、メディアクエリ、モバイル対応
- **対象ページ**: 全ページ（必須）

#### Footer Pages Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/footer-pages-bundle.min.css">
```
- **サイズ**: 2.1KB（圧縮後）
- **内容**: フッター、ページコンテンツ、BASE固有要素
- **対象ページ**: 全ページ

### Phase 4: Special Bundle（特殊機能）

#### Special Pages Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/special-pages-bundle.min.css">
```
- **サイズ**: 7.1KB（圧縮後）
- **内容**: LOOKBOOK、About、Contact、特定商取引法ページ
- **対象ページ**: 特殊ページのみ

#### UI Components Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/ui-components-bundle.min.css">
```
- **サイズ**: 7.0KB（圧縮後）
- **内容**: モーダル、PayIDウィジェット、Ajax読み込み、キーフレーム
- **対象ページ**: 機能使用ページ

#### BASE Integration Bundle
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/base-integration-bundle.min.css">
```
- **サイズ**: 7.6KB（圧縮後）
- **内容**: BASE多言語UI、Instagram固定ボタン、外貨表示、BASEアプリ統合
- **対象ページ**: BASE統合機能使用時

## 💻 JavaScript ライブラリ

### Phase 1: Core Bundle（基盤機能）

#### Core Bundle
```html
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"></script>
```
- **サイズ**: 1.5KB（圧縮後）
- **内容**: DOMUtils、PageState、AnimationConfig
- **依存関係**: なし
- **対象ページ**: 全ページ（必須）

### Phase 2: Extended Bundle（拡張機能）

#### Extended Bundle
```html
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/extended-bundle.min.js"></script>
```
- **サイズ**: 4.1KB（圧縮後）
- **内容**: AnimationManager、NavigationManager、ModalUtils
- **依存関係**: Core Bundle
- **対象ページ**: インタラクティブ機能使用ページ

### Phase 3: Advanced Bundle（高度機能）

#### Advanced Bundle
```html
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/advanced-bundle.min.js"></script>
```
- **サイズ**: 4.8KB（圧縮後）
- **内容**: ProductImageGallery、LoadMoreManager、LogoManager
- **依存関係**: Core Bundle、Extended Bundle
- **対象ページ**: 商品詳細、一覧ページ

### Phase 4: Final Bundle（最終機能）

#### Final Bundle
```html
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/final-bundle.min.js"></script>
```
- **サイズ**: 3.3KB（圧縮後）
- **内容**: InitializationManager、LanguageManager、ScrollManager
- **依存関係**: 全ライブラリ
- **対象ページ**: 全ページ（推奨）

## 🎯 推奨読み込みパターン

### パターン1: 全機能読み込み（推奨）

```html
<!-- CSS（head内） -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/components-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/product-detail-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/forms-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/responsive-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/footer-pages-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/special-pages-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/ui-components-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/base-integration-bundle.min.css">

<!-- JavaScript（body終了前） -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/extended-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/advanced-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/final-bundle.min.js"></script>
```

### パターン2: 最小構成

```html
<!-- 必須ライブラリのみ -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/components-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/responsive-bundle.min.css">

<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"></script>
```

### パターン3: 条件付き読み込み

```html
<!-- 基本ライブラリ -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/components-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/responsive-bundle.min.css">

<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"></script>

<script>
// ページタイプに応じた動的読み込み
document.addEventListener('DOMContentLoaded', function() {
  const pageType = document.body.id;
  
  if (pageType === 'shopDetailPage') {
    loadCSS('https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/product-detail-bundle.min.css');
    loadJS('https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/advanced-bundle.min.js');
  }
});

function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function loadJS(src) {
  const script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}
</script>
```

## 📊 パフォーマンス情報

### 総ファイルサイズ
- **CSS合計**: 35.1KB（圧縮後）
- **JavaScript合計**: 13.7KB（圧縮後）
- **全体合計**: 48.8KB（圧縮後）

### 読み込み時間目安
- **高速回線（100Mbps）**: 約0.1秒
- **標準回線（10Mbps）**: 約0.5秒
- **低速回線（1Mbps）**: 約2.5秒

### ブラウザサポート
- **Chrome**: 最新版 + 過去2バージョン
- **Firefox**: 最新版 + 過去2バージョン
- **Safari**: 最新版 + 過去2バージョン
- **Edge**: 最新版 + 過去2バージョン

## 🔧 開発者向け情報

### 個別ライブラリファイル

必要に応じて個別ライブラリも利用可能です：

#### CSS個別ファイル
```html
<!-- 個別CSS（参考） -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/layout.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/base-menu.min.css">
<!-- ... 他の個別ファイル ... -->
```

#### JavaScript個別ファイル
```html
<!-- 個別JavaScript（参考） -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/dom-utils.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/page-state.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/animation-config.min.js"></script>
<!-- ... 他の個別ファイル ... -->
```

### CDN統計情報

jsDelivrの統計情報は以下で確認できます：
```
https://www.jsdelivr.com/package/gh/irutomo/holy-label-js-divede
```

## 🛡️ セキュリティとベストプラクティス

### SRI（Subresource Integrity）対応

本番環境では SRI ハッシュの使用を推奨：

```html
<!-- SRI対応例（ハッシュは実際のファイルに応じて更新） -->
<link rel="stylesheet" 
      href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css"
      integrity="sha384-xxxxx"
      crossorigin="anonymous">

<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"
        integrity="sha384-xxxxx"
        crossorigin="anonymous"></script>
```

### フォールバック設定

CDN障害に備えたローカルフォールバック：

```html
<script>
// CDN読み込み失敗時のフォールバック
if (typeof window.HolyLabelDOMUtils === 'undefined') {
  console.warn('CDN読み込み失敗：ローカルファイルを使用');
  // ローカルファイルの読み込み処理
}
</script>
```

---

## 🔗 関連ドキュメント

- **[使い方ガイド](USAGE.md)** - 実際の使用方法
- **[実装ガイド](IMPLEMENTATION.md)** - 技術的詳細  
- **[トラブルシューティング](TROUBLESHOOTING.md)** - 問題解決ガイド
- **[変更履歴](CHANGELOG.md)** - バージョン情報 