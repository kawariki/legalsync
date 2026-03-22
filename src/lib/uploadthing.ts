import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { auth } from '@clerk/nextjs/server';

const f = createUploadthing();

export const ourFileRouter = {
  caseFileUploader: f({
    pdf: { maxFileSize: '32MB', maxFileCount: 20 },
    image: { maxFileSize: '16MB', maxFileCount: 20 },
    audio: { maxFileSize: '64MB', maxFileCount: 10 },
    'text/plain': { maxFileSize: '4MB', maxFileCount: 10 },
  })
    .middleware(async ({ req: _req }) => {
      const { userId } = await auth();
      if (!userId) throw new Error('Unauthorized');
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
