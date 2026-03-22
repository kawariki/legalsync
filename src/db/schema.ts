import { pgTable, text, uuid, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core';

export const lawyers = pgTable('lawyers', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  firm: text('firm'),
  referralSlug: text('referral_slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const cases = pgTable('cases', {
  id: uuid('id').defaultRandom().primaryKey(),
  lawyerId: uuid('lawyer_id').references(() => lawyers.id),
  clientEmail: text('client_email'),
  clientName: text('client_name'),
  status: text('status')
    .$type<'pending_payment' | 'pending_upload' | 'processing' | 'ready' | 'error'>()
    .default('pending_payment')
    .notNull(),
  tier: integer('tier').default(2),
  stripeSessionId: text('stripe_session_id'),
  stripePaid: boolean('stripe_paid').default(false).notNull(),
  casePackage: jsonb('case_package').$type<CasePackage>(),
  shareToken: text('share_token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  processedAt: timestamp('processed_at'),
});

export const caseFiles = pgTable('case_files', {
  id: uuid('id').defaultRandom().primaryKey(),
  caseId: uuid('case_id').references(() => cases.id).notNull(),
  fileName: text('file_name').notNull(),
  fileType: text('file_type').notNull(),
  fileCategory: text('file_category').$type<'conversation' | 'contract' | 'audio' | 'photo' | 'other'>(),
  uploadthingKey: text('uploadthing_key').notNull(),
  uploadthingUrl: text('uploadthing_url').notNull(),
  sizeBytes: integer('size_bytes'),
  extractedText: text('extracted_text'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type CasePackage = {
  summary: string;
  timeline: Array<{ date: string; event: string; significance: 'high' | 'medium' | 'low' }>;
  keyFacts: Array<{ fact: string; source: string }>;
  evidenceList: Array<{ item: string; fileName: string; relevance: string; category: string }>;
  suggestedQuestions: string[];
  redFlags: string[];
  caseStrengthNote: string;
};
