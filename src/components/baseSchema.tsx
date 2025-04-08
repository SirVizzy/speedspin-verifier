import * as z from 'zod';

// Base form schema

export const baseSchema = z.object({
  clientSeed: z.string().min(1, 'Client seed is required'),
  serverSeed: z.string().min(1, 'Server seed is required'),
  serverSeedHash: z.string().min(1, 'Server seed hash is required'),
  nonce: z.string().min(1, 'Nonce is required'),
});
