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

// ファイル情報
const files = [
    {
        input: 'dom-utils.js',
        output: 'dom-utils.min.js',
        banner: '/*! HOLY LABEL DOM Utils v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'page-state.js',
        output: 'page-state.min.js',
        banner: '/*! HOLY LABEL Page State v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'animation-config.js',
        output: 'animation-config.min.js',
        banner: '/*! HOLY LABEL Animation Config v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'animation-manager.js',
        output: 'animation-manager.min.js',
        banner: '/*! HOLY LABEL Animation Manager v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'navigation-manager.js',
        output: 'navigation-manager.min.js',
        banner: '/*! HOLY LABEL Navigation Manager v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'modal-utils.js',
        output: 'modal-utils.min.js',
        banner: '/*! HOLY LABEL Modal Utils v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'product-gallery.js',
        output: 'product-gallery.min.js',
        banner: '/*! HOLY LABEL Product Gallery v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'loadmore-manager.js',
        output: 'loadmore-manager.min.js',
        banner: '/*! HOLY LABEL LoadMore Manager v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'logo-manager.js',
        output: 'logo-manager.min.js',
        banner: '/*! HOLY LABEL Logo Manager v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'initialization-manager.js',
        output: 'initialization-manager.min.js',
        banner: '/*! HOLY LABEL Initialization Manager v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'language-manager.js',
        output: 'language-manager.min.js',
        banner: '/*! HOLY LABEL Language Manager v1.0.0 | (c) 2024 | MIT License */'
    },
    {
        input: 'scroll-manager.js',
        output: 'scroll-manager.min.js',
        banner: '/*! HOLY LABEL Scroll Manager v1.0.0 | (c) 2024 | MIT License */'
    }
];

// コアライブラリ統合版（基盤）
const coreFiles = ['dom-utils.js', 'page-state.js', 'animation-config.js'];

// 拡張ライブラリ統合版（機能モジュール）
const extendedFiles = ['animation-manager.js', 'navigation-manager.js', 'modal-utils.js'];

// 高度機能ライブラリ統合版（プレミアム機能）
const advancedFiles = ['product-gallery.js', 'loadmore-manager.js', 'logo-manager.js'];

// 最終統合ライブラリ（システム機能）
const finalFiles = ['initialization-manager.js', 'language-manager.js', 'scroll-manager.js'];

async function buildSingle(file) {
    try {
        const inputPath = path.join(srcDir, file.input);
        const outputPath = path.join(distDir, file.output);
        
        console.log(`Building ${file.input}...`);
        
        const code = fs.readFileSync(inputPath, 'utf8');
        const result = await minify(code, {
            compress: {
                drop_console: false, // 本番では true に
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            mangle: {
                reserved: ['HolyLabelDOMUtils', 'HolyLabelPageState', 'HolyLabelAnimationConfig', 'DOMUtils', 'PageState', 'AnimationConfig']
            },
            format: {
                comments: function(node, comment) {
                    return comment.value.includes('HOLY LABEL');
                }
            }
        });
        
        if (result.error) {
            throw result.error;
        }
        
        const minified = file.banner + '\n' + result.code;
        fs.writeFileSync(outputPath, minified);
        
        const originalSize = Buffer.byteLength(code, 'utf8');
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✓ ${file.output} created (${minifiedSize} bytes, ${savings}% savings)`);
        
    } catch (error) {
        console.error(`✗ Error building ${file.input}:`, error);
    }
}

async function buildCore() {
    try {
        console.log('Building core bundle...');
        
        let combinedCode = '';
        coreFiles.forEach(filename => {
            const filePath = path.join(srcDir, filename);
            combinedCode += fs.readFileSync(filePath, 'utf8') + '\n\n';
        });
        
        const result = await minify(combinedCode, {
            compress: {
                drop_console: false,
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            mangle: {
                reserved: ['HolyLabelDOMUtils', 'HolyLabelPageState', 'HolyLabelAnimationConfig', 'DOMUtils', 'PageState', 'AnimationConfig']
            }
        });
        
        const banner = '/*! HOLY LABEL Core Bundle v1.0.0 | (c) 2024 | MIT License */';
        const minified = banner + '\n' + result.code;
        
        const outputPath = path.join(distDir, 'core.min.js');
        fs.writeFileSync(outputPath, minified);
        
        const originalSize = Buffer.byteLength(combinedCode, 'utf8');
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✓ core.min.js created (${minifiedSize} bytes, ${savings}% savings)`);
        
    } catch (error) {
        console.error('✗ Error building core bundle:', error);
    }
}

