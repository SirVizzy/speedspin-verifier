import { GameProcessor } from "@/processors";
import seedrandom from "seedrandom";

const RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
const SUITS = ["(Clubs)", "(Diamonds)", "(Hearts)", "(Spades)"];

export const blackjack: GameProcessor = {
  process: (seed: string) => {

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

// given seed = 91f225a82e80b438f0cee65f:placeholder:1000
// client seed = placeholder
// nonce = 1000
// server seed = 91f225a82e80b438f0cee65f