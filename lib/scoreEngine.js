const BEHAVIOR_WEIGHTS = {
  empathy: 3,
  accountability: 4,
  solution_focus: 3,
  asserting_boundary: 2,
  clarifying: 1,
  deescalation: 4,
  insult: -3,
  name_calling: -4,
  character_attack: -4,
  sarcasm_hostile: -2,
  gaslighting: -6,
  blame_shifting: -3,
  projection: -3,
  threat: -8,
  stonewalling: -2,
  scorekeeping: -2,
  mocking: -3
};

export function scoreConversation(messages) {
  const initSide = () => ({
    total: 0,
    positive: 0,
    negative: 0,
    toxicity: 0,
    byBehavior: {}
  });

  const scores = {
    me: initSide(),
    other: initSide()
  };

  for (const msg of messages) {
    const side = scores[msg.speaker];

    for (const b of msg.behaviors) {
      const base = BEHAVIOR_WEIGHTS[b.type] ?? 0;
      if (!base || b.severity <= 0) continue;

      const pts = base * b.severity;
      side.total += pts;

      if (pts > 0) side.positive += pts;
      else side.negative += pts;

      side.byBehavior[b.type] =
        (side.byBehavior[b.type] ?? 0) + pts;
    }
  }

  ["me", "other"].forEach((party) => {
    const s = scores[party];
    const pos = s.positive;
    const neg = Math.abs(s.negative);
    s.toxicity = neg / (neg + pos + 1);
  });

  const diff = scores.me.total - scores.other.total;
  let winner = "none";
  let label = "No Clear Winner";

  if (Math.abs(diff) < 5) {
    winner = "none";
  } else if (diff >= 5 && diff < 15) {
    winner = "me";
    label = "Narrow Win";
  } else if (diff >= 15) {
    winner = "me";
    label = "Emotional KO";
  } else if (diff <= -5 && diff > -15) {
    winner = "other";
    label = "Narrow Loss";
  } else if (diff <= -15) {
    winner = "other";
    label = "Daddy Is Disappointed";
  }

  return {
    scores,
    result: {
      winner,
      margin: Math.abs(diff),
      label
    }
  };
}
