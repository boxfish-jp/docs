# Ubuntuでキーボード中心のワークフローを構築する

# 前置き

この記事はQiita Advent Calendar 2025 / ひとりアドベントカレンダー 分野における ふぐおの配信関係多めひとり Advent Calendar 2025 の15日目記事となります。  

https://qiita.com/advent-calendar/2025/fuguo_2025

# はじめに

こんにちは! プログラミング配信をしているふぐおです。  
今日は、開発体験の向上のために「マウス操作への依存を減らし、キーボード中心のワークフローを構築している」話をします。  
ホームポジションから手を離さずに操作を完結できることは、作業効率の面においてとても合理的な選択です。  

# 使用しているツールたち

## Space Bar

まず、Gnomeの拡張機能であるSpace Barです。
Gnome標準でもワークスペース機能はあります。インジケーターを番号付きのバーにし、ショートカットキーで簡単に行き来しやすくできる拡張機能がこのSpace Barです。  
何が嬉しいかというと

  - 「今どこのワークスペースにいるか」が一目でわかります。  
  - `Super + 1`や`Super + 2`といったショートカットキーで直感的にワークスペースを切り替えられます。  
  - `Super`キーを押してマウスで切り替えといった手間のかかる操作が不要です。  

## Vicinae

実際の動作がわかるツイートをお借りしました。  

\<blockquote class="twitter-tweet" data-media-max-width="560"\>\<p lang="es" dir="ltr"\>He cambiado wofi por Vicinae y estoy asombrado\! 🔥 Es una alternativa a \<a href="[https://twitter.com/raycast?ref\_src=twsrc%5Etfw](https://twitter.com/raycast?ref_src=twsrc%5Etfw)"\>@raycast\</a\> pero para Linux. De hecho, es compatible con alguno de los plugins de raycast 👀\<a href="[https://twitter.com/hashtag/linux?src=hash\&amp;ref\_src=twsrc%5Etfw](https://twitter.com/hashtag/linux?src=hash&amp;ref_src=twsrc%5Etfw)"\>\#linux\</a\> \<a href="[https://twitter.com/hashtag/hyprland?src=hash\&amp;ref\_src=twsrc%5Etfw](https://twitter.com/hashtag/hyprland?src=hash&amp;ref_src=twsrc%5Etfw)"\>\#hyprland\</a\> \<a href="[https://twitter.com/hashtag/linuxtopic?src=hash\&amp;ref\_src=twsrc%5Etfw](https://twitter.com/hashtag/linuxtopic?src=hash&amp;ref_src=twsrc%5Etfw)"\>\#linuxtopic\</a\> \<a href="[https://t.co/qcn6VAT9rH](https://t.co/qcn6VAT9rH)"\>[pic.twitter.com/qcn6VAT9rH](https://www.google.com/search?q=https://pic.twitter.com/qcn6VAT9rH)\</a\>\</p\>\&mdash; Cristhian Melo (@rxtsel) \<a href="[https://twitter.com/rxtsel/status/1984399438924726293?ref\_src=twsrc%5Etfw](https://twitter.com/rxtsel/status/1984399438924726293?ref_src=twsrc%5Etfw)"\>October 31, 2025\</a\>\</blockquote\> \<script async src="[https://platform.twitter.com/widgets.js](https://platform.twitter.com/widgets.js)" charset="utf-8"\>\</script\>

Macをお使いの方はRaycastをご存知かもしれません。Raycastライクのランチャーツールです。  
このツールを使うことで、アプリケーションの起動やファイルの検索、さらにはクリップボードの履歴の使用などもキーボードで完結できます。
自作ショートカットの作成にも対応しており、指定したサイトのリンクをブラウザで開くといったことも容易です。  
さらには、Raycastのプラグインも一部利用できます。  
これにより、ブラウザを開かずにサッとGoogle検索結果を確認できるため、思考を中断させずに調べものが完結して大変便利です。  

## Vimium

おそらくPCの中で一番使っているGUIアプリがブラウザだと思います。  
ブラウザがキーボード中心で操作できると、作業効率が大幅に向上します。  
VimiumというChrome/Firefox拡張機能を使用すると、ブラウザをVimライクにキーボード中心で操作できます。  
例えば、

  - 基本操作: `j` `k` でスクロール、`H` `L`で履歴の「戻る」「進む」。
  - リンク: `f`キーを押すと、画面上のクリック可能な箇所にすべてアルファベットが割り振られ、その文字をタイプするとリンクに飛ぶことができる。  

これにより、Google検索からWebサイトの閲覧まで、キーボードで完結できます。  

## Zellij

ターミナルマルチプレクサといえば`tmux`が有名ですが、Rust製の`Zellij`を使用しています。  
`Zellij`の良いところはなんと言っても、とっつきやすいところです。  

これを見てもらえるとわかりますが、ターミナルの下部分に操作方法が表示されているため、初心者でも直感的に操作できます。  

## LazyVim

エディタはNeoVimのディストリビューションの一つであるLazyVimを使用しています。  
これも簡単に使い始められることが特徴です。  
またNeoVimの中でも一番人気のディストリビューションであるため、不具合があってもすぐに報告がされ、解決策がIssueに上がるため、安心して使えます。  

# 設定の参考元

割と色々なところから参考にしていますが、一番参考にしているのが、Omakubです。  

[https://omakub.org/](https://omakub.org/)

Ruby on Railsの開発者であるDHH氏によって開発されている、Ubuntuの開発環境を自動構築するセットアップツールです。  
マウスを使わずにキーボード中心で操作できるように設計されており、私も多くの設定を参考にさせてもらっています。  
ただ、現在はDHH氏がOmarchyというArch Linuxベースのプロジェクトに専念しているためか、更新頻度が減っているのが少し寂しいところです。

# まとめ

マウスを使わずにキーボード中心で操作できるワークフローを構築することで、作業効率が大幅に向上します。  
一回使ったらもう戻れない！

# おまけ

いちおう、dotfilesを貼っておきます。  
あんまり盆栽が進んでいませんが...

https://github.com/boxfish-jp/dotfiles/tree/ubuntu

