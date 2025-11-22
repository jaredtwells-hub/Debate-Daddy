import { DEBATE_DADDY_PROMPT } from "../../lib/llmPrompt";
import { scoreConversation } from "../../lib/scoreEngine";

async function callLLM(messages) {
  // TEMP MOCK: just echo structure so scoring runs without a real LLM
  return {
    messages: messages.map((m, i) => ({
      index: i,
      speaker: m.speaker === "me" || m.speaker === "other" ? m.speaker : "me",
      tone: "neutral",
      behaviors: [] // LLM will fill this later
    }))
  };
}

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      return res.status(200).json({
        message: "Debate Daddy API is alive. POST JSON to this endpoint."
      });
    }

    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res
        .status(400)
        .json({ error: "Body must include a 'messages' array." });
    }

    const llmData = await callLLM(messages);
    const result = scoreConversation(llmData.messages);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Debate Daddy had a meltdown." });
  }
}
