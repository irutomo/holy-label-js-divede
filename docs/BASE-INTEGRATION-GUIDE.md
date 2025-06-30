# 🔗 HOLY LABEL BASE機能統合ガイド

**BASE ECプラットフォーム機能とHTML実装の完全マッピング資料**

## 📋 BASE機能統合アーキテクチャ

### 🏗️ BASE準拠 外部ライブラリ構成

```
┌─────────────────────────────────────────────────────────────┐
│                    BASE ECテーマ仕様                        │
│  HTML: 35.1KB (150KB制限の23.4%使用)                      │
│  BASEテンプレート構文: 完全保持                             │
│  外部ライブラリ: jsDelivr CDN経由                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 外部ライブラリアーキテクチャ                │
│                                                             │
│  📁 CSS外部化 (59.8KB)                                     │
│  ├── Phase 1: Foundation Bundle (基盤CSS)                  │
│  ├── Phase 2: Components Bundle (コンポーネント)           │
│  ├── Phase 3: Product Bundle (商品関連・4分割)             │
│  ├── Phase 4: Special Bundle (特殊機能・4分割)             │
│  └── Phase 5: Remaining Styles (HTMLから分離)              │
│                                                             │
│  📁 JavaScript外部化 (80.3KB)                              │
│  ├── Core Bundle (基盤JS)                                  │
│  ├── Extended Bundle (拡張機能)                            │
│  ├── Advanced Bundle (高度機能)                            │
│  └── Final Bundle (最終機能)                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 BASEテンプレート構文マッピング

### 📱 BASE標準タグ

#### 🏪 ショップ基本情報
```html
{LogoTag}                    → ショップロゴの自動表示
{BASEMenuTag}               → BASE標準メニューの埋め込み
{ShopName}                  → ショップ名の動的表示
{PageTitle}                 → ページタイトルの自動生成
{CanonicalTag}              → SEO用canonical URLの自動生成
{FaviconTag}                → ファビコンの自動設定
{BackgroundTag}             → 背景画像の自動適用
{GoogleAnalyticsTag}        → GA4タグの自動埋め込み
```

#### 📄 ページ判定・制御
```html
{block:IndexPage}           → ホームページでのみ表示
{block:ItemPage}            → 商品詳細ページでのみ表示
{block:AboutPage}           → Aboutページでのみ表示
{block:ContactPage}         → お問い合わせページでのみ表示
{block:BlogPage}            → ブログページでのみ表示
{block:LawPage}             → 特定商取引法ページでのみ表示
{block:PrivacyPage}         → プライバシーポリシーページでのみ表示

{block:NotIndexPage}        → ホームページ以外で表示
{block:NotItemPage}         → 商品詳細ページ以外で表示
{block:NotLoadItemsPage}    → Ajax読み込みページ以外で表示
{block:LoadItemsPage}       → Ajax読み込みページでのみ表示
```

#### 🛍️ 商品データ（自動表示・編集不可）
```html
{ItemTitle}                 → 商品タイトル
{ItemPrice}                 → 商品価格
{ItemProperPrice}           → 商品定価（セール時）
{ItemDiscountRate}          → 割引率
{ItemPageURL}               → 商品詳細ページURL
{ItemImage1URL-500}         → 商品画像1（500pxサイズ）
{ItemImage1URL-640}         → 商品画像1（640pxサイズ）
{ItemNoImageURL}            → 商品画像なし時のデフォルト画像

{block:ItemImage1}          → 商品画像1がある場合のみ表示
{block:NoItemImage1}        → 商品画像1がない場合のみ表示
{block:HasItemProperPrice}  → セール価格がある場合のみ表示
{block:NoItemProperPrice}   → セール価格がない場合のみ表示
{block:NoItemStock}         → 在庫切れの場合のみ表示
{block:ItemEndOfSale}       → 販売終了の場合のみ表示
{block:ItemNowOnSale}       → 販売中の場合のみ表示
```

#### 📃 ページコンテンツ（管理画面で編集）
```html
{PageContents}              → 各ページの本文内容（管理画面で編集）
{IndexPageURL}              → ホームページURL
{AboutPageURL}              → AboutページURL
{ContactPageURL}            → お問い合わせページURL
{PrivacyPageURL}            → プライバシーポリシーページURL
{LawPageURL}                → 特定商取引法ページURL
{BlogPageURL}               → ブログページURL
{SearchPageURL}             → 検索ページURL
```

### 🧩 BASE Apps統合機能

#### 🔍 Search App（検索機能）
```html
{block:AppsSearch}
    <link rel="stylesheet" type="text/css" href="{BASEURL}/search/css/shopTemplate/search.css?{UpdateTime}">
{/block:AppsSearch}

<!-- 検索フォーム -->
<form role="search" method="get" class="search-form" action="{SearchPageURL}">
    <input type="search" name="q" placeholder="SEARCH" value="{IndexPageSearch}" />
    <input type="submit" value="→" />
</form>

