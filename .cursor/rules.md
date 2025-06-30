# HOLY LABEL プロジェクト - 詳細開発ルール

## 🎯 プロジェクト固有の開発方針

### アーキテクチャの理解
このプロジェクトは、BASEプラットフォームの制約（150,000文字制限）を回避するために、JavaScript・CSSを外部ライブラリ化したモジュラーシステムです。

#### 制約と解決策
- **制約**: BASE単一HTMLファイル150,000文字制限
- **解決策**: 重要機能をCDN外部ライブラリ化
- **効果**: メインHTML 90.8KB、外部ライブラリ 50KB未満

## 📝 コーディング規約

### JavaScript開発規約

#### 1. 名前空間ルール
```javascript
// ✅ 必須: HolyLabel プレフィックス
window.HolyLabelDOMUtils = { ... };
window.HolyLabelNavigationManager = { ... };

// ❌ 禁止: プレフィックスなし
window.DOMUtils = { ... };
window.NavigationManager = { ... };
```

#### 2. 依存関係管理
```javascript
// ✅ 依存関係の明示的チェック
const DOMUtils = window.HolyLabelDOMUtils || window.DOMUtils;
if (!DOMUtils) {
    console.error('HolyLabelDOMUtils not found');
    return;
}

// ❌ 直接参照（エラーの原因）
window.HolyLabelDOMUtils.get('.selector');
```

#### 3. エラーハンドリング
```javascript
// ✅ 推奨: 防御的プログラミング
function safeToggleMenu() {
    const hamburger = DOMUtils.hamburger();
    if (!hamburger) {
        console.warn('Hamburger element not found');
        return;
    }
    hamburger.classList.toggle('-active');
}

// ❌ 危険: null チェックなし
function unsafeToggleMenu() {
    DOMUtils.hamburger().classList.toggle('-active'); // エラーの可能性
}
```

### CSS開発規約

#### 1. CSS変数の活用
```css
/* ✅ CSS変数を必ず使用 */
.product-item {
    background-color: var(--primary-bg);
    color: var(--primary-text);
    padding: var(--space-md);
}

/* ❌ ハードコーディング禁止 */
.product-item {
    background-color: #0B101D;
    color: #ffffff;
    padding: 32px;
}
```

#### 2. レスポンシブ設計
```css
/* ✅ モバイルファースト */
.component {
    /* モバイル（〜767px）のスタイル */
    display: block;
}

@media (min-width: 768px) {
    .component {
        /* タブレット以上 */
        display: flex;
    }
}

/* ❌ デスクトップファースト */
.component {
    display: flex; /* デスクトップ前提 */
}

@media (max-width: 767px) {
    .component {
        display: block; /* 後付けのモバイル対応 */
    }
}
```

#### 3. BASE仕様準拠
```css
/* ✅ BASE標準クラス名の保持 */
.product-item { ... }      /* BASEが生成するクラス */
.cart-button { ... }       /* BASEが生成するクラス */
.shop-nav { ... }          /* BASEが生成するクラス */

/* ✅ カスタムクラスには接頭辞 */
.hl-custom-component { ... }
.hl-animation-target { ... }
```

## 🔄 開発フロー

### 1. 機能開発フロー
```bash
# Step 1: ブランチ作成
git checkout -b feature/navigation-improvement

# Step 2: ソースファイル編集
# js/src/ または css/src/ 内のファイルを編集

# Step 3: ビルド実行
cd js && npm run build
cd ../css && npm run build

# Step 4: ローカルテスト
# holy-label-js-divede.html をブラウザで開いて確認

# Step 5: 機能テスト
# ブラウザコンソールで動作確認

# Step 6: コミット
git add .
git commit -m "feat(navigation): ハンバーガーメニューのアニメーション改善

- スムーズなトランジション追加
- アクセシビリティ属性の設定
- モバイル最適化
- テスト: 全デバイスで動作確認済み"

# Step 7: プッシュ
git push origin feature/navigation-improvement
```

### 2. バグ修正フロー
```bash
# Step 1: バグ調査
# ブラウザ開発者ツールでデバッグ

# Step 2: 最小限の修正
# 影響範囲を最小限に抑える

# Step 3: テスト
# 修正箇所 + 関連機能の動作確認

# Step 4: ホットフィックス
git checkout -b hotfix/modal-close-bug
# ... 修正 ...
git commit -m "fix(modal): モーダル閉じるボタンの動作修正

- click イベントが正常に動作しない問題を修正
- イベントリスナーの重複登録を防止
- 影響範囲: modal-utils.js のみ"
```

## 🧪 テスト戦略

### 1. 必須テスト項目
```javascript
// ライブラリ読み込みテスト
const testLibraryLoading = () => {
    console.group('🧪 Library Loading Test');
    console.log('Core:', !!window.HolyLabelDOMUtils);
    console.log('Extended:', !!window.HolyLabelAnimationManager);
    console.log('Advanced:', !!window.HolyLabelProductImageGallery);
    console.log('Final:', !!window.HolyLabelInitializationManager);
    console.groupEnd();
};

// 個別機能テスト
const testCoreFunctions = () => {
    console.group('🧪 Core Functions Test');
    
    // DOM操作テスト
    console.log('DOM get:', HolyLabelDOMUtils.get('body') !== null);
    
    // ナビゲーションテスト
    console.log('Navigation toggle:', typeof HolyLabelNavigationManager.toggleMenu === 'function');
    
    // アニメーションテスト
    console.log('Animation init:', typeof HolyLabelAnimationManager.init === 'function');
    
    console.groupEnd();
};
```

