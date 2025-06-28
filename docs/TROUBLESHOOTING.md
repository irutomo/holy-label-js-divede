# 🛠 HOLY LABEL トラブルシューティングガイド

本ガイドでは、HOLY LABEL外部ライブラリの使用時によくある問題と解決方法を説明します。

## 🚨 よくある問題と解決方法

### 1. ライブラリが読み込まれない

#### 症状
- JavaScriptエラーが発生する
- スタイルが適用されない
- 機能が動作しない

#### 原因と解決方法

**原因1: CDNへの接続問題**
```javascript
// 診断コード
fetch('https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js')
  .then(response => {
    console.log('CDN Status:', response.status);
    if (response.status !== 200) {
      console.error('CDN接続エラー:', response.statusText);
    }
  })
  .catch(error => {
    console.error('ネットワークエラー:', error);
  });
```

**解決方法:**
1. ネットワーク接続を確認
2. ファイアウォール設定を確認
3. 別のCDNミラーを試用

**原因2: ファイルパスの間違い**
```html
<!-- ❌ 間違い -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede/js/dist/core-bundle.min.js"></script>

<!-- ✅ 正しい -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"></script>
```

**原因3: 読み込み順序の問題**
```html
<!-- ❌ 間違った順序 -->
<script src=".../final-bundle.min.js"></script>
<script src=".../core-bundle.min.js"></script>

<!-- ✅ 正しい順序 -->
<script src=".../core-bundle.min.js"></script>
<script src=".../extended-bundle.min.js"></script>
<script src=".../advanced-bundle.min.js"></script>
<script src=".../final-bundle.min.js"></script>
```

### 2. 機能が期待通りに動作しない

#### 症状
- アニメーションが動かない
- モーダルが開かない
- ギャラリーが機能しない

#### 診断方法

**ライブラリ読み込み確認:**
```javascript
// ブラウザコンソールで実行
console.log('読み込み状況:');
console.log('Core:', !!window.HolyLabelDOMUtils);
console.log('Extended:', !!window.HolyLabelAnimationManager);
console.log('Advanced:', !!window.HolyLabelProductImageGallery);
console.log('Final:', !!window.HolyLabelInitializationManager);
```

**初期化状況確認:**
```javascript
// 初期化診断
if (typeof HolyLabelInitializationManager !== 'undefined') {
  HolyLabelInitializationManager.diagnose();
} else {
  console.error('InitializationManager が読み込まれていません');
}
```

#### 解決方法

**解決法1: 手動初期化**
```javascript
// DOM読み込み後に手動初期化
document.addEventListener('DOMContentLoaded', function() {
  if (typeof HolyLabelInitializationManager !== 'undefined') {
    HolyLabelInitializationManager.init({
      enableAnimations: true,
      enableModal: true,
      enableGallery: true
    });
  }
});
```

**解決法2: 依存関係の確認**
```javascript
// 必要なライブラリが読み込まれているか確認
function checkDependencies() {
  const required = [
    'HolyLabelDOMUtils',
    'HolyLabelPageState',
    'HolyLabelAnimationConfig'
  ];
  
  const missing = required.filter(lib => typeof window[lib] === 'undefined');
  
  if (missing.length > 0) {
    console.error('不足ライブラリ:', missing);
    return false;
  }
  
  console.log('依存関係OK');
  return true;
}

checkDependencies();
```

### 3. スタイルが適用されない

#### 症状
- レイアウトが崩れる
- 色やフォントが期待と異なる
- レスポンシブが動作しない

#### 原因と解決方法

**原因1: CSS読み込み順序**
```html
<!-- ❌ 間違った順序 -->
<link rel="stylesheet" href=".../ui-components-bundle.min.css">
<link rel="stylesheet" href=".../foundation-bundle.min.css">

<!-- ✅ 正しい順序 -->
<link rel="stylesheet" href=".../foundation-bundle.min.css">
<link rel="stylesheet" href=".../components-bundle.min.css">
<link rel="stylesheet" href=".../ui-components-bundle.min.css">
```

**原因2: CSSの競合**
```css
/* 既存CSSとの競合を確認 */
.existing-style {
  color: red !important; /* !importantが外部CSSを上書きしている */
}
```

**解決方法:**
```css
/* 解決法1: 外部CSSの後に独自CSSを配置 */
/* 解決法2: より具体的なセレクタを使用 */
.my-theme .button {
  color: blue;
}
```

**原因3: ブラウザキャッシュ**
```javascript
// キャッシュクリア確認
location.reload(true); // 強制リロード
```

### 4. パフォーマンスの問題

#### 症状
- ページ読み込みが遅い
- アニメーションがカクつく
- モバイルでの動作が重い

#### 診断方法

**読み込み時間測定:**
```javascript
// パフォーマンス測定
window.addEventListener('load', function() {
  const loadTime = performance.now();
  console.log('ページ読み込み時間:', loadTime + 'ms');
  
  // Core Web Vitals確認
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log('Metric:', entry.name, 'Value:', entry.value);
    }
  }).observe({entryTypes: ['measure', 'navigation']});
});
```

#### 解決方法