{block:IndexPageSearch}     → 検索結果ページでのみ表示
{IndexPageSearch}           → 検索キーワード
{lang:ItemSearchResult}     → 「検索結果」の多言語対応テキスト
{lang:NoItemsMessage}       → 「商品がありません」の多言語対応テキスト
```

#### 🏷️ ItemLabel App（商品ラベル）
```html
{block:AppsItemLabel}
    <link rel="stylesheet" type="text/css" href="{BASEURL}/item_label/css/ShopTemplate/style.css?{UpdateTime}">
    <script type="text/javascript" src="{BASEURL}/item_label/js/ShopTemplate/labelpostion.js?{UpdateTime}"></script>
{/block:AppsItemLabel}

<!-- 商品ラベル表示 -->
{block:AppsItemLabel}
    {AppsItemLabelTag}      → 「NEW」「SALE」「SOLD OUT」等のラベル
{/block:AppsItemLabel}
```

#### 📝 Blog App（ブログ機能）
```html
{block:AppsBlog}
    <link href="{BlogFeedPageURL}" rel="alternate" type="application/rss+xml" title="Blog | {ShopName}">
{/block:AppsBlog}

{block:AppsBlog}
    <li><a href="{BlogPageURL}">LOOK BOOK</a></li>
{/block:AppsBlog}

{BlogFeedPageURL}           → RSSフィードURL
```

#### 🌐 I18n App（多言語対応）
```html
{block:AppsI18n}
    {AppsI18nTag}           → 多言語切り替えタグ
{/block:AppsI18n}

<!-- カスタム多言語スイッチャー -->
<div class="custom-language-switcher">
    <a href="#" onclick="switchLanguage('ja'); return false;" id="lang-ja" class="active">JA</a>
    <a href="#" onclick="switchLanguage('en'); return false;" id="lang-en">EN</a>
</div>

{lang:NotShopPublicMessage} → 「準備中」の多言語メッセージ
{lang:ItemSearchResult}     → 「検索結果」の多言語メッセージ
{lang:NoItemsMessage}       → 「商品なし」の多言語メッセージ
```

#### 🔔 InformationBanner App（お知らせバナー）
```html
{block:AppsInformationBanner}
    {AppsInformationBannerTag}
    <script type="text/javascript">
        // バナーの高さ調整JavaScript
        window.addEventListener('DOMContentLoaded', function() {
            const banner = document.getElementsByClassName('informationBanner');
            if (!banner || banner.length === 0) return;
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const bannerHeight = entry.target.offsetHeight;
                    document.documentElement.style.setProperty("--information-banner-height", bannerHeight + 'px');
                }
            });
            resizeObserver.observe(banner[0]);
        });
    </script>
{/block:AppsInformationBanner}
```

#### 📁 ItemCategory App（カテゴリ機能）
```html
{block:AppsItemCategory}
    {block:BreadcrumbTag}
        <div class="breadcrumb-container">
            {BreadcrumbTag}     → パンくずナビ
        </div>
    {/block:BreadcrumbTag}
    
    <!-- カテゴリ一覧 -->
    {block:AppsItemCategoryCategories}
        <li><a href="{AppsItemCategoryCategoryPageURL}">{AppsItemCategoryCategoryName}</a></li>
        {block:HasAppsItemCategoryMediumCategories}
            {block:AppsItemCategoryMediumCategories}
                <li class="sub-category"><a href="{AppsItemCategoryMediumCategoryPageURL}">{AppsItemCategoryMediumCategoryName}</a></li>
            {/block:AppsItemCategoryMediumCategories}
        {/block:HasAppsItemCategoryMediumCategories}
    {/block:AppsItemCategoryCategories}
    
    <!-- 子カテゴリ -->
    {block:HasAppsItemCategoryChildCategories}
        <div class="child-categories">
            <ul class="child-category-list">
                {block:AppsItemCategoryChildCategories}
                    <li><a href="{AppsItemCategoryChildCategoryPageURL}">{AppsItemCategoryChildCategoryName}</a></li>
                {/block:AppsItemCategoryChildCategories}
            </ul>
        </div>
    {/block:HasAppsItemCategoryChildCategories}
{/block:AppsItemCategory}

