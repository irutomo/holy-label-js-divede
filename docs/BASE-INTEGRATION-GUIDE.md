# 🔧 HOLY LABEL BASE機能統合ガイド

**BASEテンプレート構文とHTML実装の詳細マッピング**

---

## 📋 概要

このガイドでは、HOLY LABELテーマ内のBASE機能との詳細な紐付けと、外部ライブラリアーキテクチャの関係性を説明します。

---

## 🏗️ プロジェクト構造とBASE統合

### 外部化済みアーキテクチャ
```
┌─────────────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│ holy-label-js-divede.html│───▶│ jsDelivr CDN     │───▶│ 外部ライブラリ       │
│ 35.1KB (23.4%使用)     │    │ GitHub自動連携   │    │ CSS: 59.8KB (34個)  │
│ BASEテンプレート構文完備│    │ キャッシュ最適化 │    │ JS: 80.3KB (29個)   │
└─────────────────────────┘    └──────────────────┘    └─────────────────────┘
```

### BASE制限準拠状況
- **HTMLファイル制限**: 150KB中35.1KB使用（23.4%）
- **BASEテンプレート構文**: 完全保持
- **BASE Apps対応**: Search、ItemLabel、Blog、I18n
- **レスポンシブ対応**: モバイルファースト設計

---

## 🔗 BASE機能とHTML要素のマッピング

### 1. BASE基本タグとHTML実装

#### 🏷️ ロゴタグ `{LogoTag}`
**場所**: 行番号 75-77
```html
<div class="logo">
    <a href="{IndexPageURL}">{LogoTag}</a>
</div>
```
**機能**: BASE管理画面で設定したロゴを表示
**外部ライブラリ連携**: `logo-manager.js`でポジション制御

#### 🍔 BASEメニュータグ `{BASEMenuTag}`
**場所**: 行番号 70-72
```html
<div class="base-menu-container">
    {BASEMenuTag}
</div>
```
**機能**: BASE標準のメニューを表示
**CSS対応**: `base-menu.css`でスタイル統合

#### 🛒 購入ボタン `{PurchaseButton}`
**場所**: 行番号 431, 438
```html
{block:HasItemStock}
    {PurchaseButton}
{/block:HasItemStock}
```
**機能**: BASE標準の購入ボタンを表示
**条件分岐**: 在庫状況に応じて表示制御

### 2. BASE Apps統合

#### 🔍 検索機能 `{block:AppsSearch}`
**場所**: 行番号 15-17, 78-84
```html
<!-- ヘッダー内CSS読み込み -->
{block:AppsSearch}
    <link rel="stylesheet" type="text/css" href="{BASEURL}/search/css/shopTemplate/search.css?{UpdateTime}">
{/block:AppsSearch}

<!-- 検索フォーム -->
{block:AppsSearch}
    <div class="mb4">
        <form role="search" method="get" class="search-form" action="{SearchPageURL}">
            <input type="search" name="q" placeholder="SEARCH" value="{IndexPageSearch}" />
            <input type="submit" value="→" />
        </form>
    </div>
{/block:AppsSearch}
```
**機能**: BASE Search Appとの完全統合
**スタイル**: 外部CSSと連携してデザイン統一

#### 🏷️ アイテムラベル `{block:AppsItemLabel}`
**場所**: 行番号 18-20, 154, 227等
```html
<!-- ヘッダー内設定 -->
{block:AppsItemLabel}
    <link rel="stylesheet" type="text/css" href="{BASEURL}/item_label/css/ShopTemplate/style.css?{UpdateTime}">
    <script type="text/javascript" src="{BASEURL}/item_label/js/ShopTemplate/labelpostion.js?{UpdateTime}"></script>
{/block:AppsItemLabel}

<!-- 商品表示内 -->
{block:AppsItemLabel}
    {AppsItemLabelTag}
{/block:AppsItemLabel}
```
**機能**: 商品ラベル（SALE、NEWなど）の表示

