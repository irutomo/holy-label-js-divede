# 🖼️ HOLY LABEL 画像挿入・編集専用ガイド

**画像変更に特化した実践的マニュアル - HTMLの知識不要**

## 📸 編集可能画像マップ

### 🎯 画像設置場所一覧（優先度付き）

```
┌─────────────────────────────────────────────────┐
│               🥇 最優先編集箇所                  │
├─────────────────────────────────────────────────┤
│ 1. メインビジュアル（デスクトップ）151行          │
│ 2. メインビジュアル（モバイル）152行             │
│ 3. Aboutページ画像 430行                        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│               🥈 中優先編集箇所                  │
├─────────────────────────────────────────────────┤
│ 4. Instagramリンク（About内）432行              │
│ 5. Instagramリンク（固定ボタン）473行           │
│ 6. TikTokリンク 445行                           │
└─────────────────────────────────────────────────┘
```

## 🏠 1. メインビジュアル画像（最重要）

### 📍 場所と目的
- **行番号**: 151-152行
- **表示場所**: ホームページの最上部
- **役割**: 第一印象を決める最重要画像
- **2枚必須**: デスクトップ用とモバイル用

### 📏 推奨画像サイズ
```
デスクトップ用: 1920×800px以上（横長）
モバイル用: 750×1000px以上（縦長）
ファイル形式: JPEG、PNG
ファイルサイズ: 各500KB以下推奨
```

### 🔧 編集方法

#### ✅ 正しい編集例
```html
【変更前】
<img src="https://basefile.akamaized.net/holylabel-official-ec/6858e8f347888/古い画像.png" alt="Holy Label Collection" class="hero-image-desktop">
<img src="https://basefile.akamaized.net/holylabel-official-ec/6857a47021abf/古い画像.png" alt="Holy Label Collection" class="hero-image-mobile">

【変更後】
<img src="https://basefile.akamaized.net/holylabel-official-ec/新しいフォルダ/新しい画像.png" alt="Holy Label Collection" class="hero-image-desktop">
<img src="https://basefile.akamaized.net/holylabel-official-ec/新しいフォルダ/新しい画像.png" alt="Holy Label Collection" class="hero-image-mobile">
```

#### ❌ 間違った編集例
```html
❌ src部分を削除
<img "https://basefile.akamaized.net/..." alt="Holy Label Collection" class="...">

❌ classを変更
<img src="..." alt="..." class="my-custom-class">

❌ altを削除
<img src="..." class="hero-image-desktop">
```

### 🎯 編集手順（ステップバイステップ）
1. **BASE管理画面で画像をアップロード**
2. **画像URLをコピー** 
   ```
   https://basefile.akamaized.net/holylabel-official-ec/xxxxxxx/画像名.jpg
   ```
3. **HTMLファイルの151行目を探す**
4. **`src="`から次の`"`まで（URLのみ）を新しいURLに置換**
5. **152行目も同様に変更**
6. **保存して確認**

## 🌟 2. Aboutページ画像

### 📍 場所と目的
- **行番号**: 430行
- **表示場所**: Aboutページ内
- **役割**: ブランドストーリーを伝える重要画像

### 📏 推奨画像サイズ
```
サイズ: 800×600px以上
アスペクト比: 4:3または16:9
ファイル形式: JPEG、PNG
ファイルサイズ: 300KB以下推奨
```

### 🔧 編集方法

#### ✅ 正しい編集例
```html
【変更前】
<img src="https://basefile.akamaized.net/holylabel-official-ec/685dea2a874d4/古い画像.png" alt="About Holy Label" />

【変更後】  
<img src="https://basefile.akamaized.net/holylabel-official-ec/新しいフォルダ/新しい画像.jpg" alt="About Holy Label" />
```

## 📱 3. ソーシャルリンク設定

### Instagram（2箇所設定必要）

#### 📍 場所1: Aboutページ内（432行）
```html
✅ 編集可能（href内のURLのみ変更）
<a href="新しいInstagramのURL" target="_blank" class="social-link">

【例】
<a href="https://www.instagram.com/your_account/" target="_blank" class="social-link">
```

#### 📍 場所2: 固定ボタン（473行）
```html
✅ 編集可能（href内のURLのみ変更）
<a href="新しいInstagramのURL" target="_blank" class="instagram-fixed-btn">

【例】
<a href="https://www.instagram.com/your_account/" target="_blank" class="instagram-fixed-btn">
```

### TikTok（445行）
```html
✅ 編集可能（href内のURLのみ変更）
<a href="新しいTikTokのURL" target="_blank" class="social-link">

【例】
<a href="https://www.tiktok.com/@your_account" target="_blank" class="social-link">
```

## 🔍 BASE画像URL形式の理解

