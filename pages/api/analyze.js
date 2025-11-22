import { DEBATE_DADDY_PROMPT } from "../../../lib/llmPrompt";
import { scoreConversation } from "../../../lib/scoreEngine";

// Use OpenAI's API or any LLM backend of your choice
// This is a placeholder call you can wire later.
async function callLLM(messages) {
  // -----------------------------
  // TODO: Replace with real LLM.
  // For now return "safe mock" so UI works.
  // -----------------------------
  return {
    messages: messages.map((m, i) => ({
      index: i,
      speaker: m.speaker,
      tone: "neutral",
      behaviors: []
    }))
  };
}

export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const llmData = await callLLM(messages);

    const result = scoreConversation(llmData.messages);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Debate Daddy had a meltdown." });
  }
}
