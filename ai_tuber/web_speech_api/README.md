# 対話型AIにおすすめ 無料で扱いやすい音声認識 Web Speech APIのすすめ

# 前置き
この記事はQiita Advent Calendar 2025 / ひとりアドベントカレンダー 分野における ふぐおの配信関係多めひとり Advent Calendar 2025 の1 日目記事となります。

https://qiita.com/advent-calendar/2025/fuguo_2025

こんにちは! AI Tuberなどの開発を行っているふぐおです。
AI Tuberや対話型AIを作るときに、**リアルタイム音声認識**が必要な場面があると思います。
色んなところでWhisperを使う記事がよく出てきますが、私が制作した**対話型AI Tuber**は**Web Speech API**を使用しています。
**技術選定の理由**と**実際の使い方**も軽く説明していきたいと思います。

# Web Speech APIを使うメリット

- 無料である
- 音声ファイルを作る必要がない
- 難しい知識が不要
- まあまあな認識精度

## 音声ファイルを作る必要がない
**音声認識**について調べると、**Whisper**がよく勧められています。
しかし、**Whisperはマイク入力を直接受け取れません**。
なので、**音声ファイルを作る必要があります**。この音声ファイルを作るというのがすごい**面倒**なんですよね。なぜなら、録音開始→会話の切れ目を認識して録音終了という処理をずっと繰り返す必要があります。
この会話の切れ目を認識するという機能はWhisper自体に無いので、自分でなんとかするしかないからです。
音声文字入力とかなら、ユーザーにボタンを押してもらえばいいんですけどね。
一方、Web Speech APIは**マイクからダイレクト**に入力され、**会話の切れ目を自動で認識**して、**都度文字起こし**してくれます。

# デメリット
- **Google Chromeがほぼ必須**

ブラウザを使って文字起こしするため**ブラウザが必須**です。**ブラウザによって音声認識の精度が変わります**。Google Chromeは音声をサーバーに送信しています。バックエンドに恐らくspeech recognition apiを使っているので、高品質な文字起こしができます。他のブラウザ、例えばMicrosoft Edgeとかでも使えるけど、うん。

# 使い方
## 【使い方その1】コードを書かないで使いたい場合
ゆかりネットコネクターを使うと、ソフトをインストールするだけで使えます。
後は自作のプログラムとゆかりネットコネクターをWebSocketで接続すれば、完了です。
詳しい使い方は公式サイトを見てみてください。

https://nmori.github.io/yncneo-Docs/guide/quickstart/#_2

## 【使い方その2】自作する場合。

MDNを見て、実装してみてください。

https://developer.mozilla.org/ja/docs/Web/API/SpeechRecognition

一応、私なりの最小限のコードをおいておきます。

```html
<!DOCTYPE html>
<html lang="ja">
<body>
    <div id="output"></div>

    <script>
        const outputDiv = document.getElementById('output');

        function startRecognition() {
            const api = new SpeechRecognition();
            api.lang = "ja";
            
            api.onresult = (event) => {
                outputDiv.innerText += event.results[0][0].transcript + "\n";
            };

            // 止まったら再開（ループ）
            api.onend = () => api.start();
            
            api.start();
        }

        startRecognition();
    </script>
</body>
</html>
```

ミソは`api.onend = () => api.start();`です。
このAPIは一つの文を文字起こししたら、終了してしまう仕様になっているので、継続的に音声認識をしたい場合は、**終了したら再度再開**するようにしてあげれば、永遠に音声認識してくれます。

ちなみに、このAPIは**httpsでのみ使用可能**なので、サーバーに上げなければいけません。Cloudflare Workersとかを使えば、一瞬でサーバーに上げられます。
参考になりそうなredditの投稿をおいておきます。

https://www.reddit.com/r/CloudFlare/comments/1ktpj8a/hosting_simple_html_pages/?tl=ja

# 精度はどうなの？
以下の**リンクから試せる**ようにしておきました。
マイクを許可すると文字認識されるはずです。
**上記に書いたコードをそのままデプロイ**したものです。

https://odd-band-5c7e.boxfish893.workers.dev/webspeechtest

またゆかりネットを使って配信しているゆかりネッターの方々も参考になると思います。

https://live.nicovideo.jp/search?keyword=%E3%82%86%E3%81%8B%E3%82%8A%E3%83%8D%E3%83%83%E3%83%88
