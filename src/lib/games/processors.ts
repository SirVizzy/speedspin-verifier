export type GameOutcome = {
  value: number | string;
  metadata?: Record<string, string | number | boolean | null>;
};

export type GameProcessor = {
  process: (seed: string) => GameOutcome;
}

export const processors: Record<string, GameProcessor> = {
  plinko: {
    process: (seed: string) => {
      return {
        value: 'L',
        metadata: {
          rank: 1,
          suit: 'clubs',
          player: 'Dealer'
        }
      };
    },
  }
};

export const getProcessor = (gameName: string) => {

  if (!processors[gameName]) {
    throw new Error(`Unable to find processor for game: ${gameName} - please report this issue.`);
  }

  return processors[gameName];
}
