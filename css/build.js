const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');

// ディレクトリ設定
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// distディレクトリが存在しない場合は作成
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// CSS外部化Phase 3 - 新しいライブラリ定義
const cssLibraries = [
    // Phase 1: 基盤CSS (実装済み)
    { name: 'foundation', input: 'foundation.css' },
    { name: 'layout', input: 'layout.css' },
    
    // Phase 2: コンポーネントCSS (実装済み)
    { name: 'base-menu', input: 'base-menu.css' },
    { name: 'product-components', input: 'product-components.css' },
    { name: 'animations', input: 'animations.css' },
    
    // Phase 3: 商品詳細・フォーム・レスポンシブ (実装済み)
    { name: 'product-detail', input: 'product-detail.css' },
    { name: 'forms', input: 'forms.css' },
    { name: 'responsive', input: 'responsive.css' },
    { name: 'footer-pages', input: 'footer-pages.css' },
    
    // Phase 4: 特殊ページ・UI・統合機能CSS (新規)
    { name: 'special-pages', input: 'special-pages.css' },
    { name: 'ui-components', input: 'ui-components.css' },
    { name: 'base-integration', input: 'base-integration.css' },
    
    // Phase 5: 残存スタイル外部化 (NEW)
    { name: 'remaining-styles', input: 'remaining-styles.css' }
];

// バンドル設定
const bundles = [
    // Phase 1 バンドル
    {
        name: 'foundation-bundle',
        files: ['foundation.min.css', 'layout.min.css'],
        description: 'CSS変数・リセット・ハンバーガーメニュー・ロゴ・ナビゲーション'
    },
    
    // Phase 2 バンドル
    {
        name: 'components-bundle',
        files: ['base-menu.min.css', 'product-components.min.css', 'animations.min.css'],
        description: 'BASEメニュー・商品グリッド・アニメーション'
    },
    
    // Phase 3 バンドル (新規)
    {
        name: 'product-detail-bundle',
        files: ['product-detail.min.css'],
        description: '商品詳細ページ・購入フォーム・画像ギャラリー'
    },
    
    {
        name: 'forms-bundle',
        files: ['forms.min.css'],
        description: 'フォーム要素・入力・ボタン・エラーメッセージ'
    },
    
    {
        name: 'responsive-bundle',
        files: ['responsive.min.css'],
        description: 'レスポンシブ・メディアクエリ・モバイル対応'
    },
    
    {
        name: 'footer-pages-bundle',
        files: ['footer-pages.min.css'],
        description: 'フッター・ページコンテンツ・BASE固有要素'
    },
    
    // Phase 4 バンドル (新規)
    {
        name: 'special-pages-bundle',
        files: ['special-pages.min.css'],
        description: 'LOOKBOOK・About・Contact・特定商取引法ページ専用スタイル'
    },
    
    {
        name: 'ui-components-bundle',
        files: ['ui-components.min.css'],
        description: 'モーダル・PayID・関連商品・Ajax読み込み・アニメーション'
    },
    
    {
        name: 'base-integration-bundle',
        files: ['base-integration.min.css'],
        description: 'BASE多言語・Instagram連携・外貨表示・アプリ統合'
    },
    
    // Phase 5 バンドル (NEW)
    {
        name: 'remaining-styles-bundle',
        files: ['remaining-styles.min.css'],
        description: 'HTMLから分離した残存インラインCSS'
    }
];

// CSSを最適化する関数
async function optimizeCSS(css) {
    const result = await postcss([
        cssnano({
            preset: ['default', {
                discardComments: { removeAll: true },
                normalizeWhitespace: true,
                mergeRules: true,
                colormin: true,
                convertValues: true,
                discardDuplicates: true,
                discardEmpty: true,
                discardOverridden: true,
                discardUnused: true,
                mergeLonghand: true,
                mergeIdents: false,
                minifyFontValues: true,
                minifyGradients: true,
                minifyParams: true,
                minifySelectors: true,
                normalizeCharset: true,
                normalizeDisplayValues: true,
                normalizePositions: true,
                normalizeRepeatStyle: true,
                normalizeString: true,
                normalizeTimingFunctions: true,
                normalizeUnicode: true,
                normalizeUrl: true,
                orderedValues: true,
                reduceIdents: false,
                reduceInitial: true,
                reduceTransforms: true,
                svgo: true,
                uniqueSelectors: true
            }]
        })
    ]).process(css, { from: undefined });
    
    return result.css;
}

