const fs = require('fs');
const path = require('path');

// PostCSS とプラグインの動的インポート
async function initializePostCSS() {
    const postcss = (await import('postcss')).default;
    const cssnano = (await import('cssnano')).default;
    const autoprefixer = (await import('autoprefixer')).default;
    
    return postcss([
        autoprefixer(),
        cssnano({
            preset: ['default', {
                normalizeWhitespace: true,
                discardComments: { removeAll: true },
                minifySelectors: true,
                mergeRules: true
            }]
        })
    ]);
}

// CSSライブラリ定義
const cssLibraries = {
    foundation: {
        name: 'foundation',
        description: 'CSS変数・リセット・フォント設定',
        files: ['src/foundation.css'],
        phase: 1
    },
    layout: {
        name: 'layout', 
        description: 'ハンバーガーメニュー・ロゴ・ナビゲーション',
        files: ['src/layout.css'],
        phase: 1
    }
};

// 統合バンドル定義
const bundles = {
    'foundation-bundle': {
        name: 'foundation-bundle',
        description: 'Phase 1: 基盤CSS統合バンドル',
        libraries: ['foundation', 'layout'],
        phase: 1
    }
};

async function buildCSS() {
    const processor = await initializePostCSS();
    
    console.log('🎨 HOLY LABEL CSS外部化ビルド開始...');
    
    // 出力ディレクトリの確保
    const distDir = path.join(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    
    let totalOriginalSize = 0;
    let totalMinifiedSize = 0;
    
    // 個別ライブラリのビルド
    for (const [libName, config] of Object.entries(cssLibraries)) {
        console.log(`\n📦 ビルド中: ${config.name} (${config.description})`);
        
        let combinedCSS = '';
        for (const file of config.files) {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                combinedCSS += fs.readFileSync(filePath, 'utf8') + '\n';
            }
        }
        
        const originalSize = Buffer.byteLength(combinedCSS, 'utf8');
        const result = await processor.process(combinedCSS, { from: undefined });
        const minifiedSize = Buffer.byteLength(result.css, 'utf8');
        
        // ミニファイ版を保存
        const outputPath = path.join(distDir, `${config.name}.min.css`);
        fs.writeFileSync(outputPath, result.css);
        
        const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        console.log(`   ✓ ${config.name}.min.css: ${minifiedSize} bytes (${reduction}% 削減)`);
        
        totalOriginalSize += originalSize;
        totalMinifiedSize += minifiedSize;
    }
    
    // 統合バンドルのビルド  
    for (const [bundleName, config] of Object.entries(bundles)) {
        console.log(`\n🎯 統合バンドル: ${config.name} (${config.description})`);
        
        let bundleCSS = '';
        for (const libName of config.libraries) {
            const libConfig = cssLibraries[libName];
            for (const file of libConfig.files) {
                const filePath = path.join(__dirname, file);
                if (fs.existsSync(filePath)) {
                    bundleCSS += fs.readFileSync(filePath, 'utf8') + '\n';
                }
            }
        }
        
        const originalSize = Buffer.byteLength(bundleCSS, 'utf8');
        const result = await processor.process(bundleCSS, { from: undefined });
        const minifiedSize = Buffer.byteLength(result.css, 'utf8');
        
        const outputPath = path.join(distDir, `${bundleName}.min.css`);
        fs.writeFileSync(outputPath, result.css);
        
        const reduction = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        console.log(`   ✓ ${bundleName}.min.css: ${minifiedSize} bytes (${reduction}% 削減)`);
    }
    
    // 統計サマリー
    const totalReduction = ((totalOriginalSize - totalMinifiedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`\n📊 ビルド完了統計:`);
    console.log(`   元サイズ: ${totalOriginalSize} bytes`);
    console.log(`   圧縮後: ${totalMinifiedSize} bytes`);
    console.log(`   削減率: ${totalReduction}%`);
    console.log(`   削減量: ${totalOriginalSize - totalMinifiedSize} bytes`);
    
    console.log('\n🚀 jsDelivr CDN URL:');
    for (const [bundleName] of Object.entries(bundles)) {
        console.log(`   https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/${bundleName}.min.css`);
    }
}

if (require.main === module) {
    buildCSS().catch(console.error);
}

module.exports = { buildCSS }; 