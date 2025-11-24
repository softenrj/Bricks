export function fixMarkdownStreaming(md: string): string {
  let fixed = md;

  const boldCount = (fixed.match(/\*\*/g) || []).length;
  if (boldCount % 2 !== 0) {
    fixed += "**";
  }

  const italicCount = (fixed.match(/\*/g) || []).length;
  if (italicCount % 2 !== 0) {
    fixed += "*";
  }

  const codeCount = (fixed.match(/```/g) || []).length;
  if (codeCount % 2 !== 0) {
    fixed += "\n```";
  }

  const inlineCodeCount = (fixed.match(/`/g) || []).length;
  if (inlineCodeCount % 2 !== 0) {
    fixed += "`";
  }

  return fixed;
}
