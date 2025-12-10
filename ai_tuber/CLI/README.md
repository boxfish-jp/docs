# 退屈なことはAI Tuberにやらせよう

# 前置き
この記事はQiita Advent Calendar 2025 / ひとりアドベントカレンダー 分野における ふぐおの配信関係多めひとり Advent Calendar 2025 の11日目の記事となります。  

https://qiita.com/advent-calendar/2025/fuguo_2025

今回は私が開発しているAI Tuber(ずんだもん)に覚えさせているツールについて説明したいと思います。  

# 実装させていること

実際の動作の様子は以下の動画をご覧ください。  

https://youtu.be/sDGx7GBClS4?si=08vGMhJOwgxn6_8e&t=80

ずんだもんに覚えさせていることは以下の通りです。  

- VSCode開く
- ターミナルを開く
- GitHubのリポジトリを開く
- 配信中の放送ページを開く
- その他覚えさせているWebサイトを開く
- Googleの検索結果の表示
- ゲームを開く
- 配信UIの更新

また覚えさせていなくてもある程度自発的に考えるので、アドリブが効きます。  

# やり方
## LangChainのTool機能
LangChainで実装した自作のAIエージェントに、Tool機能を使って、上記の操作を覚えさせています。  
Tool機能についての詳細はこちら。

https://docs.langchain.com/oss/javascript/langchain/tools

```ts
import * as z from "zod"
import { tool } from "langchain"

const searchDatabase = tool(
  ({ query, limit }) => `Found ${limit} results for '${query}'`,
  {
    name: "search_database",
    description: "Search the customer database for records matching the query.",
    schema: z.object({
      query: z.string().describe("Search terms to look for"),
      limit: z.number().describe("Maximum number of results to return"),
    }),
  }
);
```

これは公式ドキュメントから取ってきた例です。  
zodによるバリデーションも組み込めるので、非常に便利です。  
`name`にツールの名前を、`description`にツールの説明を入れます。  
また引数の解説も加えましょう。  

## ツールの実装方法

- VSCode開く
- ターミナルを開く
- GitHubのリポジトリを開く
- 配信中の放送ページを開く
- その他覚えさせているWebサイトを開く
- Googleの検索結果の表示
- ゲームを開く

これらについては、全てCLIコマンドを実行できるtoolを用意して実装しています。  


```ts
const cli = 
	 tool(
		({ command }: { command: string }): boolean => {
			console.log("command:", command);
			try {
				exec(command, { encoding: "utf8" });
				return true;
			} catch (error) {
				console.error("Command execution failed:", error);
				return false;
			}
		},
		{
			name: "cli",
			description: `ブラウザで特定のページを開きユーザーにそのページを閲覧させる、エディターを開く、ターミナルを開く、Lazygitを開くといった処理に使用するエージェントです。
command引数にbashコマンドを入れると、そのコマンドが実行されます。
# cliコマンドをする上での背景知識
## VSCodeの開き方
\`\`\`bash
code
\`\`\`

## ターミナルを開く
\`\`\`bash
wezterm
\`\`\`
`,
			schema: z.object({
				command: z.string(),
			}),
		},
	)

```

こんな感じのコードです。  
CLIコマンドであれば何でも実行できるので、非常に汎用性が高いです。  

## CLIコマンド紹介
Windows環境での場合です。  
```bash
# GitHubのリポジトリを開く
start https://github.com

# ニコ生の最新の配信ページを開く
start https://live.nicovideo.jp/watch/user/98746932

# Googleの検索結果を表示する
start https://www.google.com/search?q=ラーメン

# ターミナル(WezTerm)を開く
wezterm

# VSCode開く
code
```

## 注意点
CLIコマンドを自由に実行できるということは、PC内のあらゆる操作が可能になるということです。  
注意してください。  
特に私のような配信パートナーAIの場合、視聴者にそそのかされてコマンドを実行しないようにコメントの指示のときはCLIツールが発動しないといったプログラム的な対策を講じてください。  
私の場合は許可をしたタイミングでのみ、コマンドを実行できるようにしています。

## 実装時に苦労した点
なかなかAIが正しくツールを使ってくれないことが多かったです。ツールを呼び出したとか言ってるくせに、全くツール呼び出してなかったりと...
プロンプトを簡潔にするとかなり成功率が上がりました。  
特に賢くないLLMを使っている場合は、余分な情報を詰め込まず、やらせたいこと一つに絞るのが良いと思います。  

# まとめ
LangChainのTool機能は非常に楽しい。  
今だったらMCP連携をさせたら、もっと楽しいかも。  
