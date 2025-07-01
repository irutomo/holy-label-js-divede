const fs = require('fs');
const { minify } = require('terser');
const path = require('path');

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

// JavaScript最適化設定
const minifyOptions = {
    compress: {
        drop_console: false, // コンソールログを保持（デバッグ用）
        drop_debugger: true,
        pure_funcs: [], // console.logも保持
        sequences: true,
        dead_code: true,
        if_return: true,
        join_vars: true,
        reduce_vars: true
    },
    mangle: {
        // HOLY LABELのグローバル変数を保護
        reserved: [
            'HolyLabelDOMUtils', 'HolyLabelPageState', 'HolyLabelAnimationConfig',
            'HolyLabelAnimationManager', 'HolyLabelNavigationManager', 'HolyLabelModalUtils',
            'HolyLabelProductGallery', 'HolyLabelLoadMoreManager', 'HolyLabelLogoManager',
            'HolyLabelInitializationManager', 'HolyLabelLanguageManager', 'HolyLabelScrollManager',
            // 関数名も保護
            'init', 'toggle', 'open', 'close', 'show', 'hide', 'switchLanguage'
        ]
    },
    format: {
        comments: function(node, comment) {
            // HOLY LABELコメントとライセンスコメントを保持
            return comment.value.includes('HOLY LABEL') || 
                   comment.value.includes('(c) 2024') || 
                   comment.value.includes('MIT License') ||
                   comment.value.includes('Core Layer') ||
                   comment.value.includes('Extended Layer') ||
                   comment.value.includes('Advanced Layer') ||
                   comment.value.includes('Final Layer');
        }
    }
};

// メインビルド関数
async function buildJS() {
    console.log('🚀 HOLY LABEL JavaScript統合ビルド開始\n');
    
    const inputFile = path.join(srcDir, 'holy-label-all.js');
    const outputFile = path.join(distDir, 'holy-label-all.min.js');
    
    // 入力ファイル確認
    if (!fs.existsSync(inputFile)) {
        console.error(`❌ 入力ファイルが見つかりません: ${inputFile}`);
        process.exit(1);
    }
    
    try {
        // JavaScript読み込み
        console.log('📄 ソースファイル読み込み...');
        const jsCode = fs.readFileSync(inputFile, 'utf8');
        const originalSize = Buffer.byteLength(jsCode, 'utf8');
        
        // JavaScript最適化
        console.log('⚡ JavaScript最適化中...');
        const result = await minify(jsCode, minifyOptions);
        
        if (result.error) {
            throw result.error;
        }
        
        const optimizedSize = Buffer.byteLength(result.code, 'utf8');
        
        // ファイル出力
        fs.writeFileSync(outputFile, result.code);
        
        // 結果表示
        const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        const lines = jsCode.split('\n').length;
        
        console.log('\n✨ ビルド完了！');
        console.log('=' .repeat(50));
        console.log(`入力ファイル: holy-label-all.js`);
        console.log(`出力ファイル: holy-label-all.min.js`);
        console.log(`元サイズ: ${formatBytes(originalSize)} (${lines.toLocaleString()}行)`);
        console.log(`圧縮後: ${formatBytes(optimizedSize)}`);
        console.log(`削減率: ${reduction}%`);
        console.log('=' .repeat(50));
        console.log(`\n🎯 CDN URL: https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/holy-label-all.min.js`);
        
        // グローバル変数保護確認
        const globalVars = [
            'HolyLabelDOMUtils', 'HolyLabelPageState', 'HolyLabelAnimationConfig',
            'HolyLabelAnimationManager', 'HolyLabelNavigationManager', 'HolyLabelModalUtils',
            'HolyLabelProductGallery', 'HolyLabelLoadMoreManager', 'HolyLabelLogoManager',
            'HolyLabelInitializationManager', 'HolyLabelLanguageManager', 'HolyLabelScrollManager'
        ];
        
        const missingVars = globalVars.filter(varName => !result.code.includes(varName));
        if (missingVars.length > 0) {
            console.warn(`⚠️  以下のグローバル変数が見つかりません: ${missingVars.join(', ')}`);
        } else {
            console.log('✅ 全グローバル変数保護確認済み');
        }
        
    } catch (error) {
        console.error(`❌ ビルドエラー: ${error.message}`);
        if (error.filename) {
            console.error(`ファイル: ${error.filename}`);
        }
        if (error.line !== undefined) {
            console.error(`行: ${error.line}, 列: ${error.col}`);
        }
        process.exit(1);
    }
}

// エラーハンドリング
process.on('unhandledRejection', (error) => {
    console.error('❌ ビルドエラー:', error);
    process.exit(1);
});

// ビルド実行
buildJS().catch(error => {
    console.error('❌ ビルド失敗:', error);
    process.exit(1);
}); 