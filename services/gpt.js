const axios = require("axios");
require('dotenv').config();


const apiKey = process.env.GPT_API_KEY;
async function GPT(prompt1, data) {
  const primaryPrompt = [
    { role: "system", content: "you are a presentation Creator and do not not provide any unnecessary content" },
    { role: "user", content: `${prompt1} ${data}` },
  ];
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: primaryPrompt,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    let output = response.data.choices[0].message.content.trim();
    output = output.replace(/\s+/g, ' '); // Remove extra whitespace
    output = output.replace(/^"|"$/g, ''); // Remove leading and trailing quotation marks
    return output;
  } catch (error) {
    console.error("Error making request to OpenAI API:", error);
    throw error;
  }
}

async function NestedGPT(prompt1, prompt2, data) {
  const primaryData = await GPT(prompt1, data);
  const refinedData = await GPT(prompt2, primaryData);
  return refinedData;
}
 
module.exports = { GPT, NestedGPT };