#### 📝 ブログ `{block:AppsBlog}`
**場所**: 行番号 21-23, 96-98
```html
<!-- RSS対応 -->
{block:AppsBlog}
    <link href="{BlogFeedPageURL}" rel="alternate" type="application/rss+xml" title="Blog | {ShopName}">
{/block:AppsBlog}

<!-- ナビゲーション -->
{block:AppsBlog}
    <li><a href="{BlogPageURL}">LOOK BOOK</a></li>
{/block:AppsBlog}
```
**機能**: BASE Blog機能との統合

#### 🌐 多言語対応 `{block:AppsI18n}`
**場所**: 行番号 58-66, 104-109
```html
<!-- 言語切り替え表示 -->
{block:AppsI18n}
    <div class="custom-language-switcher">
        <a href="#" onclick="switchLanguage('ja'); return false;" id="lang-ja" class="active">JA</a>
        <a href="#" onclick="switchLanguage('en'); return false;" id="lang-en">EN</a>
    </div>
{/block:AppsI18n}
```
**機能**: 日本語・英語の言語切り替え
**JavaScript連携**: `language-manager.js`で制御

### 3. 商品データとBASE構文

#### 💰 価格表示の条件分岐
**場所**: 行番号 183-194, 378-389等
```html
<!-- 通常価格 -->
{block:NoItemProperPrice}
    <span class="current-price">{ItemPrice}</span>
{/block:NoItemProperPrice}

<!-- セール価格 -->
{block:HasItemProperPrice}
    <div class="price-sale">
        <span class="original-price">{ItemProperPrice}</span>
        <span class="sale-price">{ItemPrice}</span>
        <span class="discount-rate">{ItemDiscountRate}</span>
    </div>
{/block:HasItemProperPrice}
```
**機能**: セール状況に応じた価格表示の自動切り替え

#### 📦 在庫状況による表示制御
**場所**: 行番号 156-171, 425-448等
```html
<!-- 在庫あり・販売中 -->
{block:HasItemStock}
    {block:ItemNowOnSale}
        {PurchaseButton}
    {/block:ItemNowOnSale}
{/block:HasItemStock}

<!-- 在庫なし -->
{block:NoItemStock}
    <div class="soldout_cover"><p>SOLD OUT</p></div>
{/block:NoItemStock}
```
**機能**: 在庫状況と販売ステータスによる表示の自動制御

### 4. 商品画像ギャラリーの実装

#### 🖼️ 商品画像データの埋め込み
**場所**: 行番号 231-242
```html
<!-- 画像データを埋め込む隠し要素 -->
<div id="imageData" style="display: none;">
    {block:ItemImage1}<span data-main="{ItemImage1URL-640}" data-thumb="{ItemImage1URL-174}"></span>{/block:ItemImage1}
    {block:ItemImage2}<span data-main="{ItemImage2URL-640}" data-thumb="{ItemImage2URL-174}"></span>{/block:ItemImage2}
    <!-- ... ItemImage10まで -->
</div>
```
**機能**: BASEの商品画像を外部JavaScriptライブラリで処理
**連携**: `product-gallery.js`で高度なギャラリー機能を実装

#### 🎨 ギャラリーコンテナ
**場所**: 行番号 244-262
```html
<div class="main-image-wrapper" id="mainImageWrapper">
    <div class="main-image-container" id="mainImageContainer"></div>
    <button class="carousel-nav prev" id="prevBtn"><!-- SVGアイコン --></button>
    <button class="carousel-nav next" id="nextBtn"><!-- SVGアイコン --></button>
    <div class="image-counter" id="imageCounter"></div>
</div>
```
**機能**: 外部JavaScriptによる高度な画像ギャラリー

---

## 📱 レスポンシブ対応とBASE統合

### 1. モバイルファースト設計
```html
<!-- デスクトップ・モバイル画像の自動切り替え -->
<img src="..." alt="..." class="hero-image-desktop">
<img src="..." alt="..." class="hero-image-mobile">
```

### 2. レスポンシブ制御JavaScript
**場所**: 行番号 754-773
```javascript
function initResponsiveProductDetail() {
    const productDetail = document.querySelector('.product-detail');
    if (!productDetail) return;
    
    function updateLayout() {
        const isDesktop = window.innerWidth >= 1024;
        
        if (isDesktop) {
            productDetail.classList.add('desktop-layout');
            productDetail.classList.remove('mobile-layout');
        } else {
            productDetail.classList.add('mobile-layout');
            productDetail.classList.remove('desktop-layout');
        }
    }
    
    updateLayout();
    window.addEventListener('resize', updateLayout);
}
```

