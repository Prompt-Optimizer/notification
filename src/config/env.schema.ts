import { z } from 'zod';

export const ENV = Symbol('ENV');

export const envSchema = z.object({
  PORT: z.coerce.number().int().min(0).max(65535).default(3000),
  NODE_ENV: z.string().default('development'),

  RMQ_URL: z.url(),
  RMQ_EXCHANGE_NAME: z.string(),
  RMQ_EXCHANGE_TYPE: z.enum(['topic', 'direct', 'fanout', 'headers']).default('topic'),
  RMQ_QUEUE_NAME: z.string(),
  RMQ_QUEUE_TYPE: z.enum(['classic', 'quorum', 'stream']).default('quorum'),

  BREVO_API_KEY: z.string(),
  BREVO_SENDER_EMAIL: z.string().email(),
  BREVO_SENDER_NAME: z.string(),
});

export type Env = z.infer<typeof envSchema>;