// ファイルサイズをフォーマットする関数
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// 個別ライブラリをビルドする関数
async function buildLibrary(library) {
    const inputPath = path.join(srcDir, library.input);
    const outputPath = path.join(distDir, `${library.name}.min.css`);
    
    if (!fs.existsSync(inputPath)) {
        console.warn(`⚠️  ファイルが見つかりません: ${inputPath}`);
        return null;
    }
    
    try {
        const css = fs.readFileSync(inputPath, 'utf8');
        const optimizedCSS = await optimizeCSS(css);
        
        // ヘッダーコメントを追加
        const header = `/*! HOLY LABEL CSS Library - ${library.name} | github.com/irutomo/holy-label-js-divede */\n`;
        const finalCSS = header + optimizedCSS;
        
        fs.writeFileSync(outputPath, finalCSS);
        
        const originalSize = css.length;
        const optimizedSize = finalCSS.length;
        const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✅ ${library.name}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${reduction}% 削減)`);
        
        return {
            name: library.name,
            originalSize,
            optimizedSize,
            reduction: parseFloat(reduction)
        };
    } catch (error) {
        console.error(`❌ ${library.name} のビルドに失敗: ${error.message}`);
        return null;
    }
}

// バンドルを作成する関数
async function createBundle(bundle) {
    const bundlePath = path.join(distDir, `${bundle.name}.min.css`);
    let combinedCSS = '';
    let totalOriginalSize = 0;
    
    // ヘッダーコメント
    combinedCSS += `/*! HOLY LABEL CSS Bundle - ${bundle.name} | ${bundle.description} */\n`;
    
    for (const fileName of bundle.files) {
        const filePath = path.join(distDir, fileName);
        if (fs.existsSync(filePath)) {
            const css = fs.readFileSync(filePath, 'utf8');
            // ヘッダーコメントを除去
            const cleanCSS = css.replace(/^\/\*!.*?\*\/\n?/, '');
            combinedCSS += cleanCSS + '\n';
        } else {
            console.warn(`⚠️  バンドルファイルが見つかりません: ${filePath}`);
        }
    }
    
    // 再度最適化
    const optimizedBundle = await optimizeCSS(combinedCSS);
    const finalBundle = `/*! HOLY LABEL CSS Bundle - ${bundle.name} | ${bundle.description} */\n` + optimizedBundle;
    
    fs.writeFileSync(bundlePath, finalBundle);
    
    const bundleSize = finalBundle.length;
    console.log(`📦 ${bundle.name}: ${formatBytes(bundleSize)}`);
    
    return {
        name: bundle.name,
        size: bundleSize,
        description: bundle.description
    };
}

// メインビルド関数
async function buildAll() {
    console.log('🚀 HOLY LABEL CSS外部化Phase 4 ビルド開始\n');
    
    const results = [];
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    
    // 個別ライブラリをビルド
    console.log('📄 個別ライブラリビルド:');
    for (const library of cssLibraries) {
        const result = await buildLibrary(library);
        if (result) {
            results.push(result);
            totalOriginalSize += result.originalSize;
            totalOptimizedSize += result.optimizedSize;
        }
    }
    
    console.log('\n📦 バンドル作成:');
    const bundleResults = [];
    for (const bundle of bundles) {
        const result = await createBundle(bundle);
        bundleResults.push(result);
    }
    
    // 統計情報を表示
    console.log('\n📊 CSS外部化Phase 4 ビルド統計:');
    console.log('=' .repeat(60));
    console.log(`個別ライブラリ数: ${results.length}`);
    console.log(`バンドル数: ${bundleResults.length}`);
    console.log(`総削減量: ${formatBytes(totalOriginalSize)} → ${formatBytes(totalOptimizedSize)}`);
    console.log(`総削減率: ${((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)}%`);
    
    console.log('\n🌐 CDN URL (jsDelivr):');
    bundleResults.forEach(bundle => {
        const cdnUrl = `https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/${bundle.name}.min.css`;
        console.log(`${bundle.name}: ${cdnUrl}`);
    });
    
    console.log('\n✨ Phase 4 ビルド完了！');
    
    // ビルド結果をJSONファイルに保存
    const buildInfo = {
        timestamp: new Date().toISOString(),
        phase: 'Phase 4',
        libraries: results,
        bundles: bundleResults,
        totalOriginalSize,
        totalOptimizedSize,
        totalReduction: ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1)
    };
    
    fs.writeFileSync(path.join(distDir, 'build-info-phase4.json'), JSON.stringify(buildInfo, null, 2));
}

// エラーハンドリング
process.on('unhandledRejection', (error) => {
    console.error('❌ ビルドエラー:', error);
    process.exit(1);
});

// ビルド実行
buildAll().catch(error => {
    console.error('❌ ビルド失敗:', error);
    process.exit(1);
}); 