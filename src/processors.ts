import { z } from "zod";
import { blackjack } from "./games/blackjack";
import { dice } from "./games/dice";
import { mines } from "./games/mines";
import { plinko } from "./games/plinko";
import { roulette } from "./games/roulette";

export type GameOutcome = {
  result: string;
  seed: string;
  raw?: number;
  steps?: GameOutcomeStep[];
  metadata?: Record<string, string | number | boolean | null>;
};

export type GameOutcomeStep = {
  seed?: string; // <-- seed for this step (default to server seed)
  raw: number; // <-- raw number from the rng
  metadata?: Record<string, string | number | boolean | null>;
};

export type GameMode = 'plinko' | 'dice' | 'blackjack' | 'roulette' | 'mines';

export type Game<TOptions = unknown> = {
  id: GameMode;
  schema: z.ZodSchema<TOptions>;
  process: (seed: string, options: TOptions) => GameOutcome;
}

export const games = {
  plinko,
  dice,
  blackjack,
  roulette,
  mines,
} as const;