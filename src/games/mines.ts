import { Game, GameOutcomeStep } from "@/processors";
import { z } from "zod";
import seedrandom from 'seedrandom';

export type MinesOptions = {
  size: number;
  mines: number;
}

export const mines: Game<MinesOptions> = {
  id: 'mines',
  schema: z.object({
    size: z.number().min(3).max(10),
    mines: z.number().min(1).max(25),
  }),
  process: (seed, options) => {
    const steps: GameOutcomeStep[] = [];
    const { size, mines } = options;
    
    // Create empty grid
    const grid: number[][] = [];
    for (let i = 0; i < size; i++) {
      grid.push(new Array(size).fill(0));
    }

    // Initialize random number generator with seed
    const rng = seedrandom(seed);
    
    // Create array of all possible positions
    const possibilities = new Array(size ** 2).fill(0).map((_, i) => i);

    // Place mines randomly
    for (let i = 0; i < mines; i++) {
      const value = rng();
      const possibilityIdx = Math.floor(value * possibilities.length);
      const tileIdx = possibilities[possibilityIdx];
      possibilities.splice(possibilityIdx, 1);

      const x = tileIdx % size;
      const y = Math.floor(tileIdx / size);

      steps.push({
        title: 'Mine',
        seed: seed,
        raw: value,
        metadata: {
          x,
          y,
        },
      });

      grid[y][x] = 1;
    }

    // Convert grid to string representation
    const result = grid.flat().join('');

    return {
      result: result.toString(),
      seed,
      steps,
      metadata: {
        size,
        mines,
      },
    };
  },
}