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

// ファイルサイズをフォーマットする関数
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// CSSを最適化する関数
async function optimizeCSS(css) {
    const result = await postcss([
        cssnano({
            preset: ['default', {
                discardComments: { removeAll: false }, // ヘッダーコメント保持
                normalizeWhitespace: true,
                mergeRules: true,
                colormin: true,
                convertValues: true,
                discardDuplicates: true,
                discardEmpty: true,
                discardOverridden: true,
                mergeLonghand: true,
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
                reduceInitial: true,
                reduceTransforms: true,
                svgo: true,
                uniqueSelectors: true
            }]
        })
    ]).process(css, { from: undefined });
    
    return result.css;
}

// メインビルド関数
async function buildCSS() {
    console.log('🚀 HOLY LABEL CSS統合ビルド開始\n');
    
    const inputFile = path.join(srcDir, 'holy-label-all.css');
    const outputFile = path.join(distDir, 'holy-label-all.min.css');
    
    // 入力ファイル確認
    if (!fs.existsSync(inputFile)) {
        console.error(`❌ 入力ファイルが見つかりません: ${inputFile}`);
        process.exit(1);
    }
    
    try {
        // CSS読み込み
        console.log('📄 ソースファイル読み込み...');
        const css = fs.readFileSync(inputFile, 'utf8');
        const originalSize = css.length;
        
        // CSS最適化
        console.log('⚡ CSS最適化中...');
        const optimizedCSS = await optimizeCSS(css);
        const optimizedSize = optimizedCSS.length;
        
        // ファイル出力
        fs.writeFileSync(outputFile, optimizedCSS);
        
        // 結果表示
        const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        const lines = css.split('\n').length;
        
        console.log('\n✨ ビルド完了！');
        console.log('=' .repeat(50));
        console.log(`入力ファイル: holy-label-all.css`);
        console.log(`出力ファイル: holy-label-all.min.css`);
        console.log(`元サイズ: ${formatBytes(originalSize)} (${lines.toLocaleString()}行)`);
        console.log(`圧縮後: ${formatBytes(optimizedSize)}`);
        console.log(`削減率: ${reduction}%`);
        console.log('=' .repeat(50));
        console.log(`\n🎯 CDN URL: https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/holy-label-all.min.css`);
        
    } catch (error) {
        console.error(`❌ ビルドエラー: ${error.message}`);
        process.exit(1);
    }
}

// エラーハンドリング
process.on('unhandledRejection', (error) => {
    console.error('❌ ビルドエラー:', error);
    process.exit(1);
});

// ビルド実行
buildCSS().catch(error => {
    console.error('❌ ビルド失敗:', error);
    process.exit(1);
}); 