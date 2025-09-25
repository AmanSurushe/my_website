export function calculateReadingTime(content: string): number {
  if (!content) return 1;
  
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s+/g, '') // Remove markdown headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links, keep text
    .trim();
  
  const wordCount = cleanContent.split(/\s+/).filter(word => word.length > 0).length;
  const readingTimeMinutes = Math.ceil(wordCount / 200); // 200 words per minute
  
  return Math.max(1, readingTimeMinutes); // Minimum 1 minute
}