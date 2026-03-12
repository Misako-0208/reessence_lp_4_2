# PDF申込・自動送付の仕組み

## 流れ

1. ユーザーがLP下部の「PDFプレゼント」フォームで名前・メールアドレスを入力して送信
2. **記録**: 申込内容が Neon の `leads` テーブルに保存される（`source = 'lp-pdf-signup'`）
3. **メール送信**: Resend を使って申込者にメールを送信
   - **PDFを配置している場合**: メールに「症状日誌ガイド.pdf」を添付して送信
   - **PDFをまだ配置していない場合**: 「PDFは準備でき次第お送りします」旨のメールのみ送信

## セットアップ

### 1. PDFファイルの配置

- ファイル名: **`symptom-diary-guide.pdf`**
- 配置場所: **`public/pdfs/`** フォルダ

PDFを置くまででも申込の記録とメール送信は行われます（その場合は添付なしのメールのみ）。

### 2. メール送信（Resend）の設定

1. [Resend](https://resend.com) でアカウントを作成し、APIキーを発行する
2. 送信元として使うメールアドレス（またはドメイン）をResendで認証する
3. 環境変数を設定する:
   - **`RESEND_API_KEY`**: ResendのAPIキー（必須・メール送信を行う場合）
   - **`PDF_FROM_EMAIL`**: 送信元メール（例: `ReEssence <noreply@yourdomain.com>`）。未設定時は Resend の onboarding 用アドレスが使われます

ローカルでは `.env.local`、Vercel では Project Settings → Environment Variables に追加してください。

### 3. 依存パッケージ

メール送信用に `resend` を追加しています。初回は以下を実行してください。

```bash
npm install
```

## 注意

- `RESEND_API_KEY` が未設定の場合、Neon への記録は行われますがメールは送信されません（コンソールに警告が出ます）
- 送信元メールは Resend で認証済みのドメイン／アドレスである必要があります
