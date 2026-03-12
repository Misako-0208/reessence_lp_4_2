-- モニター応募フォーム用テーブル（/monitor ページの送信先）
-- Neon の SQL Editor で実行してください。

CREATE TABLE IF NOT EXISTS monitor_applications (
  id            serial PRIMARY KEY,
  name          text NOT NULL,
  postal_code   text NOT NULL,
  address       text NOT NULL,
  email         text NOT NULL,
  agree_skin_stop       boolean NOT NULL DEFAULT false,
  agree_not_pregnant    boolean NOT NULL DEFAULT false,
  agree_app_download    boolean NOT NULL DEFAULT false,
  wearable_device      text NOT NULL CHECK (wearable_device IN ('yes', 'no', 'unknown')),
  smartphone_os        text NOT NULL CHECK (smartphone_os IN ('ios', 'android', 'other')),
  source        text DEFAULT 'lp',
  created_at    timestamptz DEFAULT now()
);