---

## 🚀 外部ライブラリアーキテクチャ

### 1. CSS外部化（Phase 1-5）
```html
<!-- Phase 1: 基盤CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css">

<!-- Phase 2: コンポーネントCSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/components-bundle.min.css">

<!-- Phase 3: 商品関連CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/product-detail-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/forms-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/responsive-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/footer-pages-bundle.min.css">

<!-- Phase 4: 特殊機能CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/special-pages-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/ui-components-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/base-integration-bundle.min.css">

<!-- Phase 5: 残存スタイル -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/remaining-styles-bundle.min.css">
```

### 2. JavaScript外部化（4段階）
```html
<!-- Core: 基盤機能 -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core.min.js"></script>

<!-- Extended: 拡張機能 -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/extended.min.js"></script>

<!-- Advanced: 高度機能 -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/advanced.min.js"></script>

<!-- Final: 最終機能 -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/final.min.js"></script>
```

### 3. グローバル変数とAPI
```javascript
// Core Bundle提供
window.HolyLabelDOMUtils
window.HolyLabelPageState
window.HolyLabelAnimationConfig

// Extended Bundle提供
window.HolyLabelNavigationManager
window.HolyLabelAnimationManager
window.HolyLabelModalUtils

// Advanced Bundle提供
window.HolyLabelProductImageGallery
window.HolyLabelLoadMoreManager
window.HolyLabelLogoManager

// Final Bundle提供
window.HolyLabelInitializationManager
window.HolyLabelLanguageManager
window.HolyLabelScrollManager
```

---

## ⚙️ BASE仕様準拠チェックポイント

### 1. 必須チェック項目
- ✅ HTMLファイルサイズ: 35.1KB/150KB（23.4%使用）
- ✅ BASEテンプレート構文: 完全保持
- ✅ BASE Apps対応: Search、ItemLabel、Blog、I18n
- ✅ レスポンシブ対応: モバイルファースト設計
- ✅ 外部ライブラリ: jsDelivr CDN経由で配信

### 2. 禁止事項
- ❌ BASEテンプレート構文（`{}`）の削除・変更
- ❌ 外部ライブラリパスの変更
- ❌ グローバル変数名の変更
- ❌ BASE標準タグの除去

### 3. 安全な変更範囲
- ✅ 画像URLの変更（src属性内のみ）
- ✅ テキストコンテンツの変更
- ✅ ソーシャルリンクの変更（href属性内のみ）
- ✅ alt属性の変更

---

## 🔧 開発・メンテナンス手順

### 1. ソースファイル編集時
```bash
# JavaScript編集
cd js/src
# ファイル編集後
cd .. && npm run build

# CSS編集
cd css/src  
# ファイル編集後
cd .. && npm run build
```

### 2. BASE機能テスト
```javascript
// ブラウザコンソールでテスト
console.log('Core:', !!window.HolyLabelDOMUtils);
console.log('Extended:', !!window.HolyLabelNavigationManager);
console.log('Advanced:', !!window.HolyLabelProductImageGallery);
console.log('Final:', !!window.HolyLabelInitializationManager);

// 個別機能テスト
HolyLabelNavigationManager.toggleMenu();
HolyLabelProductImageGallery.init();
```

### 3. デプロイチェックリスト
- [ ] BASEテンプレート構文の完全性確認
- [ ] 外部ライブラリの読み込み確認
- [ ] レスポンシブ表示確認
- [ ] BASE Apps機能確認
- [ ] 商品データ表示確認

---

## 📚 関連ドキュメント

- `CUSTOMER-GUIDE.md`: 顧客向け編集ガイド
- `MAINTENANCE.md`: 開発者向けメンテナンスガイド
- `CDN-REFERENCE.md`: CDN設定リファレンス
- `TROUBLESHOOTING.md`: 問題解決ガイド

---

**⚠️ 重要**: BASE機能との統合部分は慎重に扱い、変更時は必ず開発環境での十分なテストを実施してください。 