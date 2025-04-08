import { Game } from '@/processors';
import { z } from 'zod';
import seedrandom from 'seedrandom';

export const dice: Game = {
  id: 'dice',
  schema: z.object({}),
  process: (seed) => {
    const rng = seedrandom(seed);
    const raw = rng();
    const result = Math.floor(raw * 10000);

    return {
      seed: seed,
      result: result.toString(),
      raw: raw,
    };
  },
};
