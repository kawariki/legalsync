import { z } from 'zod';

export const CasePackageSchema = z.object({
  summary: z.string().describe('2-3 sentence executive summary of the case for the lawyer'),
  timeline: z.array(z.object({
    date: z.string(),
    event: z.string(),
    significance: z.enum(['high', 'medium', 'low']),
  })).describe('Chronological timeline of key events, sorted oldest first'),
  keyFacts: z.array(z.object({
    fact: z.string(),
    source: z.string().describe('Which file this came from'),
  })),
  evidenceList: z.array(z.object({
    item: z.string(),
    fileName: z.string(),
    relevance: z.string(),
    category: z.enum(['conversation', 'contract', 'photo', 'audio', 'document', 'other']),
  })),
  suggestedQuestions: z.array(z.string()).describe('5-10 questions the client should ask their lawyer'),
  redFlags: z.array(z.string()).describe('Legal risks or concerns to highlight'),
  caseStrengthNote: z.string().describe('Brief honest assessment of case strength and gaps'),
});
