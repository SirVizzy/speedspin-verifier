import { GameProcessor } from "@/processors";
import seedrandom from 'seedrandom';

export const plinko: GameProcessor = {
  process: (seed: string) => {
    const value = seedrandom(seed)();
    const direction = value < 0.5 ? 'L' : 'R';
    return {
      result: direction,
      value: value,
    };
  },
};