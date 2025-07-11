# HOLY LABEL 外部ライブラリプロジェクト - Cursor開発ルール

## 🎯 プロジェクト概要
HOLY LABEL BASE専用ECテーマの外部ライブラリ開発プロジェクト
- メインHTML: 35.1KB（BASEの150,000文字制限内）
- 外部JS: 80.3KB（圧縮済み）
- 外部CSS: 59.8KB（圧縮済み）
- CDN配信: jsDelivr経由でGitHub自動連携

## 📁 プロジェクト構造理解（詳細）
```
holy-label-js-divede/
├── 📄 holy-label-js-divede.html           # BASEテーマHTMLファイル（35.1KB/150KB制限）
├── 📁 js/                                # JavaScript外部ライブラリディレクトリ
│   ├── 📁 src/                           # ソースファイル（12ファイル・編集対象）
│   │   ├── 📄 dom-utils.js               # DOM操作基盤（2.0KB・Core Bundle）
│   │   ├── 📄 page-state.js              # ページ状態管理（2.9KB・Core Bundle）
│   │   ├── 📄 animation-config.js        # アニメーション設定（2.9KB・Core Bundle）
│   │   ├── 📄 animation-manager.js       # アニメーション管理（5.7KB・Extended Bundle）
│   │   ├── 📄 navigation-manager.js      # ナビゲーション管理（5.9KB・Extended Bundle）
│   │   ├── 📄 modal-utils.js             # モーダル機能（7.6KB・Extended Bundle）
│   │   ├── 📄 product-gallery.js         # 商品ギャラリー（12KB・Advanced Bundle）
│   │   ├── 📄 loadmore-manager.js        # Ajax読み込み（9.6KB・Advanced Bundle）
│   │   ├── 📄 logo-manager.js            # ロゴ管理（7.0KB・Advanced Bundle）
│   │   ├── 📄 initialization-manager.js  # 初期化管理（6.8KB・Final Bundle）
│   │   ├── 📄 language-manager.js        # 多言語管理（6.1KB・Final Bundle）
│   │   └── 📄 scroll-manager.js          # スクロール管理（7.8KB・Final Bundle）
│   ├── 📁 dist/                          # 圧縮済みライブラリ（29ファイル・自動生成）
│   │   ├── 📁 【個別ライブラリ】（12ファイル）
│   │   │   ├── 📄 dom-utils.min.js       # 個別圧縮版（Core）
│   │   │   ├── 📄 page-state.min.js      # 個別圧縮版（Core）
│   │   │   └── 📄 ... （各ソースに対応）
│   │   ├── 📁 【バンドルライブラリ】（4ファイル）
│   │   │   ├── 📄 core-bundle.min.js     # Phase 1基盤機能バンドル
│   │   │   ├── 📄 extended-bundle.min.js # Phase 2拡張機能バンドル
│   │   │   ├── 📄 advanced-bundle.min.js # Phase 3高度機能バンドル
│   │   │   └── 📄 final-bundle.min.js    # Phase 4最終機能バンドル
│   │   └── 📁 【その他生成ファイル】（13ファイル）
│   │       ├── 📄 build-info-*.json      # ビルド情報
│   │       └── 📄 ... （依存関係ファイル等）
│   ├── 📁 config/                        # ビルド設定ディレクトリ
│   │   └── 📄 js-externalization-plan.yaml # JavaScript外部化設定
│   ├── 📄 build.js                       # Terser圧縮・バンドル生成スクリプト
│   ├── 📄 package.json                   # Node.js依存関係定義
│   └── 📄 package-lock.json              # 依存関係ロックファイル
├── 📁 css/                               # CSS外部ライブラリディレクトリ  
│   ├── 📁 src/                           # ソースファイル（13ファイル・編集対象）
│   │   ├── 📄 foundation.css             # CSS変数・リセット（1.3KB・Foundation Bundle）
│   │   ├── 📄 layout.css                 # レイアウト・ナビ（2.6KB・Foundation Bundle）
│   │   ├── 📄 base-menu.css              # BASEメニュー統合（3.3KB・Components Bundle）
│   │   ├── 📄 product-components.css     # 商品コンポーネント（3.5KB・Components Bundle）
│   │   ├── 📄 animations.css             # アニメーション定義（1.8KB・Components Bundle）
│   │   ├── 📄 product-detail.css         # 商品詳細ページ（8.7KB・Product Bundle）
│   │   ├── 📄 forms.css                  # フォーム要素（3.3KB・Product Bundle）
│   │   ├── 📄 responsive.css             # レスポンシブ対応（5.4KB・Product Bundle）
│   │   ├── 📄 footer-pages.css           # フッター・ページ（4.3KB・Product Bundle）
│   │   ├── 📄 special-pages.css          # 特殊ページ（7.3KB・Special Bundle）
│   │   ├── 📄 ui-components.css          # UIコンポーネント（7.0KB・Special Bundle）
│   │   ├── 📄 base-integration.css       # BASE統合（7.6KB・Special Bundle）
│   │   └── 📄 remaining-styles.css       # HTMLから分離（5.0KB・Special Bundle）
│   ├── 📁 dist/                          # 圧縮済みライブラリ（34ファイル・自動生成）
│   │   ├── 📁 【個別ライブラリ】（13ファイル）
│   │   │   ├── 📄 foundation.min.css     # 個別圧縮版
│   │   │   ├── 📄 layout.min.css         # 個別圧縮版
│   │   │   ├── 📄 remaining-styles.min.css # HTMLから分離圧縮版
│   │   │   └── 📄 ... （各ソースに対応）
│   │   ├── 📁 【バンドルライブラリ】（10ファイル）
│   │   │   ├── 📄 foundation-bundle.min.css      # Phase 1基盤スタイル
│   │   │   ├── 📄 components-bundle.min.css      # Phase 2コンポーネント
│   │   │   ├── 📄 product-detail-bundle.min.css  # Phase 3商品関連（1/4）
│   │   │   ├── 📄 forms-bundle.min.css           # Phase 3商品関連（2/4）
│   │   │   ├── 📄 responsive-bundle.min.css      # Phase 3商品関連（3/4）
│   │   │   ├── 📄 footer-pages-bundle.min.css    # Phase 3商品関連（4/4）
│   │   │   ├── 📄 special-pages-bundle.min.css   # Phase 4特殊機能（1/4）
│   │   │   ├── 📄 ui-components-bundle.min.css   # Phase 4特殊機能（2/4）
│   │   │   ├── 📄 base-integration-bundle.min.css # Phase 4特殊機能（3/4）
│   │   │   └── 📄 remaining-styles-bundle.min.css # Phase 4HTMLから分離
│   │   └── 📁 【その他生成ファイル】（11ファイル）
│   │       ├── 📄 build-info-phase*.json # ビルド情報（各Phase別）
│   │       └── 📄 ... （依存関係ファイル等）
│   ├── 📁 config/                        # ビルド設定ディレクトリ
│   │   └── 📄 css-externalization-plan.yaml # CSS外部化設定
│   ├── 📄 build.js                       # PostCSS・cssnano圧縮スクリプト
│   ├── 📄 package.json                   # PostCSS・cssnano依存関係
│   └── 📄 package-lock.json              # 依存関係ロックファイル
├── 📁 docs/                              # プロジェクトドキュメントディレクトリ
│   ├── 📄 CDN-REFERENCE.md               # jsDelivr CDNリファレンス
│   ├── 📄 CHANGELOG.md                   # バージョン管理・変更履歴
│   ├── 📄 IMPLEMENTATION.md              # BASE実装ガイド
│   ├── 📄 MAINTENANCE.md                 # BASE準拠メンテナンスガイド（本ファイル）
│   ├── 📄 TROUBLESHOOTING.md             # BASE特有問題の解決法
│   ├── 📄 USAGE.md                       # BASE開発者向け使用法
│   └── 📄 HOLY_LABEL_外部ライブラリ_メンテナンスガイド.pdf # 包括的PDF版
├── 📁 BASEノウハウ/                      # BASE開発ノウハウ集ディレクトリ
│   ├── 📄 BASE_テーマ開発ノウハウ.md      # 包括的開発マニュアル
│   ├── 📄 BASE開発_自動化手順書.md        # 効率化・自動化手順
│   ├── 📄 BASE開発学習ドキュメント.md     # 実践的学習資料
│   └── 📄 HOLY_LABEL_メンテナンスマニュアル.md # プロジェクト固有マニュアル
├── 📁 BK/                                # バックアップ・参考資料ディレクトリ
│   ├── 📄 MAINTENANCE.md                 # 旧メンテナンスドキュメント
│   ├── 📄 元の仕様.html                  # 外部化前のオリジナルHTML
│   └── 📄 最新.html                      # 作業中のHTML（参考用）
├── 📁 改修案/                            # 改修計画・設計書ディレクトリ
│   ├── 📄 javascript-externalization-plan.yaml # JavaScript外部化計画
│   ├── 📄 product-detail-redesign-plan.yaml    # 商品詳細ページ改修計画
│   ├── 📄 product-detail-redesign-plan-v2.yaml # 商品詳細ページ改修計画v2
│   └── 📄 商品詳細ページdesktop版.html          # デスクトップ版デザイン案
├── 📄 README.md                          # プロジェクト概要・BASE仕様説明
├── 📄 package.json                       # プロジェクト全体のnpm設定
└── 📄 package-lock.json                  # プロジェクト全体の依存関係ロック
```

