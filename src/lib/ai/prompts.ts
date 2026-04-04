export function getSuggestPrompt(prompt: string): string {
  return prompt;
}

export function getRewritePrompt(text: string, tone: string): string {
  return `Rewrite the following text in a ${tone.toLowerCase()} tone. Return only the rewritten text, no explanation.\n\n${text}`;
}

export function getCoachPrompt(content: string): string {
  return `You are a writing coach. Analyse the following text and give concise feedback on clarity, structure, and tone. Be specific and constructive.\n\n${content}`;
}
