import { useState } from 'react';
import { ResearchPaper, ResearchSection } from '../types/research';
import { parseResearchSections, tokenizeSections } from '../utils/textProcessor';
import { simulateBlockchainTransaction, calculateSimilarity } from '../utils/blockchain';

// Mock existing research data for similarity comparison
const mockExistingResearch = [
  "Machine learning algorithms have revolutionized data analysis across multiple domains",
  "Deep learning networks demonstrate superior performance in pattern recognition tasks",
  "Natural language processing enables computers to understand human communication",
  "Blockchain technology provides decentralized and secure transaction mechanisms",
  "Artificial intelligence systems continue to advance at unprecedented rates"
];

export const useResearchProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [papers, setPapers] = useState<ResearchPaper[]>([]);

  const processResearch = async (content: string, fileName: string) => {
    setIsProcessing(true);
    
    try {
      // Parse sections from the research content
      const parsedSections = parseResearchSections(content);
      
      // Tokenize sections
      const tokenizedSections = await tokenizeSections(parsedSections);
      
      // Calculate similarity for each section
      const sectionsWithSimilarity: ResearchSection[] = tokenizedSections.map(section => ({
        ...section,
        similarity: Math.max(...mockExistingResearch.map(existing => 
          calculateSimilarity(section.content, existing)
        ))
      }));
      
      // Calculate overall similarity
      const overallSimilarity = Math.round(
        sectionsWithSimilarity.reduce((sum, section) => sum + (section.similarity || 0), 0) / 
        sectionsWithSimilarity.length
      );
      
      // Simulate blockchain transaction
      const blockchainTxId = await simulateBlockchainTransaction({
        sections: sectionsWithSimilarity,
        timestamp: new Date()
      });
      
      // Create research paper object
      const newPaper: ResearchPaper = {
        id: `paper-${Date.now()}`,
        title: fileName.replace(/\.[^/.]+$/, ""), // Remove file extension
        authors: ["Dr. Research Author"], // In production, extract from content
        institution: "Academic Institution", // In production, extract from metadata
        uploadDate: new Date(),
        sections: sectionsWithSimilarity,
        overallSimilarity,
        blockchainTxId,
        ipfsHash: `Qm${Math.random().toString(36).substr(2, 44)}`,
        status: overallSimilarity > 70 ? 'flagged' : 'verified'
      };
      
      setPapers(prev => [newPaper, ...prev]);
      return newPaper;
      
    } catch (error) {
      console.error('Error processing research:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    papers,
    isProcessing,
    processResearch
  };
};