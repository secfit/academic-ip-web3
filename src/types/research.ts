export interface ResearchSection {
  id: string;
  type: 'abstract' | 'introduction' | 'methodology' | 'literature_review' | 'results' | 'conclusion';
  title: string;
  content: string;
  tokenId: string;
  hash: string;
  timestamp: Date;
  similarity?: number;
}

export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  institution: string;
  uploadDate: Date;
  sections: ResearchSection[];
  overallSimilarity: number;
  blockchainTxId: string;
  ipfsHash: string;
  status: 'processing' | 'tokenized' | 'verified' | 'flagged';
}

export interface SimilarityResult {
  sectionId: string;
  similarPapers: {
    paperId: string;
    title: string;
    similarity: number;
    matchingSections: string[];
  }[];
}