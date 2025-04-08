import { Game } from "@/processors";
import { z } from "zod";
import seedrandom from 'seedrandom';

export const roulette: Game = {
  id: 'roulette',
  schema: z.object({}),
  process: (seed) => {
    const rng = seedrandom(seed);
    const value = rng();
    const number = Math.floor(value * 37); // 0-36 for European roulette

    return {
      seed: seed,
      result: number.toString(),
      raw: value,
    };
  },
};
