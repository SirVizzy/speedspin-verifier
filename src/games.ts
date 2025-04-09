import { blackjack } from "./games/blackjack";
import { dice } from "./games/dice";
import { mines } from "./games/mines";
import { plinko } from "./games/plinko";
import { roulette } from "./games/roulette";

export const games = {
  plinko,
  dice,
  blackjack,
  roulette,
  mines,
} as const;