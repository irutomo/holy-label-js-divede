# HOLY LABEL JavaScript・CSS外部化プロジェクト

[![jsDelivr](https://img.shields.io/badge/CDN-jsDelivr-orange.svg)](https://www.jsdelivr.com/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![File Size Reduction](https://img.shields.io/badge/サイズ削減-41.2%25-success.svg)]()

> BASEテーマ「HOLY LABEL」の154,386文字HTMLファイルを15,000文字制限に対応させるための大規模外部化プロジェクト。JavaScript・CSS機能をjsDelivr CDNで配信し、41.2%の大幅削減を達成。

## 🎯 プロジェクト概要

### 達成状況
- **元ファイルサイズ**: 154,386バイト
- **現在ファイルサイズ**: 90,800バイト  
- **削減達成**: 63,586バイト（**41.2%削減**）
- **目標**: 15,000バイト制限対応

### 技術スタック
- **CDN配信**: jsDelivr
- **JavaScript圧縮**: Terser
- **CSS圧縮**: PostCSS + cssnano
- **ビルドシステム**: Node.js
- **バージョン管理**: GitHub

## 📁 プロジェクト構造

```
holy-label-js-divede/
├── 📄 holy-label-js-divede.html    # メインHTMLファイル（90.8KB）
├── 📁 js/                          # JavaScript外部化
│   ├── 📁 src/                     # ソースファイル
│   ├── 📁 dist/                    # 圧縮済みライブラリ
│   ├── 📁 config/                  # 設定ファイル
│   └── 🔧 build.js                 # ビルドスクリプト
├── 📁 css/                         # CSS外部化
│   ├── 📁 src/                     # ソースファイル
│   ├── 📁 dist/                    # 圧縮済みライブラリ
│   ├── 📁 config/                  # 設定ファイル
│   └── 🔧 build.js                 # ビルドスクリプト
├── 📁 docs/                        # プロジェクトドキュメント
└── 📁 BK/                          # バックアップファイル
```

## 🚀 外部化実装済み機能

### JavaScript（4フェーズ完了）
| フェーズ | ライブラリ | 機能 | 削減量 |
|---------|-----------|------|---------|
| **Phase 1** | Core Bundle | DOMUtils、PageState、AnimationConfig | 3,530 bytes |
| **Phase 2** | Extended Bundle | AnimationManager、NavigationManager、ModalUtils | 9,723 bytes |
| **Phase 3** | Advanced Bundle | ProductImageGallery、LoadMoreManager、LogoManager | 11,315 bytes |
| **Phase 4** | Final Bundle | InitializationManager、LanguageManager、ScrollManager | 7,908 bytes |

**JavaScript総削減**: 20,399文字（12.7%削減）

### CSS（4フェーズ完了）
| フェーズ | ライブラリ | 機能 | 削減量 |
|---------|-----------|------|---------|
| **Phase 1** | Foundation Bundle | foundation.css、layout.css | 5,796 bytes |
| **Phase 2** | Components Bundle | base-menu.css、product-components.css、animations.css | 6,757 bytes |
| **Phase 3** | Product Bundle | product-detail.css、forms.css、responsive.css、footer-pages.css | 16,822 bytes |
| **Phase 4** | Special Bundle | special-pages.css、ui-components.css、base-integration.css | 18,410 bytes |

**CSS総削減**: 47,785文字（30.9%削減）

## 📖 ドキュメント

詳細な実装情報とガイドは`docs/`フォルダをご参照ください：

- **[📋 実装ガイド](docs/IMPLEMENTATION.md)** - 外部化実装の詳細手順
- **[🎮 使い方ガイド](docs/USAGE.md)** - CDNライブラリの使用方法
- **[🔗 CDNリファレンス](docs/CDN-REFERENCE.md)** - 全ライブラリのCDNリンク集
- **[🛠 トラブルシューティング](docs/TROUBLESHOOTING.md)** - よくある問題と解決方法
- **[📝 変更履歴](docs/CHANGELOG.md)** - 実装履歴とバージョン情報

## ⚡ クイックスタート

### 1. CDNライブラリの使用

HTMLファイルに以下のCDNリンクを追加：

```html
<!-- JavaScript外部ライブラリ -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/core-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/extended-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/advanced-bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/final-bundle.min.js"></script>

<!-- CSS外部ライブラリ -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/foundation-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/components-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/product-detail-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/forms-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/responsive-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/footer-pages-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/special-pages-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/ui-components-bundle.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/base-integration-bundle.min.css">
```

### 2. ローカル開発

```bash
# プロジェクトクローン
git clone https://github.com/irutomo/holy-label-js-divede.git
cd holy-label-js-divede

# 依存関係インストール
npm install

# JavaScript再ビルド
cd js && node build.js

# CSS再ビルド  
cd css && node build.js
```

## 🎉 主な成果

### ✅ 大幅なファイルサイズ削減
- **41.2%削減**（154.4KB → 90.8KB）
- 63.6KBの外部化成功

### ✅ BASEテーマ史上初の外部ライブラリ体系
- JavaScript 4ライブラリ
- CSS 12ライブラリ・9バンドル
- jsDelivr CDN即座配信

### ✅ 後方互換性完全保証
- 既存機能の完全動作
- BASEテンプレート仕様準拠
- パフォーマンス向上

### ✅ 効率的な開発体系構築
- 自動ビルドシステム
- GitHub Actions対応
- モジュール化された管理

## 📞 サポート

問題が発生した場合は：
1. [トラブルシューティングガイド](docs/TROUBLESHOOTING.md)を確認
2. [GitHub Issues](https://github.com/irutomo/holy-label-js-divede/issues)で報告
3. [実装ガイド](docs/IMPLEMENTATION.md)で詳細を確認

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

---

**HOLY LABEL外部化プロジェクト** - BASEテーマの新しい可能性を切り開く 