## 🏗️ 外部ライブラリアーキテクチャ

### JavaScript ライブラリ階層（依存関係順）
1. **Phase 1: Core Bundle（基盤機能）**
   - dom-utils.js: DOM操作の基盤（2.0KB）
   - page-state.js: ページ状態管理（2.9KB）
   - animation-config.js: アニメーション設定（2.9KB）

2. **Phase 2: Extended Bundle（拡張機能）**
   - animation-manager.js: アニメーション管理（5.7KB）
   - navigation-manager.js: ナビゲーション管理（5.9KB）
   - modal-utils.js: モーダル機能（7.6KB）

3. **Phase 3: Advanced Bundle（高度機能）**
   - product-gallery.js: 商品画像ギャラリー（12KB）
   - loadmore-manager.js: Ajax読み込み（9.6KB）
   - logo-manager.js: ロゴ管理（7.0KB）

4. **Phase 4: Final Bundle（最終機能）**
   - initialization-manager.js: 初期化管理（6.8KB）
   - language-manager.js: 多言語管理（6.1KB）
   - scroll-manager.js: スクロール管理（7.8KB）

### CSS ライブラリ階層（13ソースファイル → 34ファイル配信）
**Foundation Bundle（基盤）**
- foundation.css: CSS変数・リセット（1.3KB）
- layout.css: レイアウト・ナビゲーション（2.6KB）

