import { GameProcessor } from '@/processors';
import seedrandom from 'seedrandom';

export const roulette: GameProcessor = {
  process: (seed: string) => {
    const value = seedrandom(seed)();
    const number = Math.floor(value * 36);
    return {
      result: number.toString(),
      value: value,
    };
  },
};