### 2. パフォーマンステスト
```javascript
// ファイルサイズチェック
const checkFileSize = async () => {
    const response = await fetch('holy-label-js-divede.html');
    const text = await response.text();
    const size = new Blob([text]).size;
    
    console.log(`📊 HTML Size: ${(size / 1024).toFixed(2)} KB`);
    console.log(`📊 Size Check: ${size < 150000 ? '✅ PASS' : '❌ FAIL'} (${size}/150000)`);
};

// 読み込み速度チェック
const checkLoadingSpeed = () => {
    const startTime = performance.now();
    
    window.addEventListener('load', () => {
        const endTime = performance.now();
        console.log(`⚡ Loading Time: ${(endTime - startTime).toFixed(2)}ms`);
    });
};
```

### 3. クロスブラウザテスト
```javascript
// ブラウザ互換性チェック
const checkBrowserCompatibility = () => {
    console.group('🌐 Browser Compatibility');
    
    // 重要なAPI存在確認
    console.log('querySelector:', 'querySelector' in document);
    console.log('addEventListener:', 'addEventListener' in document);
    console.log('classList:', 'classList' in document.documentElement);
    console.log('fetch:', 'fetch' in window);
    
    // CSS Grid/Flexbox サポート
    console.log('CSS Grid:', CSS.supports('display', 'grid'));
    console.log('CSS Flexbox:', CSS.supports('display', 'flex'));
    
    console.groupEnd();
};
```

## 🚨 デバッグガイド

### 1. よくある問題と解決法

#### JavaScript エラー
```javascript
// 問題: HolyLabelDOMUtils is not defined
// 解決法: 依存関係の確認
if (typeof window.HolyLabelDOMUtils === 'undefined') {
    console.error('❌ HolyLabelDOMUtils not loaded. Check CDN URL.');
}

// 問題: Cannot read property 'classList' of null
// 解決法: 要素存在確認
const element = DOMUtils.get('.selector');
if (!element) {
    console.warn('⚠️ Element not found:', '.selector');
    return;
}
```

#### CSS スタイル適用エラー
```css
/* 問題: CSS変数が効かない */
/* 解決法: fallback値の設定 */
.component {
    color: var(--primary-text, #ffffff); /* fallback付き */
}

/* 問題: レスポンシブが効かない */
/* 解決法: viewport設定確認 */
/* <meta name="viewport" content="width=device-width, initial-scale=1.0"> */
```

### 2. ログ出力規約
```javascript
// ✅ 構造化ログ
console.group('🔧 NavigationManager');
console.log('Initializing...');
console.log('Elements found:', elements);
console.groupEnd();

// ✅ エラーレベルの適切な使用
console.error('❌ Critical error:', error);
console.warn('⚠️ Warning:', warning);
console.info('ℹ️ Info:', info);
console.log('📝 Debug:', debug);

// ❌ 本番環境でのconsole.log大量出力
// 必要に応じてビルド時に除去
```

## 📊 パフォーマンス最適化

### 1. ファイルサイズ最適化
```javascript
// ✅ 効率的な実装
const elements = ['nav', 'hamburger', 'logo'].reduce((acc, key) => {
    acc[key] = DOMUtils.get(`.${key}`);
    return acc;
}, {});

// ❌ 冗長な実装
const nav = DOMUtils.get('.nav');
const hamburger = DOMUtils.get('.hamburger');
const logo = DOMUtils.get('.logo');
const elements = { nav, hamburger, logo };
```

### 2. 実行速度最適化
```javascript
// ✅ キャッシュ活用
const cachedElement = DOMUtils.getCached('hamburger', '#js-hamburger');

// ✅ イベント委譲
document.addEventListener('click', (e) => {
    if (e.target.matches('.thumbnail-item')) {
        // サムネイル処理
    }
});

// ❌ 個別イベントリスナー
document.querySelectorAll('.thumbnail-item').forEach(item => {
    item.addEventListener('click', handler);
});
```

## 🔒 セキュリティ考慮事項

### 1. XSS対策
```javascript
// ✅ 安全なDOM操作
element.textContent = userInput; // XSS safe

// ❌ 危険なHTML挿入
element.innerHTML = userInput; // XSS risk
```

### 2. CSRF対策
```javascript
// ✅ 安全なフォーム送信（BASEテンプレート活用）
// {PurchaseButton} を使用してBASE側でCSRF対策

// ❌ カスタムフォーム送信
// 独自実装でのセキュリティホール
```

## 📋 レビューチェックリスト

### コード品質
- [ ] 命名規則に従っている（HolyLabel プレフィックス）
- [ ] 依存関係が明示的に管理されている
- [ ] エラーハンドリングが適切に実装されている
- [ ] パフォーマンスに配慮した実装
- [ ] セキュリティリスクがない

### 機能品質
- [ ] 全ての必須機能が動作する
- [ ] レスポンシブ対応が完了している
- [ ] クロスブラウザ対応が完了している
- [ ] アクセシビリティに配慮している

### ドキュメント
- [ ] 重要な変更はドキュメント更新済み
- [ ] コミットメッセージが明確
- [ ] 破壊的変更の場合は警告表示

このルールに従うことで、高品質で保守性の高いHOLY LABELライブラリの開発を実現できます。 