# NeoVimの起動時にnvim-treesitterのエラーが出る場合の対処法

# はじめに

この記事はQiita Advent Calendar 2025 / ひとりアドベントカレンダー 分野における ふぐおの配信関係多めひとり Advent Calendar 2025 の12日目の記事となります。

https://qiita.com/advent-calendar/2025/fuguo_2025

こんにちは、ふぐおです。
LazyVimを使っているときに、nvim-treesitterのエラーによく遭遇したので解決策をシェアします。

# エラー内容
LinuxでもWindowsでも発生する場合があります。
内容的には、各言語のパーサーのインストールがNeoVimの起動時に毎回走り、毎回失敗するという感じです。
Windows環境でパーサーのインストールに失敗する場合、以下のようなエラーが出ることがあります。

```txt
[nvim-treesitter/install/c] error: Error during "tree-sitter build": Warning: You have not configured any parser directories!
Please run `tree-sitter init-config` and edit the resulting
configuration file to indicate where we should look for
language grammars.


thread 'main' panicked at cli\src\main.rs:848:18:
called `Result::unwrap()` on an `Err` value: Failed to execute the C compiler with the following command:
"cl.exe" "-nologo" "-MD" "-O2" "-Brepro" "-std:c11" "-I" "C:\\Users\\pasca\\AppData\\Local\\Temp\\nvim\\tree-sitter-c\\src" "-W4" "-LD" "-utf-8" "C:\\Users\\pasca\\AppData\\Local\\Temp\\nvim\\tree-sitter-c\\src\\parser.c" "-link" "-out:C:\\Users\\pasca\\AppData\\Local\\Temp\\nvim\\tree-sitter-c\\parser.so"

Caused by:
    program not found
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
````

# 対処方法

## 1. Cコンパイラのインストール

WindowsもLinuxもCコンパイラが必要です。

Linux(Ubuntu)の場合

```bash
apt install build-essential
```

Windowsの場合
Visual StudioからCやC++のビルドツールをインストールすることをおすすめします。

Visual Studioのインストールをしたくない場合の方法については、以下のIssueを参照することをおすすめします。

https://github.com/nvim-treesitter/nvim-treesitter/issues/8147

## 2. Tree-sitter CLIのインストール

上記のコンパイラのインストールでも改善しない場合は、Tree-sitter CLIをインストールしてみてください。

インストール方法は以下の通りです。

https://tree-sitter.github.io/tree-sitter/creating-parsers/1-getting-started.html

npmやcargoなどでインストールできます。
インストール後に以下のコマンドを実行して設定ファイルを生成するのを忘れずに！

```bash
tree-sitter init-config
```

```

