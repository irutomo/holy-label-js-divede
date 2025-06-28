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
    }
];

// コアライブラリ統合版
const coreFiles = ['dom-utils.js', 'page-state.js', 'animation-config.js'];

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

async function build() {
    console.log('🚀 Starting HOLY LABEL JS build process...\n');
    
    // 個別ファイルビルド
    for (const file of files) {
        await buildSingle(file);
    }
    
    console.log('');
    
    // コアバンドルビルド
    await buildCore();
    
    console.log('\n✨ Build completed!');
    console.log('\nGenerated files:');
    console.log('- js/dist/dom-utils.min.js');
    console.log('- js/dist/page-state.min.js');
    console.log('- js/dist/animation-config.min.js');
    console.log('- js/dist/core.min.js (combined)');
    console.log('\nCDN URLs:');
    console.log('https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core.min.js');
    console.log('https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/dom-utils.min.js');
}

build(); 