{IndexPageCategory}         → 現在のカテゴリ名
{block:IndexPageCategory}   → カテゴリページでのみ表示
{block:NoIndexPageCategory} → カテゴリページ以外で表示
```

## 🎨 HTMLクラス名とCSS対応

### 🏠 ページ別bodyクラス
```html
<body id="shopTopPage" class="shop template loading">      ← ホームページ
<body id="shopDetailPage" class="shop template loading">   ← 商品詳細ページ
```

### 📱 レスポンシブ対応クラス
```css
.hero-image-desktop    → デスクトップ用画像（1024px以上で表示）
.hero-image-mobile     → モバイル用画像（1023px以下で表示）
.desktop-layout        → デスクトップ用レイアウト
.mobile-layout         → モバイル用レイアウト
```

### 🧩 コンポーネントクラス
```css
.product-item          → 商品アイテム
.product-image         → 商品画像コンテナ
.product-info          → 商品情報
.product-title         → 商品タイトル
.product-price         → 商品価格
.out-of-stock          → 在庫切れ状態
.soldout_cover         → 売り切れカバー
.price-sale            → セール価格表示
.original-price        → 元の価格
.sale-price            → セール価格
.discount-rate         → 割引率
```

### 🎯 ナビゲーション関連
```css
.humberger             → ハンバーガーメニューボタン
.header__nav-area      → ナビゲーションエリア
.global-navigation__list → グローバルナビゲーションリスト
.expand                → 展開可能メニュー
.ex-list               → 展開されるリスト
.sub-category          → サブカテゴリ
.no-category-message   → カテゴリなしメッセージ
```

### 🎨 スタイル状態クラス
```css
.-active               → アクティブ状態
.loaded                → 読み込み完了状態
.body-fixed            → ボディ固定状態（メニュー開時）
.loading               → 読み込み中状態
.home-page             → ホームページ判定クラス
```

## 🔗 外部ライブラリ統合

### 📦 CSS外部ライブラリ読み込み順序
```html
<!-- Phase 1: 基盤CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css">

<!-- Phase 2: コンポーネントCSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/components-bundle.min.css">

<!-- Phase 3: 商品詳細・フォーム・レスポンシブ・フッター -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/product-detail-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/forms-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/responsive-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/footer-pages-bundle.min.css">

<!-- Phase 4: 特殊ページ・UI・統合機能 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/special-pages-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/ui-components-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/base-integration-bundle.min.css">

<!-- Phase 5: 残存スタイル -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/remaining-styles-bundle.min.css">
```

### 📦 JavaScript外部ライブラリ読み込み順序
```html
<!-- External JavaScript Libraries -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/extended.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/advanced.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/final.min.js"></script>
```

### 🔧 JavaScript グローバル変数（後方互換性維持）
```javascript
window.HolyLabelDOMUtils              → DOM操作ユーティリティ
window.HolyLabelPageState             → ページ状態管理
window.HolyLabelAnimationConfig       → アニメーション設定
window.HolyLabelAnimationManager      → アニメーション管理
window.HolyLabelNavigationManager     → ナビゲーション管理
window.HolyLabelModalUtils            → モーダル機能
window.HolyLabelProductGallery        → 商品ギャラリー（商品詳細用）
window.HolyLabelLoadMoreManager       → Ajax読み込み管理
window.HolyLabelLogoManager           → ロゴ管理
window.HolyLabelInitializationManager → 初期化管理
window.HolyLabelLanguageManager       → 多言語管理
window.HolyLabelScrollManager         → スクロール管理
```

## 🎯 BASE仕様準拠チェックポイント

### ✅ 必須準拠項目
- [ ] **ファイルサイズ**: HTML 150,000文字以内
- [ ] **BASEテンプレート構文**: `{}`構文の完全保持
- [ ] **BASE標準タグ**: LogoTag、BASEMenuTag等の適切な使用
- [ ] **外部ライブラリ**: CDN読み込みの正常動作
- [ ] **レスポンシブ**: モバイル・デスクトップ対応
- [ ] **BASE Apps**: 検索、ラベル、ブログ、多言語対応

### ⚠️ 注意事項
- [ ] **BASEテンプレート構文**: 絶対に変更・削除禁止
- [ ] **外部ライブラリパス**: CDNパスの変更禁止
- [ ] **グローバル変数名**: `window.HolyLabel*`の変更禁止
- [ ] **HTMLタグ構造**: BASE必須構造の保持
- [ ] **CSSクラス名**: BASE連携クラスの保持

## 🔄 開発・メンテナンス手順

### 1. 開発環境
```bash
# JavaScript依存関係
cd js && npm install

# CSS依存関係  
cd css && npm install
```

### 2. ビルド・配信
```bash
# JavaScript圧縮・バンドル
cd js && npm run build

# CSS圧縮・バンドル
cd css && npm run build

# GitHubプッシュ（jsDelivr CDN自動更新）
git add . && git commit -m "機能更新" && git push origin main
```

### 3. 品質検証
```javascript
// ライブラリ読み込み確認
console.log('Core:', !!window.HolyLabelDOMUtils);
console.log('Navigation:', !!window.HolyLabelNavigationManager);
console.log('Gallery:', !!window.HolyLabelProductGallery);

// 機能テスト
HolyLabelNavigationManager.toggleMenu();
HolyLabelModalUtils.open('test-modal');
```

## 📚 関連ドキュメント

- **顧客向け**: `CUSTOMER-GUIDE.md` - 安全な編集ガイド
- **画像編集**: `IMAGE-INSERTION-GUIDE.md` - 画像変更専用ガイド
- **メンテナンス**: `MAINTENANCE.md` - 技術者向けメンテナンス
- **CDN参照**: `CDN-REFERENCE.md` - jsDelivr CDNリファレンス
- **実装**: `IMPLEMENTATION.md` - BASE実装詳細
- **トラブル**: `TROUBLESHOOTING.md` - 問題解決法 