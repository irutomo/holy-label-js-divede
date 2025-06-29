# 🔧 HOLY LABEL 外部ライブラリ メンテナンスガイド

本ガイドでは、HOLY LABEL外部ライブラリの現在の仕様と、今後の編集・メンテナンス方法について詳細に説明します。

## 📋 現在の外部ライブラリ仕様

### アーキテクチャ概要

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ HTMLファイル     │───▶│ jsDelivr CDN     │───▶│ 圧縮ライブラリ    │
│ (90.8KB)        │    │                  │    │ JS:13.7KB       │
│                 │    │                  │    │ CSS:35.1KB      │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         ↑                       ↑                       ↑
    メインHTML               GitHubリポジトリ           ビルドシステム
   最小限の初期化            自動CDN反映              自動圧縮・最適化
```

### ファイル構成

#### プロジェクト全体構成
```
holy-label-js-divede/
├── 📄 holy-label-js-divede.html       # メインHTMLファイル（90.8KB）
├── 📁 js/                             # JavaScript外部化
│   ├── 📁 src/                        # ソースファイル（12ファイル）
│   ├── 📁 dist/                       # 圧縮済みライブラリ（25ファイル）
│   ├── 📁 config/                     # ビルド設定
│   ├── 📄 build.js                    # ビルドスクリプト
│   └── 📄 package.json                # 依存関係
├── 📁 css/                            # CSS外部化  
│   ├── 📁 src/                        # ソースファイル（12ファイル）
│   ├── 📁 dist/                       # 圧縮済みライブラリ（21ファイル）
│   ├── 📁 config/                     # ビルド設定
│   ├── 📄 build.js                    # ビルドスクリプト
│   └── 📄 package.json                # 依存関係
├── 📁 docs/                           # プロジェクトドキュメント
│   ├── 📄 CDN-REFERENCE.md            # CDNリファレンス
│   ├── 📄 CHANGELOG.md                # 変更履歴
│   ├── 📄 IMPLEMENTATION.md           # 実装ガイド
│   ├── 📄 TROUBLESHOOTING.md          # トラブルシューティング
│   ├── 📄 USAGE.md                    # 使い方ガイド
│   └── 📄 MAINTENANCE.md              # 本ファイル
└── 📄 README.md                       # プロジェクト概要
```

#### JavaScript ライブラリ構成
```
js/
├── src/                               # ソースファイル
│   ├── dom-utils.js                   # DOM操作（Core Bundle）
│   ├── page-state.js                  # ページ状態管理（Core Bundle）
│   ├── animation-config.js            # アニメーション設定（Core Bundle）
│   ├── animation-manager.js           # アニメーション管理（Extended Bundle）
│   ├── navigation-manager.js          # ナビゲーション管理（Extended Bundle）
│   ├── modal-utils.js                 # モーダル機能（Extended Bundle）
│   ├── product-gallery.js             # 商品ギャラリー（Advanced Bundle）
│   ├── loadmore-manager.js            # Ajax読み込み（Advanced Bundle）
│   ├── logo-manager.js                # ロゴ管理（Advanced Bundle）
│   ├── initialization-manager.js      # 初期化管理（Final Bundle）
│   ├── language-manager.js            # 多言語管理（Final Bundle）
│   └── scroll-manager.js              # スクロール管理（Final Bundle）
└── dist/                              # 圧縮済みライブラリ
    ├── 【個別ライブラリ】
    │   ├── dom-utils.min.js
    │   ├── page-state.min.js
    │   └── ... （各ソースファイルに対応）
    └── 【バンドルライブラリ】
        ├── core-bundle.min.js         # Phase 1: 基盤機能
        ├── extended-bundle.min.js     # Phase 2: 拡張機能
        ├── advanced-bundle.min.js     # Phase 3: 高度機能
        └── final-bundle.min.js        # Phase 4: 最終機能
