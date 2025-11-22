# Debate-Daddy
Ai—powered text fight judge
# Debate Daddy (Backend MVP)

This is the official backend for Debate Daddy — the AI-powered text argument judge.

## Endpoints

### POST /api/analyze

Send:
- meLabel
- otherLabel
- messages: array of { speaker, text, timestamp }

Returns:
- scores
- toxicity scores
- winner
- margin
- label
