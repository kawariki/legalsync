import { serve } from 'inngest/next';
import { inngest } from '@/inngest/client';
import { processCaseJob } from '@/inngest/functions/processCase';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processCaseJob],
});
