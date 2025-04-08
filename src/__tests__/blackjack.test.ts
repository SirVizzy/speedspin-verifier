import { expect, test } from 'vitest'
import { blackjack } from '@/games/blackjack';

const TEST_CASES = [
  {
    input: '91f225a82e80b438f0cee65f:placeholder:985',
    output: 'A (Hearts), J (Hearts), 10 (Diamonds), 3 (Clubs)',
    options: {
      cards: 4
    }
  }
]

test('blackjack', () => {
  for (const testCase of TEST_CASES) {
    const result = blackjack.process(testCase.input, testCase.options);
    expect(result.result).toBe(testCase.output);
  }
});