async function buildExtended() {
    try {
        console.log('Building extended bundle...');
        
        let combinedCode = '';
        extendedFiles.forEach(filename => {
            const filePath = path.join(srcDir, filename);
            combinedCode += fs.readFileSync(filePath, 'utf8') + '\n\n';
        });
        
        const result = await minify(combinedCode, {
            compress: {
                drop_console: false,
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            mangle: {
                reserved: ['HolyLabelAnimationManager', 'HolyLabelNavigationManager', 'HolyLabelModalUtils', 'AnimationManager', 'NavigationManager', 'initRestockNotificationModal']
            }
        });
        
        const banner = '/*! HOLY LABEL Extended Bundle v1.0.0 | (c) 2024 | MIT License */';
        const minified = banner + '\n' + result.code;
        
        const outputPath = path.join(distDir, 'extended.min.js');
        fs.writeFileSync(outputPath, minified);
        
        const originalSize = Buffer.byteLength(combinedCode, 'utf8');
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✓ extended.min.js created (${minifiedSize} bytes, ${savings}% savings)`);
        
    } catch (error) {
        console.error('✗ Error building extended bundle:', error);
    }
}

async function buildAdvanced() {
    try {
        console.log('Building advanced bundle...');
        
        let combinedCode = '';
        advancedFiles.forEach(filename => {
            const filePath = path.join(srcDir, filename);
            combinedCode += fs.readFileSync(filePath, 'utf8') + '\n\n';
        });
        
        const result = await minify(combinedCode, {
            compress: {
                drop_console: false,
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            mangle: {
                reserved: ['HolyLabelProductGallery', 'HolyLabelLoadMoreManager', 'HolyLabelLogoManager', 'ProductImageGallery', 'LoadMoreManager', 'LogoManager', 'initCategoryDisplay', 'controlInstagramButton']
            }
        });
        
        const banner = '/*! HOLY LABEL Advanced Bundle v1.0.0 | (c) 2024 | MIT License */';
        const minified = banner + '\n' + result.code;
        
        const outputPath = path.join(distDir, 'advanced.min.js');
        fs.writeFileSync(outputPath, minified);
        
        const originalSize = Buffer.byteLength(combinedCode, 'utf8');
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✓ advanced.min.js created (${minifiedSize} bytes, ${savings}% savings)`);
        
    } catch (error) {
        console.error('✗ Error building advanced bundle:', error);
    }
}