**解決法1: 遅延読み込み**
```javascript
// 非重要機能の遅延読み込み
setTimeout(function() {
  // ギャラリーなど重い機能を遅延初期化
  if (typeof HolyLabelProductImageGallery !== 'undefined') {
    HolyLabelProductImageGallery.init();
  }
}, 2000);
```

**解決法2: 条件付き読み込み**
```javascript
// ページタイプに応じた選択的読み込み
const pageType = document.body.id;

if (pageType === 'shopDetailPage') {
  // 商品詳細ページでのみ重い機能を読み込み
  loadLibrary('advanced-bundle.min.js');
}
```

### 5. BASEテンプレートとの競合

#### 症状
- BASE固有機能が動作しない
- テンプレート変数が表示されない
- カート機能に問題が発生

#### 原因と解決方法

**原因1: イベントハンドラーの競合**
```javascript
// 解決方法: イベント委譲を使用
document.addEventListener('click', function(e) {
  if (e.target.matches('.my-button')) {
    // 独自処理
    e.stopPropagation(); // BASEイベントと競合を避ける
  }
});
```

**原因2: CSS セレクタの競合**
```css
/* 解決方法: より具体的なセレクタ */
.holy-label-theme .product-item {
  /* 独自スタイル */
}
```

### 6. デバッグ用ツール

#### ライブラリ状況確認ツール
```javascript
// ブラウザコンソールに貼り付けて実行
function debugHolyLabel() {
  console.log('=== HOLY LABEL Debug Info ===');
  
  // ライブラリ読み込み状況
  const libraries = [
    'HolyLabelDOMUtils',
    'HolyLabelPageState', 
    'HolyLabelAnimationConfig',
    'HolyLabelAnimationManager',
    'HolyLabelNavigationManager',
    'HolyLabelModalUtils',
    'HolyLabelProductImageGallery',
    'HolyLabelLoadMoreManager',
    'HolyLabelLogoManager',
    'HolyLabelInitializationManager',
    'HolyLabelLanguageManager',
    'HolyLabelScrollManager'
  ];
  
  libraries.forEach(lib => {
    const status = typeof window[lib] !== 'undefined' ? '✅' : '❌';
    console.log(`${status} ${lib}`);
  });
  
  // ページ情報
  console.log('\n=== Page Info ===');
  if (typeof HolyLabelPageState !== 'undefined') {
    console.log('Page Type:', HolyLabelPageState.getPageType());
  }
  
  // デバイス情報
  console.log('\n=== Device Info ===');
  if (typeof HolyLabelAnimationConfig !== 'undefined') {
    console.log('Device Type:', HolyLabelAnimationConfig.getDeviceType());
  }
  
  // CSS状況
  console.log('\n=== CSS Links ===');
  const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
  cssLinks.forEach(link => {
    if (link.href.includes('holy-label-js-divede')) {
      console.log('✅', link.href.split('/').pop());
    }
  });
  
  console.log('==================');
}

// 実行
debugHolyLabel();
```

#### ネットワーク診断ツール
```javascript
// CDN接続テスト
async function testCDN() {
  const baseUrl = 'https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main';
  const files = [
    '/js/dist/core-bundle.min.js',
    '/css/dist/foundation-bundle.min.css'
  ];
  
  for (const file of files) {
    try {
      const response = await fetch(baseUrl + file);
      const status = response.status === 200 ? '✅' : '❌';
      console.log(`${status} ${file} (${response.status})`);
    } catch (error) {
      console.log(`❌ ${file} (Error: ${error.message})`);
    }
  }
}

testCDN();
```

## 📞 サポート

### 問題解決の流れ

1. **症状の確認** - 具体的な問題を特定
2. **デバッグツール実行** - 上記のデバッグコードを実行
3. **ドキュメント確認** - 関連ドキュメントを参照
4. **コミュニティ相談** - GitHub Issuesで質問

### サポートリソース

- **GitHub Issues**: https://github.com/irutomo/holy-label-js-divede/issues
- **使い方ガイド**: [USAGE.md](USAGE.md)
- **実装ガイド**: [IMPLEMENTATION.md](IMPLEMENTATION.md)
- **CDNリファレンス**: [CDN-REFERENCE.md](CDN-REFERENCE.md)

### 報告時に含める情報

問題を報告する際は、以下の情報を含めてください：

```
=== 問題報告テンプレート ===

## 環境情報
- ブラウザ: Chrome/Firefox/Safari/Edge [バージョン]
- OS: Windows/Mac/iOS/Android [バージョン]
- デバイス: デスクトップ/タブレット/モバイル

## 症状
[具体的な問題の説明]

## 再現手順
1. [手順1]
2. [手順2]
3. [手順3]

## 期待する動作
[期待していた動作]

## デバッグ情報
[debugHolyLabel()の実行結果]

## その他
[スクリーンショット、エラーメッセージなど]
```

---

## 🔗 関連ドキュメント

- **[使い方ガイド](USAGE.md)** - 基本的な使用方法
- **[実装ガイド](IMPLEMENTATION.md)** - 技術的詳細
- **[CDNリファレンス](CDN-REFERENCE.md)** - 全ライブラリリンク
- **[変更履歴](CHANGELOG.md)** - バージョン情報とアップデート 