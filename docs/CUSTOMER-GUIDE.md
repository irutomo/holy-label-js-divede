# 🎨 HOLY LABELテーマ 顧客編集ガイド

**HTMLの知識がなくても安全に編集できる！画像挿入・カスタマイズマニュアル**

---

## 📋 このガイドについて

このガイドでは、HOLY LABELテーマで**顧客が安全に編集できる箇所**と**絶対に触ってはいけない箇所**を明確に区別して説明します。

### ⚠️ 重要な注意事項
- **緑色のマーク（✅）**: 安全に編集できます
- **赤色のマーク（❌）**: 絶対に触らないでください
- **黄色のマーク（⚠️）**: 注意が必要です

---

## 🖼️ 画像の挿入・変更箇所

### ✅ 1. メインビジュアル（ヒーロー画像）
**場所**: 行番号 122-125

```html
<!-- デスクトップ用画像 -->
<img src="https://basefile.akamaized.net/holylabel-official-ec/6858e8f347888/HLE382A4E383A1E383BCE382B7E38299E794BBE5838F-E7B7A8E99B86E6B888E381BF-E7B7A8E99B86E6B888E381BF28129.png" alt="Holy Label Collection" class="hero-image-desktop">

<!-- モバイル用画像 -->
<img src="https://basefile.akamaized.net/holylabel-official-ec/6857a47021abf/image30.png" alt="Holy Label Collection" class="hero-image-mobile">
```

**編集方法**:
1. BASE管理画面でアップロードした画像のURLをコピー
2. `src="ここの部分"`を新しいURLに変更
3. `alt="ここの部分"`に画像の説明を入力

**重要**: デスクトップ用とモバイル用の2つの画像が必要です！

### ✅ 2. アバウトページ画像
**場所**: 行番号 492-494

```html
<div class="about-image">
    <img src="https://basefile.akamaized.net/holylabel-official-ec/685dea2a874d4/E382B5E383B3E38395E3829AE383AB2822928129.png" alt="About Holy Label" />
</div>
```

**編集方法**:
1. `src="ここの部分"`を新しい画像URLに変更
2. `alt="ここの部分"`に適切な説明を入力

---

## 🔗 ソーシャルリンクの変更

### ✅ 3. Instagramリンク（複数箇所）
**場所1**: 行番号 495-506（アバウトページ内）
**場所2**: 行番号 632-638（固定ボタン）

```html
<!-- アバウトページ内のInstagramリンク -->
<a href="https://www.instagram.com/hello24___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" class="social-link">

<!-- 固定ボタンのInstagramリンク -->
<a href="https://www.instagram.com/hello24___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" class="instagram-fixed-btn">
```

**編集方法**:
1. `href="ここの部分"`を新しいInstagramのURLに変更

### ✅ 4. TikTokリンク
**場所**: 行番号 507-512

```html
<a href="https://www.tiktok.com/@hello24___" target="_blank" class="social-link">
```

**編集方法**:
1. `href="ここの部分"`を新しいTikTokのURLに変更

---

## 📝 テキストの変更

### ✅ 5. ナビゲーションメニュー
**場所**: 行番号 85-98

```html
<ul class="global-navigation__list mb4">
    <li><a href="{IndexPageURL}">HOME</a></li>
    <li>
        <a class="expand" href="#">ITEM</a>
        <!-- カテゴリは自動表示されます -->
    </li>
    <li><a href="{BlogPageURL}">LOOK BOOK</a></li>
    <li><a href="{AboutPageURL}">ABOUT</a></li>
    <li><a href="{ContactPageURL}">CONTACT</a></li>
</ul>
```

**編集可能なテキスト**:
- `HOME` → 他の言語に変更可能
- `ITEM` → 「商品」「PRODUCTS」等に変更可能
- `LOOK BOOK` → 「ルックブック」等に変更可能
- `ABOUT` → 「アバウト」等に変更可能
- `CONTACT` → 「お問い合わせ」等に変更可能

**⚠️ 注意**: `{IndexPageURL}` のような `{}` で囲まれた部分は絶対に変更しないでください！

---

## ❌ 絶対に触ってはいけない箇所

### 1. BASEテンプレート構文（最重要）
```html
{block:IndexPage}
{ItemTitle}
{ItemPrice}
{LogoTag}
{BASEMenuTag}
{PurchaseButton}
```
**理由**: BASEの機能と直結しており、変更するとサイトが動かなくなります

### 2. 外部ライブラリの読み込み部分
```html
<!-- HOLY LABEL CSS外部化 Phase 1-5 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/css/dist/...">

<!-- External JavaScript Libraries -->
<script src="https://cdn.jsdelivr.net/gh/irutomo/holy-label-js-divede@main/js/dist/..."></script>
```
**理由**: サイトの動作に必要な重要なファイルです

### 3. JavaScript コード
```html
<script>
// ここにあるすべてのコード
</script>
```
**理由**: サイトの機能を制御しているため、変更すると動作不良を起こします

### 4. CSS スタイル
```html
<style>
/* ここにあるすべてのスタイル */
</style>
```
**理由**: デザインが崩れる可能性があります

---

## 🛡️ 安全な編集手順

### 編集前の準備
1. **必ずバックアップを取る**
   - 編集前のHTMLファイルをコピーして保存
   - 日付付きのファイル名で保存（例：`holy-label-backup-2024-01-15.html`）

2. **少しずつ編集する**
   - 一度に複数箇所を変更せず、1つずつ確認

3. **編集後の確認**
   - BASEプレビュー機能で確認
   - 必ずスマートフォンでも表示確認

### 編集時のルール
1. **引用符（`"`）の削除・追加禁止**
   - ❌ `src=新しいURL` 
   - ✅ `src="新しいURL"`

2. **タグの削除・変更禁止**
   - ❌ `<img>` → `<image>`
   - ✅ src属性の中身だけ変更

3. **BASE構文は絶対に触らない**
   - `{}`で囲まれた部分は変更禁止

---

## 🔧 よくある質問

### Q: 画像が表示されません
**A**: 以下を確認してください
1. 画像URLが正しいか（BASE管理画面からコピーしたものか）
2. 引用符が正しくついているか
3. ファイル拡張子（.jpg, .png等）が含まれているか

### Q: サイトが真っ白になりました
**A**: 
1. バックアップファイルから復元
2. 最後に編集した箇所を元に戻す
3. BASEテンプレート構文（`{}`部分）を間違って削除していないか確認

### Q: スマホで表示が崩れます
**A**: 
1. メインビジュアルのモバイル用画像も変更したか確認
2. 極端に大きなサイズの画像を使用していないか確認

### Q: 新しいページを追加したい
**A**: 
1. BASE管理画面の「ページ」機能を使用
2. HTMLファイルでの追加は推奨しません（複雑なため）

---

## 📞 サポート

### 緊急時の連絡先
- 何か問題が発生した場合は、必ずバックアップから復元してください
- 技術的な問題については、開発者にご相談ください

### 編集代行サービス
- 自分で編集するのが不安な場合
- 複雑なカスタマイズが必要な場合
- 開発者による編集代行サービスをご利用ください

---

**⚠️ 重要**: このガイドに記載されていない箇所の編集は、開発者にご相談ください。無理な編集はサイトの動作不良を招く可能性があります。 