async function buildFinal() {
    try {
        console.log('Building final system bundle...');
        
        let combinedCode = '';
        finalFiles.forEach(filename => {
            const filePath = path.join(srcDir, filename);
            combinedCode += fs.readFileSync(filePath, 'utf8') + '\n\n';
        });
        
        const result = await minify(combinedCode, {
            compress: {
                drop_console: false,
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            mangle: {
                reserved: ['HolyLabelInitializationManager', 'HolyLabelLanguageManager', 'HolyLabelScrollManager', 'InitializationManager', 'LanguageManager', 'ScrollManager', 'switchLanguage', 'initCustomLanguageSwitcher']
            }
        });
        
        const banner = '/*! HOLY LABEL Final System Bundle v1.0.0 | (c) 2024 | MIT License */';
        const minified = banner + '\n' + result.code;
        
        const outputPath = path.join(distDir, 'final.min.js');
        fs.writeFileSync(outputPath, minified);
        
        const originalSize = Buffer.byteLength(combinedCode, 'utf8');
        const minifiedSize = Buffer.byteLength(minified, 'utf8');
        const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        
        console.log(`✓ final.min.js created (${minifiedSize} bytes, ${savings}% savings)`);
        
    } catch (error) {
        console.error('✗ Error building final bundle:', error);
    }
}

// 単一ファイル統合関数（新機能）
async function buildSingleFile() {
    console.log('🎯 単一ファイル統合開始: holy-label-all.min.js');
    
    // 統合順序（依存関係順）
    const consolidationOrder = [
        // Phase 1: Core (基盤機能)
        'dom-utils.js',
        'page-state.js', 
        'animation-config.js',
        
        // Phase 2: Extended (拡張機能)
        'animation-manager.js',
        'navigation-manager.js',
        'modal-utils.js',
        
        // Phase 3: Advanced (高度機能)
        'product-gallery.js',
        'loadmore-manager.js',
        'logo-manager.js',
        
        // Phase 4: Final (最終機能)
        'initialization-manager.js',
        'language-manager.js',
        'scroll-manager.js'
    ];
    
    let consolidatedCode = '';
    let totalOriginalSize = 0;
    let consolidatedFiles = [];
    
    // ヘッダーコメント
    consolidatedCode += `/*! HOLY LABEL JavaScript - All-in-One Bundle v1.0.0
 * Complete JavaScript library for HOLY LABEL BASE theme
 * github.com/irutomo/holy-label-js-divede
 * (c) 2024 HOLY LABEL | MIT License
 */\n\n`;
    
    console.log('📄 ファイル統合順序:');
    
    // 各ファイルを順序通りに統合
    for (const fileName of consolidationOrder) {
        const inputPath = path.join(srcDir, fileName);
        
        if (fs.existsSync(inputPath)) {
            const code = fs.readFileSync(inputPath, 'utf8');
            const fileSize = Buffer.byteLength(code, 'utf8');
            totalOriginalSize += fileSize;
            
            // ファイル区切りコメント追加
            consolidatedCode += `\n/* ========== ${fileName} ========== */\n`;
            consolidatedCode += code + '\n';
            
            consolidatedFiles.push({
                name: fileName,
                size: fileSize
            });
            
            console.log(`  ✅ ${fileName}: ${formatBytes(fileSize)}`);
        } else {
            console.warn(`  ⚠️  ${fileName}: ファイルが見つかりません`);
        }
    }
    
    // JavaScript最適化
    console.log('⚡ JavaScript最適化処理中...');
    
    // 全てのHolyLabel関数名を保護
    const reservedNames = [
        'HolyLabelDOMUtils', 'HolyLabelPageState', 'HolyLabelAnimationConfig',
        'HolyLabelAnimationManager', 'HolyLabelNavigationManager', 'HolyLabelModalUtils',
        'HolyLabelProductGallery', 'HolyLabelLoadMoreManager', 'HolyLabelLogoManager',
        'HolyLabelInitializationManager', 'HolyLabelLanguageManager', 'HolyLabelScrollManager',
        'DOMUtils', 'PageState', 'AnimationConfig', 'AnimationManager', 'NavigationManager',
        'ProductImageGallery', 'LoadMoreManager', 'LogoManager', 'InitializationManager',
        'LanguageManager', 'ScrollManager', 'switchLanguage', 'initRestockNotificationModal',
        'initCategoryDisplay', 'controlInstagramButton', 'initCustomLanguageSwitcher'
    ];
    
    const result = await minify(consolidatedCode, {
        compress: {
            drop_console: false,
            drop_debugger: true,
            pure_funcs: ['console.log']
        },
        mangle: {
            reserved: reservedNames
        },
        format: {
            comments: function(node, comment) {
                return comment.value.includes('HOLY LABEL');
            }
        }
    });
    
    if (result.error) {
        throw result.error;
    }
    
    // ヘッダーを保持して最終ファイル生成
    const finalCode = '/*! HOLY LABEL JavaScript - All-in-One Bundle v1.0.0 | Complete JS library | github.com/irutomo/holy-label-js-divede */\n' + result.code;
    
    // ファイル出力
    const outputPath = path.join(distDir, 'holy-label-all.min.js');
    fs.writeFileSync(outputPath, finalCode);
    
    const finalSize = Buffer.byteLength(finalCode, 'utf8');
    const reduction = ((totalOriginalSize - finalSize) / totalOriginalSize * 100).toFixed(1);
    
    console.log('\n🎯 単一ファイル統合完了:');
    console.log('=' .repeat(50));
    console.log(`統合ファイル数: ${consolidatedFiles.length}`);
    console.log(`元サイズ: ${formatBytes(totalOriginalSize)}`);
    console.log(`最終サイズ: ${formatBytes(finalSize)}`);
    console.log(`削減率: ${reduction}%`);
    console.log(`出力ファイル: holy-label-all.min.js`);
    
    // CDN URL表示
    const cdnUrl = 'https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/holy-label-all.min.js';
    console.log(`CDN URL: ${cdnUrl}`);
    
    // 統合情報を保存
    const consolidationInfo = {
        timestamp: new Date().toISOString(),
        type: 'single_file_consolidation',
        outputFile: 'holy-label-all.min.js',
        totalFiles: consolidatedFiles.length,
        files: consolidatedFiles,
        totalOriginalSize,
        finalSize,
        reduction: parseFloat(reduction),
        cdnUrl
    };
    
    fs.writeFileSync(path.join(distDir, 'js-consolidation-info.json'), JSON.stringify(consolidationInfo, null, 2));
    
    return consolidationInfo;
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

async function build() {
    console.log('🚀 Starting HOLY LABEL JS build process...\n');
    
    // 個別ファイルビルド
    for (const file of files) {
        await buildSingle(file);
    }
    
    console.log('');
    
    // コアバンドルビルド
    await buildCore();
    
    console.log('');
    
    // 拡張バンドルビルド
    await buildExtended();
    
    console.log('');
    
    // 高度機能バンドルビルド
    await buildAdvanced();
    
    console.log('');
    
    // 最終統合バンドルビルド
    await buildFinal();
    
    console.log('\n✨ Build completed!');
    console.log('\nGenerated files:');
    console.log('【基盤ライブラリ】');
    console.log('- js/dist/dom-utils.min.js');
    console.log('- js/dist/page-state.min.js');
    console.log('- js/dist/animation-config.min.js');
    console.log('- js/dist/core.min.js (基盤統合版)');
    console.log('\n【機能ライブラリ】');
    console.log('- js/dist/animation-manager.min.js');
    console.log('- js/dist/navigation-manager.min.js');
    console.log('- js/dist/modal-utils.min.js');
    console.log('- js/dist/extended.min.js (機能統合版)');
    console.log('\n【高度機能ライブラリ】');
    console.log('- js/dist/product-gallery.min.js');
    console.log('- js/dist/loadmore-manager.min.js');
    console.log('- js/dist/logo-manager.min.js');
    console.log('- js/dist/advanced.min.js (高度機能統合版)');
    console.log('\n【最終統合ライブラリ】');
    console.log('- js/dist/initialization-manager.min.js');
    console.log('- js/dist/language-manager.min.js');
    console.log('- js/dist/scroll-manager.min.js');
    console.log('- js/dist/final.min.js (最終統合版)');
    console.log('\n🔗 主要CDN URLs:');
    console.log('📦 基盤: https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core.min.js');
    console.log('⚡ 拡張: https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/extended.min.js');
    console.log('🚀 高度: https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/advanced.min.js');
    console.log('🏁 最終: https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/final.min.js');
}

// 単一ファイル統合のみ実行
async function buildSingle() {
    console.log('🎯 HOLY LABEL JavaScript 単一ファイル統合モード\n');
    
    const consolidationResult = await buildSingleFile();
    
    console.log('\n✨ 単一ファイル統合完了！');
    console.log(`📁 出力: js/dist/${consolidationResult.outputFile}`);
    console.log(`🌐 CDN: ${consolidationResult.cdnUrl}`);
}

// すべてのビルド（個別 + バンドル + 単一ファイル）
async function buildAllWithConsolidation() {
    console.log('🚀 HOLY LABEL JavaScript 完全ビルドモード\n');
    
    // 従来のビルド実行
    await build();
    
    console.log('\n' + '='.repeat(60));
    
    // 単一ファイル統合追加
    const consolidationResult = await buildSingleFile();
    
    console.log('\n🎊 完全ビルド完了！');
    console.log('📦 生成ファイル:');
    console.log('  - 個別JS: 12ファイル');
    console.log('  - バンドルJS: 4ファイル');
    console.log(`  - 統合JS: ${consolidationResult.outputFile}`);
}

// コマンドライン引数の処理
const args = process.argv.slice(2);
const command = args[0] || 'default';

// エラーハンドリング付きビルド実行
async function run() {
    try {
        switch (command) {
            case 'single':
                await buildSingle();
                break;
            case 'all':
                await buildAllWithConsolidation();
                break;
            case 'bundles':
                await build();
                break;
            default:
                // デフォルトは従来のバンドルビルド
                await build();
                break;
        }
    } catch (error) {
        console.error('❌ ビルド失敗:', error);
        process.exit(1);
    }
}

run(); 