### BASE標準画像URL構造
```
https://basefile.akamaized.net/ショップID/フォルダID/画像ファイル名.拡張子

【例】
https://basefile.akamaized.net/holylabel-official-ec/6858e8f347888/sample.jpg
                                ↑              ↑            ↑
                             ショップID      フォルダID   ファイル名
```

### 画像アップロード → URL取得手順
1. **BASE管理画面にログイン**
2. **「ショップデザイン」→「画像をアップロード」**
3. **画像ファイルを選択してアップロード**
4. **アップロード完了後、URLをコピー**
5. **HTMLファイルのsrc=""内に貼り付け**

## 🎨 画像最適化のベストプラクティス

### 📏 推奨画像仕様
```
┌─────────────────────┬──────────────┬────────────┬─────────────┐
│ 使用箇所            │ 推奨サイズ   │ アスペクト比│ ファイルサイズ│
├─────────────────────┼──────────────┼────────────┼─────────────┤
│ メインビジュアル(PC)│ 1920×800px  │ 2.4:1      │ 500KB以下   │
│ メインビジュアル(SP)│ 750×1000px  │ 3:4        │ 400KB以下   │
│ Aboutページ画像     │ 800×600px   │ 4:3        │ 300KB以下   │
└─────────────────────┴──────────────┴────────────┴─────────────┘
```

### 🛠️ 画像最適化手順
1. **画像編集ソフトで適切なサイズにリサイズ**
2. **JPEG品質を80-90%に設定**
3. **ファイルサイズを確認**
4. **BASE管理画面にアップロード**
5. **HTML編集・確認**

## ⚠️ よくある間違いと対処法

### ❌ 間違い1: 引用符の削除
```html
間違い: <img src=新しいURL alt="..." class="...">
正解:   <img src="新しいURL" alt="..." class="...">
```

### ❌ 間違い2: 不要な属性変更
```html
間違い: <img src="..." alt="..." class="my-style">
正解:   <img src="..." alt="..." class="hero-image-desktop">
```

### ❌ 間違い3: URLの前後にスペース
```html
間違い: <img src=" https://basefile... " alt="...">
正解:   <img src="https://basefile..." alt="...">
```

### ❌ 間違い4: ファイル拡張子の忘れ
```html
間違い: <img src="https://basefile.../image" alt="...">
正解:   <img src="https://basefile.../image.jpg" alt="...">
```

## 🧪 動作確認チェックリスト

### 編集後の必須確認項目
- [ ] **画像表示確認**: ブラウザでページを開いて画像が表示されるか
- [ ] **レスポンシブ確認**: スマートフォンでも正しく表示されるか
- [ ] **読み込み速度**: 画像の読み込みが適切な速度か
- [ ] **リンク動作**: ソーシャルリンクが正しく機能するか

### トラブル時の確認ポイント
```
✅ 画像URLが正確にコピーされているか
✅ BASE管理画面で画像が正しくアップロードされているか
✅ ファイル拡張子（.jpg, .png）が含まれているか
✅ URLに余分なスペースが含まれていないか
✅ 引用符（"）が正しく配置されているか
```

## 🔄 編集作業の効率的な流れ

### 推奨ワークフロー
```
1. 編集計画立案
   ↓
2. 画像準備・最適化
   ↓  
3. BASE管理画面でアップロード
   ↓
4. URLコピー・メモ
   ↓
5. HTMLバックアップ作成
   ↓
6. HTML編集（1箇所ずつ）
   ↓
7. 保存・確認
   ↓
8. 次の画像へ（2に戻る）
```

### 作業時間の目安
- **メインビジュアル変更**: 15-20分
- **Aboutページ画像変更**: 10-15分  
- **ソーシャルリンク変更**: 5-10分
- **全体確認・テスト**: 10-15分

## 📞 困った時のサポート

### 自己解決チェック
1. **バックアップファイルから復元**
2. **ブラウザのキャッシュクリア**
3. **画像URLの再確認**
4. **ファイルサイズの確認**

### サポート連絡時の準備
```
📋 連絡前に準備する情報
- 変更しようとした画像の種類
- 元の画像URL
- 新しい画像URL  
- エラーメッセージ（あれば）
- 使用ブラウザとバージョン
- バックアップファイルの有無
```

## 🎯 まとめ：安全な画像編集のポイント

### ✅ 守るべき基本原則
1. **必ずバックアップを作成**
2. **1つずつ変更して確認**
3. **BASEテンプレート構文（`{}`）は触らない**
4. **src=""内のURLのみ変更**
5. **href=""内のリンクのみ変更**

### 🚀 成功のコツ
- **段階的に作業**: 一度に全部変更せず、1つずつ確認
- **テスト環境活用**: 可能なら別環境で事前テスト
- **画像最適化**: 適切なサイズとファイル形式で準備
- **記録保持**: 変更内容をメモして履歴管理 