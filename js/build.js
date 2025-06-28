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
    }
];

// コアライブラリ統合版（基盤）
const coreFiles = ['dom-utils.js', 'page-state.js', 'animation-config.js'];

// 拡張ライブラリ統合版（機能モジュール）
const extendedFiles = ['animation-manager.js', 'navigation-manager.js', 'modal-utils.js'];

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
    console.log('\n🔗 主要CDN URLs:');
    console.log('📦 基盤: https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core.min.js');
    console.log('⚡ 拡張: https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/extended.min.js');
}

build(); 