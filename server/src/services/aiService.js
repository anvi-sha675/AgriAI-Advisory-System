import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function sendAdvisoryMessage(message, history = []) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const historyText = history
      .map((m) => `${m.role}: ${m.content}`)
      .join("\n");

    const prompt = `
You are AgriAI, an expert agricultural assistant.

IMPORTANT RULES:
- Always reply in English.
- Never reply in Hindi or any other language.
- Use simple English suitable for farmers.
- Give practical agricultural advice.

Previous Conversation:
${historyText}

Current Question:
${message}

Answer in this format:

Problem:
...

Possible Causes:
- ...

Treatment:
- ...

Prevention:
- ...
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    return {
      reply: responseText,
      causes: [],
      treatment: [],
      prevention: [],
    };
  } catch (error) {
    console.error("Gemini Error:", error);

    return {
      reply:
        "Sorry, I couldn't generate an AI response right now. Please try again later.",
      causes: [],
      treatment: [],
      prevention: [],
    };
  }
}