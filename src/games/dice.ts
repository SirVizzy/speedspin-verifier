import { GameProcessor } from "@/processors";
import seedrandom from "seedrandom";

export const dice: GameProcessor = {
  process: (seed: string) => {
    const value = seedrandom(seed)();
    const result = Math.floor(value * 10000);
    return {
      result: result.toString(),
      value: value,
    }
  },
}