```

#### CSS ライブラリ構成
```
css/
├── src/                               # ソースファイル
│   ├── foundation.css                 # 基本スタイル（Foundation Bundle）
│   ├── layout.css                     # レイアウト（Foundation Bundle）
│   ├── base-menu.css                  # メニュー（Components Bundle）
│   ├── product-components.css         # 商品コンポーネント（Components Bundle）
│   ├── animations.css                 # アニメーション（Components Bundle）
│   ├── product-detail.css             # 商品詳細（Product Bundle）
│   ├── forms.css                      # フォーム（Product Bundle）
│   ├── responsive.css                 # レスポンシブ（Product Bundle）
│   ├── footer-pages.css               # フッター（Product Bundle）
│   ├── special-pages.css              # 特殊ページ（Special Bundle）
│   ├── ui-components.css              # UIコンポーネント（Special Bundle）
│   └── base-integration.css           # BASE統合（Special Bundle）
└── dist/                              # 圧縮済みライブラリ
    ├── 【個別ライブラリ】
    │   ├── foundation.min.css
    │   ├── layout.min.css
    │   └── ... （各ソースファイルに対応）
    └── 【バンドルライブラリ】
        ├── foundation-bundle.min.css  # Phase 1: 基盤スタイル
        ├── components-bundle.min.css  # Phase 2: コンポーネント
        ├── product-detail-bundle.min.css  # Phase 3: 商品関連（その1）
        ├── forms-bundle.min.css       # Phase 3: 商品関連（その2）
        ├── responsive-bundle.min.css  # Phase 3: 商品関連（その3）
        ├── footer-pages-bundle.min.css    # Phase 3: 商品関連（その4）
        ├── special-pages-bundle.min.css   # Phase 4: 特殊機能（その1）
        ├── ui-components-bundle.min.css   # Phase 4: 特殊機能（その2）
        └── base-integration-bundle.min.css # Phase 4: 特殊機能（その3）
```

### 依存関係とライブラリの読み込み順序

#### JavaScript 依存関係
```
Core Bundle (基盤)
├── dom-utils.js          # DOM操作の基盤
├── page-state.js         # ページ判定の基盤
└── animation-config.js   # アニメーション設定の基盤
    ↓
Extended Bundle (拡張) - Core Bundleに依存
├── animation-manager.js  # animation-configに依存
├── navigation-manager.js # dom-utils、page-stateに依存
└── modal-utils.js        # dom-utilsに依存
    ↓
Advanced Bundle (高度) - Core, Extended Bundleに依存
├── product-gallery.js   # dom-utils、animation-managerに依存
├── loadmore-manager.js   # dom-utilsに依存
└── logo-manager.js       # page-stateに依存
    ↓
Final Bundle (最終) - 全Bundleに依存
├── initialization-manager.js  # 全ライブラリの初期化管理
├── language-manager.js         # dom-utilsに依存
└── scroll-manager.js           # dom-utils、animation-managerに依存
```

#### CSS 依存関係
```
Foundation Bundle (基盤)
├── foundation.css        # CSSリセット、基本設定
└── layout.css           # 基本レイアウト
    ↓
Components Bundle (コンポーネント) - Foundation Bundleの後に読み込み
├── base-menu.css         # メニューコンポーネント
├── product-components.css # 商品関連コンポーネント
└── animations.css        # アニメーション定義
    ↓
Product Bundle (商品関連) - Foundation, Components Bundleの後に読み込み
├── product-detail.css    # 商品詳細ページ
├── forms.css             # フォーム要素
├── responsive.css        # レスポンシブ対応
└── footer-pages.css      # フッター・ページ要素
    ↓
Special Bundle (特殊機能) - 全Bundleの後に読み込み
├── special-pages.css     # 特殊ページ（LOOKBOOK等）
├── ui-components.css     # 高度UIコンポーネント
└── base-integration.css  # BASE固有機能統合
```

## 🛠 編集・メンテナンス手順

### 1. 開発環境セットアップ

#### 必要な環境
- **Node.js**: v14.0.0以上
- **npm**: v6.0.0以上
- **Git**: バージョン管理用

#### 初期セットアップ
```bash
# リポジトリクローン
git clone https://github.com/irutomo/holy-label-js-divede.git
cd holy-label-js-divede

# JavaScript依存関係インストール
cd js
npm install

# CSS依存関係インストール
cd ../css
npm install

# プロジェクトルートに戻る
cd ..
```

### 2. ソースファイル編集

#### JavaScript編集
```bash
# 例: ナビゲーション機能を修正
vim js/src/navigation-manager.js

# ファイル保存後、ビルド実行
cd js
npm run build

# 圧縮済みファイルが更新される
ls dist/  # extended-bundle.min.js が更新される
```

#### CSS編集
```bash
# 例: 商品詳細スタイルを修正
vim css/src/product-detail.css

# ファイル保存後、ビルド実行
cd css
npm run build

# 圧縮済みファイルが更新される
ls dist/  # product-detail-bundle.min.css が更新される
```

### 3. ビルドプロセス詳細

#### JavaScript ビルド設定
```javascript
// js/build.js の主要処理
const terser = require('terser');

