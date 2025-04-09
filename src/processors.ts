import { z } from "zod";
import { blackjack } from "./games/blackjack";
import { dice } from "./games/dice";
import { mines } from "./games/mines";
import { plinko } from "./games/plinko";
import { roulette } from "./games/roulette";

export type GameOutcome<TResult = string> = {
  result: TResult;
  seed: string;
  raw?: number;
  steps?: GameOutcomeStep[];
  metadata?: Record<string, string | number | boolean | null>;
};

export type GameOutcomeStep = {
  title: string;
  raw: number;
  seed?: string; 
  metadata?: Record<string, string | number | boolean | null>;
};

export type GameMode = 'plinko' | 'dice' | 'blackjack' | 'roulette' | 'mines';

export type Game<TOptions = undefined, TResult = string> = {
  id: GameMode;
  schema: z.ZodSchema<TOptions>;
  process: (seed: string, options: TOptions) => GameOutcome<TResult>;
  render: (outcome: GameOutcome<TResult>) => React.ReactNode;
}

export const games = {
  plinko,
  dice,
  blackjack,
  roulette,
  mines,
} as const;