**Components Bundle（コンポーネント）**
- base-menu.css: BASEメニュー統合（3.3KB）
- product-components.css: 商品コンポーネント（3.5KB）
- animations.css: アニメーション定義（1.8KB）

**Product Bundle（商品関連・4分割）**
- product-detail.css: 商品詳細ページ（8.7KB）
- forms.css: フォーム要素（3.3KB）
- responsive.css: レスポンシブ対応（5.4KB）
- footer-pages.css: フッター・ページ要素（4.3KB）

**Special Bundle（特殊機能・4分割）**
- special-pages.css: 特殊ページ（LOOKBOOK等）（7.3KB）
- ui-components.css: 高度UIコンポーネント（7.0KB）
- base-integration.css: BASE固有機能統合（7.6KB）
- remaining-styles.css: HTMLから分離した残存CSS（5.0KB）

## 💻 開発ルール

### 1. ファイル編集規則

#### JavaScript開発
- **編集対象**: `js/src/` 内のソースファイルのみ
- **禁止**: `js/dist/` 内の圧縮済みファイルの直接編集
- **ビルド必須**: 編集後は必ず `cd js && npm run build` 実行
- **命名規則**: グローバル変数は `window.HolyLabel*` 形式維持

#### CSS開発
- **編集対象**: `css/src/` 内のソースファイルのみ
- **禁止**: `css/dist/` 内の圧縮済みファイルの直接編集
- **ビルド必須**: 編集後は必ず `cd css && npm run build` 実行
- **CSS変数**: foundation.css内の`:root`変数を活用

### 2. 後方互換性維持（重要）

#### 絶対に変更禁止
```javascript
// ❌ 関数名・クラス名の変更禁止
window.HolyLabelDOMUtils
window.HolyLabelPageState
window.HolyLabelNavigationManager
window.HolyLabelAnimationManager
// 以下、全HolyLabel*系のグローバル変数

// ❌ 既存メソッドの削除禁止
HolyLabelNavigationManager.toggleMenu()
HolyLabelModalUtils.open()
HolyLabelProductImageGallery.init()
```

