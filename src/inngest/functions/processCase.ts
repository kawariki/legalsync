import { inngest } from '../client';
import { db } from '@/db';
import { cases, caseFiles } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { processCaseFiles } from '@/lib/ai/pipeline';

export const processCaseJob = inngest.createFunction(
  {
    id: 'process-case',
    retries: 3,
    triggers: [{ event: 'case/files.uploaded' }],
  },
  async ({ event, step }) => {
    const { caseId } = event.data as { caseId: string };

    await step.run('mark-processing', async () => {
      await db.update(cases)
        .set({ status: 'processing' })
        .where(eq(cases.id, caseId));
    });

    const files = await step.run('fetch-files', async () => {
      return db.select().from(caseFiles).where(eq(caseFiles.caseId, caseId));
    });

    const casePackage = await step.run('run-ai-pipeline', async () => {
      const processedFiles = files
        .filter((f: typeof files[number]) => f.extractedText)
        .map((f: typeof files[number]) => ({
          fileName: f.fileName,
          fileType: f.fileType,
          content: f.extractedText!,
        }));

      return processCaseFiles(processedFiles);
    });

    await step.run('save-result', async () => {
      await db.update(cases)
        .set({ status: 'ready', casePackage, processedAt: new Date() })
        .where(eq(cases.id, caseId));
    });

    await step.run('send-notification', async () => {
      // TODO: Send email notification via Resend
    });

    return { caseId, status: 'ready' };
  }
);
