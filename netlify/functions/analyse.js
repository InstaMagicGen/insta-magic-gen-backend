const { Configuration, OpenAIApi } = require("openai");

exports.handler = async (event) => {
  const { text } = JSON.parse(event.body);
  const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_KEY
  }));
  const resp = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Tu es un assistant d’analyse de texte." },
      { role: "user", content: `Analyse ce texte :\n${text}` }
    ],
    max_tokens: 500
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ result: resp.data.choices[0].message.content })
  };
};
