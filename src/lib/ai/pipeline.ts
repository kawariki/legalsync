import { generateObject } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { CasePackageSchema } from './schemas';
import { CASE_ANALYSIS_SYSTEM_PROMPT } from './prompts';

export type ProcessedFile = {
  fileName: string;
  fileType: string;
  content: string;
};

export async function processCaseFiles(files: ProcessedFile[]) {
  const fileContents = files
    .map(f => `=== FILE: ${f.fileName} (${f.fileType}) ===\n${f.content}`)
    .join('\n\n');

  const { object } = await generateObject({
    model: anthropic('claude-sonnet-4-20250514'),
    schema: CasePackageSchema,
    system: CASE_ANALYSIS_SYSTEM_PROMPT,
    prompt: `Analyze the following case materials and produce a structured case package:\n\n${fileContents}`,
    maxOutputTokens: 4000,
  });

  return object;
}
