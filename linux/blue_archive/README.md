# NVIDIA GPU + Linux(Waydroid)でブルアカを動かそうとして敗北した話

# 前置き
この記事はQiita Advent Calendar 2025 / ひとりアドベントカレンダー 分野における ふぐおの配信関係多めひとり Advent Calendar 2025 の13日目記事となります。  

https://qiita.com/advent-calendar/2025/fuguo_2025

こんにちは! AI Tuberなどの開発をしているふぐおです。  
今日は、LinuxでAndroidアプリであるBlue Archive(ブルアカ)を動かそうとしたが、動かなかった話についてお伝えします。  

# 私のPC
OS: Ubuntu 25.10
CPU: AMD Ryzen 5 5600
GPU: NVIDIA GeForce RTX 3060
メモリ: 32GB

# LinuxでAndroidを動かす方法

1. Waydroidを使う方法
LXCコンテナを利用して、Androidを動かす方法です。  
この手段が一番パフォーマンスが良い可能性が高いです。  

2. QEMUでBliss OSを動かす方法
Bliss OSなどのAndroid-x86系OSをVMで動かす方法です。  
Waydroidよりはパフォーマンスが落ちる可能性があります。  

3. Android公式エミュレータを使う方法
Android Studioに付属しているエミュレータを使う方法です。  
パフォーマンスは期待できません。  

# 環境によってパフォーマンスが異なる話
上記の方法でそれぞれで、持っている環境によって相性が異なります。  
CPUとGPUによって変わります。  

## NVIDIA GPU環境
NVIDIA GPU環境では、WaydroidがNVIDIAドライバとの相性が悪く、GPUを使用することができません。  
これはNVIDIAのドライバーがプロプライエタリであることの影響です。  
調べた感じBliss OSを使う場合はGPUのハードウェアアクセラレーションを受けられるという情報はありましたが、実際の報告例はなく、私自身もパフォーマンスに難がありました。それでもなぜかWaydroidでソフトウェアレンダリングをするよりは動きは良かったです。  

## AMD/Intel GPU環境
内蔵GPUでもハードウェアアクセラレーションの恩恵を受けられます。  
Androidゲームは比較的軽量なので、ハードウェアアクセラレーションの恩恵は天と地ほど違います。  

# Blue Archiveを動かすにはARM翻訳レイヤーが必要
Blue ArchiveはARM向けにしか提供されていないため、x86で動かすにはARMの翻訳レイヤーが必要となります。 
Bliss OSの場合はデフォルトでARMの翻訳レイヤーが入っています。  

Waydroidに関しては以下のリポジトリから入手できます。  

https://github.com/casualsnek/waydroid_script

# 経験上Blue Archiveが動かなくなる場所
1. そもそもプレイストアにBlue Archiveが出てこない。  
ARMの翻訳レイヤーが動作していない場合はこうなります。  

![alt text](image.png)

2. アプリを起動したあとすぐに表示されるアイコンの画面でクラッシュする。  
![alt text](image-3.png)

3. Yosterの認証画面のポップアップが出るタイミングでクラッシュする。
![alt text](image-1.png)

# Waydroidでやってみた場合
大体Yosterの認証画面のポップアップが出るタイミングでクラッシュするパターンでクラッシュしました。  
ちなみに30回ぐらいアプリを起動して、終了（またはタスクキル）してを繰り返すと一回ぐらい成功します。  
ただ、NVIDIA GPUのせいでソフトウェアレンダリングになってしまい、最低画質じゃないと遊べませんし、戦闘はだいぶキツイです。  

# Bliss OSでやってみた場合
ARMの翻訳レイヤーが動かず、そもそもプレイストアにBlue Archiveが出てこないパターンでした。  
無理やりAPKでインストールしても無理でした。  

# Waydroidで試したこと
## ARMの翻訳レイヤー
`libhoudini`と`libndk`のどちらも試してもダメでした。  
`libndk`の方がAMDのCPUと相性が良いらしいですが、私の場合は`libndk`の場合はアプリ起動直後にアイコンが表示される画面で止まってしまう時が多く、`libhoudini`の方がもうちょっとすすんで、Yosterの認証画面のポップアップが出るタイミングでクラッシュするので、`libhoudini`のほうが良かったです。  

## 専用のパッチを適用する
様々なところで紹介されていますが、ARMの翻訳レイヤーにパッチが存在します。  
https://www.reddit.com/r/linux_gaming/comments/1dl50mn/how_to_install_and_play_blue_archive_on_fedora/?tl=ja

これは有志の方々がWindows向けのエミュレーターから取ってきたものらしく、これを動かすとBlue Archive(ブルアカ)が動いたという報告が多数上がっています。  
しかし、現在この修正された翻訳レイヤーは先程紹介したWaydroid Scriptsにマージされており、実行しても意味はありません。  

# 解決方法
Intel CPU+内蔵GPUを使いましょう。  
これについては今度書きます。  

# まとめ
NVIDIAとLinuxの相性が悪い問題をなんとかしてくれ、革ジャンよ。
SteamがWaydroidをフォークして色々してくれるやつにも期待してます。  

# おまけ：解決策の奔走にあたり参考にしたサイト

ソフトウェアレンダリングの適用法はこちらです。

https://wiki.archlinux.jp/index.php/Waydroid

私はUnauthorizedのエラーには遭遇しませんでした。

https://note.com/triangler34/n/na5dd9b0a5485

このIssueが一番参考になります。おそらくBlue ArchiveをWaydroidで動かす方法について一番議論されているところだと思います。  

https://github.com/waydroid/waydroid/issues/788


パッチを配布してくれている方ですが、私には効果なし。

https://herz.moe/content/balinux.php

こちらもパッチを紹介されていますが、私には効果なし。

https://www.cnblogs.com/int16/p/18691121

パッチの適用方法が書かれていますが、Android11用です。現在のWaydroidはAndroid13で効果はありません。  

https://github.com/mrvictory1/libhoudini_bluestacks/tree/bluearchive