// 1. ソースファイル読み込み
// 2. BASEテンプレート構文除去
// 3. コード圧縮 (Terser)
// 4. バンドルファイル生成
// 5. 個別ライブラリファイル生成

// 圧縮オプション
const terserOptions = {
  compress: {
    drop_console: false,  // console.logを保持
    drop_debugger: true,
    dead_code: true
  },
  mangle: {
    reserved: ['window', 'document', 'HolyLabel*']  // グローバル変数名保持
  }
};
```

#### CSS ビルド設定
```javascript
// css/build.js の主要処理
const postcss = require('postcss');
const cssnano = require('cssnano');

// 1. ソースファイル読み込み
// 2. BASEテンプレート構文除去
// 3. PostCSS処理（プレフィックス追加等）
// 4. CSS圧縮 (cssnano)
// 5. バンドルファイル生成
// 6. 個別ライブラリファイル生成

// 圧縮オプション
const cssnanoOptions = {
  preset: ['default', {
    discardComments: { removeAll: true },
    normalizeWhitespace: true,
    minifySelectors: false  // セレクタ名を保持
  }]
};
```

### 4. テスト・検証手順

#### ローカル検証
```bash
# 1. ビルド実行
cd js && npm run build
cd ../css && npm run build

# 2. HTMLファイルでローカル確認
# holy-label-js-divede.html をブラウザで開く

# 3. 開発者ツールでエラーチェック
# Console: JavaScriptエラーがないか確認
# Network: ファイル読み込み状況確認
# Elements: CSS適用状況確認
```

#### 機能テスト
```javascript
// ブラウザコンソールでテスト実行
// 1. ライブラリ読み込み確認
console.log('Core:', !!window.HolyLabelDOMUtils);
console.log('Extended:', !!window.HolyLabelAnimationManager);
console.log('Advanced:', !!window.HolyLabelProductImageGallery);
console.log('Final:', !!window.HolyLabelInitializationManager);

// 2. 個別機能テスト
HolyLabelNavigationManager.toggleMenu();  // ハンバーガーメニュー
HolyLabelModalUtils.open('test-modal');   // モーダル機能
HolyLabelProductImageGallery.init();      // ギャラリー機能
```

### 5. デプロイ手順

#### GitHubプッシュ→CDN自動反映
```bash
# 1. 変更をステージング
git add .

# 2. コミット（詳細なメッセージを記述）
git commit -m "機能名: 修正内容の詳細

- 具体的な変更点1
- 具体的な変更点2
- テスト結果
- 影響範囲"

# 3. GitHubにプッシュ
git push origin main

# 4. jsDelivr CDNに自動反映（5-10分後）
# https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/
```

#### CDN反映確認
```bash
# CDN反映を確認
curl -I "https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"

# ステータス200、日時が最新であることを確認
```

### 6. バージョン管理

#### ブランチ戦略
```bash
# main ブランチ: 本番用（CDN配信）
# develop ブランチ: 開発用
# feature/* ブランチ: 機能開発用

# 新機能開発
git checkout -b feature/navigation-improvement
# ... 開発作業 ...
git push origin feature/navigation-improvement

# プルリクエスト→レビュー→マージ
```

#### タグ付け（重要な更新時）
```bash
# 重要な更新時はタグを付与
git tag -a v1.1.0 -m "バージョン1.1.0: ハンバーガーメニュー改善"
git push origin v1.1.0

# 特定バージョンでのCDN利用
# https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@v1.1.0/
```

## ⚠️ 編集時の注意事項

### 1. 後方互換性の維持

#### 絶対に変更してはいけない要素
```javascript
// ❌ 関数名・クラス名の変更禁止
window.HolyLabelDOMUtils = { ... };      // 必須：変更禁止
window.HolyLabelPageState = { ... };     // 必須：変更禁止

// ❌ 既存メソッドの削除禁止
HolyLabelNavigationManager.toggleMenu()  // 必須：削除禁止
HolyLabelModalUtils.open()               // 必須：削除禁止
```

#### 安全な変更方法
```javascript
// ✅ メソッドの追加は安全
HolyLabelNavigationManager.newFeature = function() {
  // 新機能追加
};

// ✅ 内部実装の改善は安全
HolyLabelNavigationManager.toggleMenu = function() {
  // 内部実装を改善（インターフェースは同じ）
};
```

### 2. BASE仕様準拠

#### BASEテンプレート構文の完全除去
```javascript
// ❌ BASEテンプレート構文を残さない
{block:IfShowAnimation}
// アニメーション処理
{/block:IfShowAnimation}

