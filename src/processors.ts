import { blackjack } from "./games/blackjack";
import { dice } from "./games/dice";
import { plinko } from "./games/plinko";

export type GameOutcome = {
  value: number;
  result: string;
  metadata?: Record<string, string | number | boolean | null>;
};

export type GameProcessor = {
  process: (seed: string) => GameOutcome;
}

export const processors: Record<string, GameProcessor> = {
  plinko: plinko,
  dice: dice,
  blackjack: blackjack
};

export const getProcessor = (gameName: string) => {

  if (!processors[gameName]) {
    throw new Error(`Unable to find processor for game: ${gameName} - please report this issue.`);
  }

  return processors[gameName];
}
