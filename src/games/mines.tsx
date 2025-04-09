import { Game, GameOutcomeStep } from '@/processors';
import { z } from 'zod';
import seedrandom from 'seedrandom';
import { cn } from '@/lib/utils';

export type MinesOptions = {
  size: number;
  mines: number;
};

export type MinesResult = number[][];

export const mines: Game<MinesOptions, MinesResult> = {
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
        raw: value,
        metadata: {
          x,
          y,
        },
      });

      grid[y][x] = 1;
    }

    return {
      result: grid,
      seed: seed,
      steps: steps,
      metadata: {
        size,
        mines,
      },
    };
  },
  render: (outcome) => {
    return (
      <div className="flex">
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${outcome.result.length}, 1fr)`,
          }}
        >
          {outcome.result.map((row, i) => {
            return row.map((cell, j) => {
              return (
                <div
                  key={`${i}-${j}`}
                  className={cn('size-6 bg-muted rounded-sm grid place-items-center text-xs', cell === 1 && 'bg-red-400')}
                >
                  {cell}
                </div>
              );
            });
          })}
        </div>
      </div>
    );
  },
};
