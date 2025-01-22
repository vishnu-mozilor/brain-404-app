import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = import.meta.env.VITE_GPT_API_KEY;
const GPT_MODEL = import.meta.env.VITE_GPT_MODEL;

export const getChatResponse = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: GPT_MODEL, // Use a supported model
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error fetching chat response:", error);
    throw error;
  }
};
