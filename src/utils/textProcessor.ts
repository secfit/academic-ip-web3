import { ResearchSection } from '../types/research';
import { generateTokenId, generateHash } from './blockchain';

export const parseResearchSections = (text: string): Omit<ResearchSection, 'tokenId' | 'hash' | 'timestamp'>[] => {
  // Simple section detection - in production, use NLP libraries
  const sections: Omit<ResearchSection, 'tokenId' | 'hash' | 'timestamp'>[] = [];
  
  const sectionPatterns = [
    { type: 'abstract' as const, pattern: /abstract[\s\S]*?(?=introduction|methodology|literature|results|conclusion|$)/i },
    { type: 'introduction' as const, pattern: /introduction[\s\S]*?(?=methodology|literature|results|conclusion|$)/i },
    { type: 'literature_review' as const, pattern: /literature[\s\S]*?(?=methodology|results|conclusion|$)/i },
    { type: 'methodology' as const, pattern: /methodology[\s\S]*?(?=results|conclusion|$)/i },
    { type: 'results' as const, pattern: /results[\s\S]*?(?=conclusion|$)/i },
    { type: 'conclusion' as const, pattern: /conclusion[\s\S]*$/i }
  ];

  sectionPatterns.forEach((section, index) => {
    const match = text.match(section.pattern);
    if (match) {
      const content = match[0].trim();
      if (content.length > 50) { // Only include substantial sections
        sections.push({
          id: `section-${index}`,
          type: section.type,
          title: section.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
          content: content
        });
      }
    }
  });

  return sections;
};

export const tokenizeSections = async (sections: Omit<ResearchSection, 'tokenId' | 'hash' | 'timestamp'>[]): Promise<ResearchSection[]> => {
  return sections.map(section => ({
    ...section,
    tokenId: generateTokenId(),
    hash: generateHash(section.content),
    timestamp: new Date()
  }));
};