// ✅ プレーンJavaScriptに変換
if (document.body.classList.contains('animation-enabled')) {
  // アニメーション処理
}
```

#### CSS クラス名の保持
```css
/* ✅ BASE標準のクラス名は必ず保持 */
.product-item { ... }
.cart-button { ... }
.shop-nav { ... }
```

### 3. パフォーマンス配慮

#### ファイルサイズ制限
- **JavaScript単一バンドル**: 5KB以下推奨
- **CSS単一バンドル**: 10KB以下推奨
- **全体合計**: 50KB以下維持

#### 圧縮効率の確認
```bash
# ビルド後にファイルサイズ確認
cd js/dist && ls -lah *.min.js
cd ../../css/dist && ls -lah *.min.css

# 50KB超過の場合は追加最適化が必要
```

### 4. 依存関係管理

#### 外部ライブラリ追加時の注意
```javascript
// ❌ 重いライブラリの追加禁止
// jQuery、lodash、moment.js 等の大きなライブラリ

// ✅ 軽量・必要最小限の機能のみ
// ネイティブJavaScript実装を優先
```

#### Node.js 依存関係更新
```bash
# 定期的な依存関係更新（月1回推奨）
cd js
npm audit fix
npm update

cd ../css
npm audit fix
npm update
```

## 📊 運用・監視

### 1. パフォーマンス監視

#### 定期監視項目（週1回）
```bash
# CDN応答時間チェック
curl -w "@curl-format.txt" -o /dev/null -s "https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"

# ファイルサイズ監視
curl -sI "https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css" | grep content-length
```

#### PageSpeed Insights監視
```
https://pagespeed.web.dev/
- 月1回、メインページのスコア確認
- Core Web Vitals の確認
- 推奨事項の実装検討
```

### 2. エラー監視

#### JavaScript エラー収集
```javascript
// エラー監視コード（HTMLファイルに追加検討）
window.addEventListener('error', function(e) {
  console.error('HOLY LABEL Error:', {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno
  });
  
  // 必要に応じてエラー報告サービスに送信
});
```

### 3. 使用状況分析

#### jsDelivr 統計確認
```
https://www.jsdelivr.com/package/gh/irutomo/holy-label-js-divede
- 月間ダウンロード数
- 地域別アクセス状況
- 人気ファイルランキング
```

## 🚀 今後の改善計画

### 短期計画（1-3ヶ月）
- [ ] **圧縮率向上**: より効果的な圧縮アルゴリズム導入
- [ ] **エラーハンドリング強化**: より詳細なエラー情報収集
- [ ] **ドキュメント充実**: 開発者向けAPIドキュメント作成

### 中期計画（3-6ヶ月）
- [ ] **HTTP/2プッシュ対応**: より高速な読み込み実現
- [ ] **WebAssembly化検討**: 重い処理の高速化
- [ ] **自動テスト導入**: CI/CDパイプライン構築

### 長期計画（6ヶ月以上）
- [ ] **モジュールバンドラー導入**: Webpack/Rollup検討
- [ ] **TypeScript移行**: 型安全性の向上
- [ ] **Progressive Web App対応**: オフライン機能追加

## 📋 チェックリスト

### 編集前チェック
- [ ] ソースファイルのバックアップ作成
- [ ] 現在のバージョンの動作確認
- [ ] 依存関係の確認

### 編集後チェック
- [ ] ビルドエラーがないか確認
- [ ] ファイルサイズが制限内か確認
- [ ] 全機能の動作テスト実行
- [ ] ブラウザ間互換性確認
- [ ] コンソールエラーがないか確認

### デプロイ前チェック
- [ ] テスト環境での最終確認
- [ ] コミットメッセージの詳細記述
- [ ] 影響範囲の文書化
- [ ] ロールバック手順の確認

### デプロイ後チェック
- [ ] CDN反映確認（5-10分後）
- [ ] 本番環境での動作確認
- [ ] パフォーマンス指標確認
- [ ] エラー監視設定確認

---

## 📞 サポート・連絡先

### 技術的問題
- **GitHub Issues**: https://github.com/irutomo/holy-label-js-divede/issues
- **ドキュメント**: `/docs` フォルダ内の各種ガイド

### 緊急時連絡
- **緊急度高**: GitHub Issuesで`urgent`ラベル付与
- **CDN障害**: jsDelivr公式ステータス確認

---

**HOLY LABEL外部ライブラリ** - BASEテーマの未来を支える技術基盤 