#### 安全な変更方法
```javascript
// ✅ メソッドの追加は安全
HolyLabelNavigationManager.newFeature = function() {
  // 新機能追加
};

// ✅ 内部実装の改善は安全（インターフェース維持）
HolyLabelNavigationManager.toggleMenu = function() {
  // 内部実装を改善
};
```

### 3. BASE仕様準拠

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

### 4. パフォーマンス制限

#### ファイルサイズ制限
- **JavaScript単一バンドル**: 25KB以下推奨
- **CSS単一バンドル**: 10KB以下推奨
- **全体合計**: 200KB以下維持

#### 外部ライブラリ制限
```javascript
// ❌ 重いライブラリの追加禁止
// jQuery、lodash、moment.js 等の大きなライブラリ

// ✅ 軽量・必要最小限の機能のみ
// ネイティブJavaScript実装を優先
```

## 🔧 開発ワークフロー

### 1. セットアップ
```bash
# JavaScript依存関係インストール
cd js && npm install

# CSS依存関係インストール
cd ../css && npm install
```

### 2. 開発サイクル
```bash
# 1. ソースファイル編集
vim js/src/navigation-manager.js

# 2. ビルド実行
cd js && npm run build

# 3. ローカル確認
# holy-label-js-divede.html をブラウザで開く

# 4. 機能テスト（ブラウザコンソール）
HolyLabelNavigationManager.toggleMenu();
```

### 3. デプロイ
```bash
# 1. 変更をステージング
git add .

# 2. 詳細なコミット
git commit -m "機能名: 修正内容の詳細

- 具体的な変更点1
- 具体的な変更点2
- テスト結果
- 影響範囲"

# 3. GitHubにプッシュ
git push origin main

# 4. jsDelivr CDNに自動反映（5-10分後）
```

## 🧪 テスト・検証

### 必須チェック項目
```javascript
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

### ブラウザ確認
- **Console**: JavaScriptエラーがないか確認
- **Network**: ファイル読み込み状況確認
- **Elements**: CSS適用状況確認

## 🚫 注意事項・禁止事項

### 絶対にやってはいけないこと
1. **`dist/`フォルダの直接編集**: 圧縮済みファイルの手動変更
2. **グローバル変数名の変更**: `window.HolyLabel*`の変更
3. **既存メソッドの削除**: 後方互換性破壊
4. **BASEテンプレート構文の残存**: プレーンJSに変換必須
5. **重いライブラリの追加**: ファイルサイズ制限違反

### 推奨事項
1. **段階的機能追加**: 一度に大きな変更をしない
2. **十分なテスト**: 各段階で動作確認
3. **詳細なコミットメッセージ**: 変更内容の明確化
4. **ドキュメント更新**: 重要な変更時はドキュメント更新

## 🎯 開発目標
- **高性能**: 軽量で高速なライブラリ
- **モジュラー**: 独立したコンポーネント設計
- **BASE準拠**: BASE仕様完全対応
- **保守性**: 将来の拡張・修正が容易

## 📚 参考ドキュメント
- `docs/MAINTENANCE.md`: メンテナンスガイド
- `docs/CDN-REFERENCE.md`: CDNリファレンス
- `docs/IMPLEMENTATION.md`: 実装ガイド
- `docs/TROUBLESHOOTING.md`: トラブルシューティング

## 🔍 Cursor AI 編集支援ルール

### 1. ファイル構造の理解
- CSS: 13ソースファイル → 24個別ファイル + 10バンドル
- JS: 12ソースファイル → 個別ファイル + 4バンドル
- remaining-styles.cssはHTMLから分離した重要なファイル

### 2. 編集時の自動確認
- ソースファイル編集後、必ずビルドコマンド提案
- グローバル変数名変更を検出時、警告表示
- BASEテンプレート構文残存を検出時、除去提案

### 3. 段階的開発支援
- 大きな変更時は段階的アプローチを提案
- テストコード例を自動提示
- デプロイ前チェックリスト提示

### 4. 保守性向上
- コードコメント追加提案
- 依存関係の明確化
- パフォーマンス影響の事前評価 