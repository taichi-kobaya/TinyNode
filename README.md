# TinyNode
## フェーズ0：ゴールの設定

- **目的**：
    - Node.jsの「基本構造」（イベントループ、モジュール、非同期処理など）を知る。
    - 関数型プログラミングで表現してみる。
- **作るもの**の例：
    - 超簡易的なNode.jsランタイム（REPL風でもOK）
    - 独自の非同期実行環境（簡易イベントループ）
    - 簡易モジュールローダー

---

## フェーズ1：Node.jsの基本構造を知る

- **何を調べるか**：
    - Node.jsの構成：V8 + libuv + Node独自API
    - コアコンポーネント：イベントループ、モジュール、非同期IO、コールバック
- **やること**：
    - Hello world的なNodeコードを関数型っぽく書き直す練習
    - `fs.readFile`などの非同期APIをPromiseや関数合成でラップしてみる

---

## フェーズ2：超簡易イベントループを作る

- **目的**：
    - Node.jsのイベントループの原型を自作して理解
    - 関数でイベントとコールバックを管理
- **作るものの例**：
    
    ```jsx
    const queue = [];
    
    function setTimeoutFake(fn, delay) {
      queue.push({ fn, time: Date.now() + delay });
    }
    
    function runEventLoop() {
      const interval = setInterval(() => {
        const now = Date.now();
        queue.forEach((item, i) => {
          if (item.time <= now) {
            item.fn();
            queue.splice(i, 1);
          }
        });
        if (queue.length === 0) clearInterval(interval);
      }, 10);
    }
    ```
    
- **関数型風に改善**：
    - 副作用を外に出す
    - 状態の変化を純粋関数で扱う

---

## フェーズ3：簡易モジュールシステムを作る

- `require`のような仕組みを模倣
- ファイル読み込み + キャッシュ + スコープ分離（IIFE）
- これも関数合成・カリー化で機能単位に分解

---

## フェーズ4：非同期処理のモデルを作る

- **目的**：コールバック地獄 → Promise → async/awaitの理解
- `Promise`風の構造を関数で作ってみる（miniPromise）

---

## フェーズ5：REPL風環境 or CLIコマンドランナー

- ミニNode実行環境を構築
- 入力されたコードを評価し、非同期処理を内部イベントループで回す

---

## フェーズ6：振り返りと拡張

- 関数型でどこまで記述できたかの整理
- 拡張案：
    - モジュールのESM対応
    - `fs`の一部を模倣
    - クロスプラットフォーム対応風抽象化

---

## 補足：関数型の観点を保つポイント

- 状態を明示し、副作用を隔離
- `map`, `reduce`, `compose`, `pipe`, `curry` などの関数を自作
- 副作用は最後の出口だけで起こす