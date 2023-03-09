import dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
import { App, MessageEvent } from "@slack/bolt";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export const askGpt = async (userPrompt: string): Promise<string>=> {
  const completion = await openai.createCompletion({
      model:"text-davinci-003",
      temperature: 0.6,
      frequency_penalty: 1.5,
      presence_penalty: 1.2,
      max_tokens: 4000,
      prompt: userPrompt,
      });
      return completion.data.choices[0].text ? completion.data.choices[0].text: 'cannot get response from openai, sorry!';
  }
const app = new App({
  token: "xoxb-4856413887735-4879646109044-iUpXK8R37TnTe3KyA44GvNnL",
  socketMode: true,
  appToken: "xapp-1-A04SAJREXC0-4877169025026-2e651e90c1b95e873269ced7b6ee6ec00cb336027d8ae96b3b1ecd74b30cafc7",
  signingSecret: "2243b8b915a96d5fc61c7993c7c94594"
});


app.command("/gpt", async ({ ack, command, say }) => {
console.log(command.text);
  await ack();
  const odp: string = await askGpt(command.text);
  console.log(odp);
  say(odp);
  }
);

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Bolt app is running!");
})();





  