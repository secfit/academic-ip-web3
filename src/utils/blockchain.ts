// Mock blockchain utilities for StoryIP integration
export const generateTokenId = (): string => {
  return `SIP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateHash = (content: string): string => {
  // Simple hash simulation - in production, use proper cryptographic hash
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
};

export const simulateBlockchainTransaction = async (data: any): Promise<string> => {
  // Simulate blockchain transaction delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  return `0x${Math.random().toString(16).substr(2, 8)}${Math.random().toString(16).substr(2, 8)}`;
};

export const calculateSimilarity = (text1: string, text2: string): number => {
  // Simple similarity algorithm - in production, use more sophisticated NLP
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const set1 = new Set(words1);
  const set2 = new Set(words2);
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return Math.round((intersection.size / union.size) * 100);
};