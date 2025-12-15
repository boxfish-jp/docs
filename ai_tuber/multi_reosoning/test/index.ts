import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const gemini = new ChatGoogleGenerativeAI({
	model: "gemini-2.5-flash-lite",
});

const run = async () => {
	await gemini.invoke("こんにちは");
	const allprompt = `

とあるAIパートナーは今ふぐおという配信者とライブコーディングをしています。
AIパートナーはアシスタント的な役割です。
以下が直近の会話履歴です。

コメント「わこつ。腱鞘炎治った?」
ふぐお「いらっしゃい。全然症状変わらないよ」
ふぐお「でも、腱鞘炎なわけないよ。だってまだ23だし」
コメント「もうおじさんなんだよ」
ふぐお「そ、そんなわけ。AIちゃんは私のことおじさんだとは思わないよね」

以下が直近でAIパートナーが考えていたことです。  
ふぐおのプログラミング配信に視聴者が来場したようです。  

これに対して以下の出力を行ってください。  
最初の一文目にAIパートナーが直前で考えていたことが、ふぐお、または視聴者の新しい発言によってどのように変化したかを述べてください。
二文目は、AIパートナーが次にどのような発言や行動をするべきかと注意点を述べてください。
三文目に、二文目の内容を踏まえて、AIパートナーが実際にする発言をなりきって出力してください。  
4文目に、3文目でおこなった発言をもとにAIパートナーが現在どのようなことを考えているかを述べてください。  
`;
	const allFtime = Date.now();
	const response = await gemini.invoke(allprompt);
	const allResTime = Date.now() - allFtime;
	console.log("all Prompt total time:", Date.now() - allFtime);

	console.log(response.content);

	const multicommon = `
とあるAIパートナーは今ふぐおという配信者とライブコーディングをしています。
AIパートナーはアシスタント的な役割です。
以下が直近の会話履歴です。

コメント「わこつ。腱鞘炎治った?」
ふぐお「いらっしゃい。全然症状変わらないよ」
ふぐお「でも、腱鞘炎なわけないよ。だってまだ23だし」
コメント「もうおじさんなんだよ」
ふぐお「そ、そんなわけ。AIちゃんは私のことおじさんだとは思わないよね」
`;

	const multi1 = `
${multicommon}


以下が直近でAIパートナーが考えていたことです。  
ふぐおのプログラミング配信に視聴者が来場したようです。  

最初の一文目にAIパートナーが直前で考えていたことが、ふぐお、または視聴者の新しい発言によってどのように変化したかを述べてください。
二文目は、AIパートナーが次にどのような発言や行動をするべきかと注意点を述べてください。
それ以外の文は出力しないでください。
`;
	const multiFtime = Date.now();
	const multiResponse1 = await gemini.invoke(multi1);
	console.log("multi Prompt 1 time:", Date.now() - multiFtime);
	console.log(multiResponse1.content);

	const multi2 = `
${multicommon}
これに対して、以下が会話をAIパートナーが考えている会話の方針や注意点です。
${multiResponse1.content}

AIパートナーが実際にする発言をなりきって出力してください。
それ以外の文は出力しないでください。
`;
	const multiResponse2 = await gemini.invoke(multi2);
	console.log("multi Prompt 2 time:", Date.now() - multiFtime);
	console.log(multiResponse2.content);

	const multi3 = `
${multicommon}

これに対して、以下が会話をAIパートナーが考えている会話の方針や注意点です。
${multiResponse1.content}

これらを踏まえて、実際にAIパートナーが行った発言は以下です。  
${multiResponse2.content}

実際におこなった発言をもとにAIパートナーが現在どのようなことを考えているかを述べてください。
それ以外の文は出力しないでください。
`;
	const multiResponse3 = await gemini.invoke(multi3);
	console.log("multi Prompt total time:", Date.now() - multiFtime);
	console.log(multiResponse3.content);
	const multiResTime = Date.now() - multiFtime;

	return [allResTime, multiResTime];
};

const main = async () => {
	let all = 0;
	let multi = 0;

	for (let i = 0; i < 20; i++) {
		const results = await run();
		all += results[0];
		multi += results[1];
	}
	console.log("Average all prompt time:", all / 20);
	console.log("Average multi prompt time:", multi / 20);
};

main();
