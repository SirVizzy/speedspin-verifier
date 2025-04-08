import { Game } from "@/processors";
import { z } from "zod";
import seedrandom from "seedrandom";

const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const SUITS = ["(Clubs)", "(Diamonds)", "(Hearts)", "(Spades)"];

export const blackjack: Game = {
  id: 'blackjack',
  schema: z.object({}),
  process: (seed) => {
    const value = seedrandom(seed)();
    const id = Math.round(value * 51)

    const card = [
      RANKS[id % RANKS.length],
      SUITS[Math.floor(id / RANKS.length)]
    ]

    const result = card.join(' ')

    return {
      result: result.toString(),
      value: value,
    }
  }
}