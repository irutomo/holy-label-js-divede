# 🎨 HOLY LABEL 顧客向け編集ガイド

**HTMLの知識がない方でも安全に画像とテキストを変更できる専用ガイド**

## 🚨 重要：編集前の注意事項

### ⚠️ 絶対に触ってはいけない箇所
```html
❌ これらは絶対に変更禁止！
{LogoTag}              ← 波括弧で囲まれた部分
{BASEMenuTag}          ← BASE機能部分
{ItemImage1URL-500}    ← 商品画像は自動表示
<script src="https://  ← 外部ライブラリ読み込み
<link rel="stylesheet" ← CSSファイル読み込み
```

### ✅ 安全に編集できる箇所
- 🖼️ **画像URL**（httpから始まる画像のアドレス）
- 📝 **テキスト内容**（日本語・英語のテキスト）
- 🔗 **ソーシャルリンク**（Instagram、TikTokのURL）

## 📍 編集可能箇所マップ

### 🏠 1. メインビジュアル画像（最優先）

**📍 場所**: 151-152行目
**🎯 目的**: ホームページの第一印象を決める重要な画像

```html
✅ 編集可能（画像URLのみ変更）
<img src="ここの画像URLを変更" alt="Holy Label Collection" class="hero-image-desktop">
<img src="ここの画像URLを変更" alt="Holy Label Collection" class="hero-image-mobile">
```

**📏 推奨サイズ**:
- デスクトップ用: 1920×800px以上
- モバイル用: 750×1000px以上

**🔄 変更手順**:
1. `src="https://basefile.akamaized.net/holylabel-official-ec/..."`の部分を探す
2. `"`マークの間のURLだけを新しい画像URLに変更
3. デスクトップ用とモバイル用の2箇所を変更

### 🌟 2. Aboutページ画像

**📍 場所**: 430行目
**🎯 目的**: ブランドの世界観を伝える画像

```html
✅ 編集可能（画像URLのみ変更）
<img src="ここの画像URLを変更" alt="About Holy Label" />
```

**📏 推奨サイズ**: 800×600px以上

### 📱 3. ソーシャルリンク設定

#### Instagram（2箇所）

**📍 場所1**: 432行目（Aboutページ内）
```html
✅ 編集可能（URLのみ変更）
<a href="新しいInstagramのURLを入力" target="_blank" class="social-link">
```

**📍 場所2**: 473行目（固定ボタン）
```html
✅ 編集可能（URLのみ変更）
<a href="新しいInstagramのURLを入力" target="_blank" class="instagram-fixed-btn">
```

#### TikTok

**📍 場所**: 445行目（Aboutページ内）
```html
✅ 編集可能（URLのみ変更）
<a href="新しいTikTokのURLを入力" target="_blank" class="social-link">
```

### 🧭 4. ナビゲーションメニューテキスト

**📍 場所**: 102-119行目
**🎯 目的**: メニューの表示名を変更

```html
✅ 編集可能（テキストのみ変更）
<li><a href="{IndexPageURL}">HOME</a></li>
<li><a href="#">ITEM</a></li>
<li><a href="{BlogPageURL}">LOOK BOOK</a></li>
<li><a href="{AboutPageURL}">ABOUT</a></li>
<li><a href="{ContactPageURL}">CONTACT</a></li>
```

**⚠️ 注意**: `{}`で囲まれた部分は絶対に変更しない！

## 🔧 安全な編集手順

### Step 1: バックアップ作成
```
1. 編集前に必ずHTMLファイル全体をコピー
2. 「holy-label-backup-YYYY-MM-DD.html」として保存
3. 間違えた時はこのファイルに戻す
```

### Step 2: 画像URL変更方法

**✅ 正しい例**:
```html
変更前: src="https://basefile.akamaized.net/holylabel-official-ec/6858e8f347888/古い画像.png"
変更後: src="https://basefile.akamaized.net/holylabel-official-ec/6858e8f347888/新しい画像.png"
```

**❌ 間違った例**:
```html
❌ src=" を削除してしまった
❌ class="hero-image-desktop" を変更してしまった
❌ alt="Holy Label Collection" を変更してしまった
```

### Step 3: テキスト変更方法

**✅ 正しい例**:
```html
変更前: <li><a href="{IndexPageURL}">HOME</a></li>
変更後: <li><a href="{IndexPageURL}">ホーム</a></li>
```

**❌ 間違った例**:
```html
❌ {IndexPageURL} を変更してしまった
❌ <li><a href= を削除してしまった
```

## 🆘 トラブルシューティング

### Q1: 画像が表示されない
**A**: 以下を確認してください
- ✅ 画像URLが「https://」で始まっている
- ✅ 画像URLの前後に余分なスペースがない
- ✅ `"`マークが正しく設置されている

### Q2: レイアウトが崩れた
**A**: 以下をチェックしてください
- ✅ `<`や`>`を誤って削除していない
- ✅ `"`マークを誤って削除していない
- ✅ BASEテンプレート構文（`{}`）を変更していない

### Q3: メニューが動かない
**A**: 以下を確認してください
- ✅ `{}`で囲まれた部分を変更していない
- ✅ `href="`の部分を変更していない
- ✅ `<li>`や`<a>`タグを削除していない

## 🚨 緊急時の復旧方法

### 完全に壊れてしまった場合
1. **バックアップファイルを使用**:
   ```
   holy-label-backup-YYYY-MM-DD.html をコピー
   元のファイル名に戻す
   ```

2. **GitHubからの復旧**（技術者向け）:
   ```bash
   git checkout HEAD -- holy-label-js-divede.html
   ```

3. **専門家への依頼**:
   ```
   編集内容をメモに残して技術者に依頼
   「○○の画像を△△に変更したい」
   「□□のテキストを××に変更したい」
   ```

## 📋 編集チェックリスト

### 編集前チェック ☑️
- [ ] バックアップファイルを作成した
- [ ] 変更したい箇所の行番号を確認した
- [ ] 新しい画像URLを準備した

### 編集中チェック ☑️
- [ ] `{}`で囲まれた部分は変更していない
- [ ] `"`マークは正しく設置されている
- [ ] HTMLタグ（`<>`）は削除していない

### 編集後チェック ☑️
- [ ] ブラウザでプレビュー確認した
- [ ] 画像が正しく表示されている
- [ ] メニューが正常に動作している
- [ ] スマートフォンでも確認した

## 🎯 編集作業の優先順位

### 🥇 最優先（必ず変更推奨）
1. **メインビジュアル画像**（デスクトップ・モバイル）
2. **Aboutページ画像**

### 🥈 中優先（必要に応じて変更）
3. **ソーシャルリンク**（Instagram、TikTok）
4. **ナビゲーションテキスト**

### 🥉 低優先（通常は変更不要）
5. その他のテキスト内容

## 📞 サポート連絡先

技術的な問題が発生した場合：
- 📧 **メール**: [技術サポートアドレス]
- 📱 **電話**: [サポート電話番号]
- 💬 **チャット**: [サポートチャット]

**連絡時に準備いただく情報**：
1. 変更しようとした内容
2. エラーメッセージ（あれば）
3. 使用ブラウザとデバイス情報
4. バックアップファイルの有無 