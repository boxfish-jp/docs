# 対話型AIにおすすめ 無料で扱いやすい音声認識web speech apiのすすめ

# 
こんにちは! AI Tuberなどの開発を行っているふぐおです。
AI Tuberや対話型AIを作るときに、リアルタイム音声認識が必要な場面があると思います。
結構色んなところでwhisperを使う記事がよく出てきますが、私が制作した対話型AI Tuberはweb speech apiを使用しています。
なぜこの技術を使用して、実際の使い方も軽く説明していきたいと思います。

## 目次

## web speech apiを使うメリット

- 無料である。
- 音声ファイルを作る必要がない。
- 難しい知識が不要。

### 音声ファイルを作る必要がない。
音声認識について調べると、whisperがよく勧められています。
しかし、whisperはマイク入力を直接受け取れません。
なので、音声ファイルを作る必要があります。この音声ファイルを作るというのがすごい面倒なんですよね。なぜなら、録音開始→会話の切れ目を認識して録音終了という処理をずっと繰り返す必要があります。
この喋っている文の切れ目を認識するという機能はwhisperに自体に無いので、自分でなんとかするしかないからです。
音声文字入力とかなら、ユーザーにボタンを押してもらえばいいんですけどね。
一方、web speech apiはマイクからダイレクトで入力され、会話の切れ目を自動で認識して、都度文字起こししてくれます。

## デメリット
- Google Chromeが必要。
- 高級な音声認識AIには負ける

ブラウザを使って文字起こしするためブラウザが必要です。ブラウザによって音声認識の精度が変わります。Google Chromeは音声をサーバーに送信しています。バックエンドに恐らくspeech recognition apiを使っているので、結構高品質な文字起こしができます。他のブラウザ、例えばMicrosoft Edgeとかでも使えるけど、うん。

## 【使い方その1】コードを書かないで使いたい場合
ゆかりネットコネクターを使うと、ソフトをインストールするだけで使えます。
後は自作のプログラムとゆかりネットコネクターをwebsocketで接続すれば、完了です。
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
このAPIは一個の文を文字起こししたら、終了してしまう仕様になっているので、継続的に音声認識をしたい場合は、終了したら再度再開するようにしてあげれば、永遠に音声認識してくれます。

ちなみに、このAPIはHttpsでのみ使用可能なので、サーバーに上げなければいけません。cloudflare workersとかを使えば、一瞬でサーバーに上げられます。

https://www.reddit.com/r/CloudFlare/comments/1ktpj8a/hosting_simple_html_pages/?tl=ja

## 精度はどうなの？
上記に書いたコードをそのままデプロイしたものを以下においておきます。
https://odd-band-5c7e.boxfish893.workers.dev/webspeechtest

またゆかりネットを使って配信しているゆかりネッターの方々も参考になると思います。

https://live.nicovideo.jp/search?keyword=%E3%82%86%E3%81%8B%E3%82%8A%E3%83%8D%E3%83%83%E3%83%88

