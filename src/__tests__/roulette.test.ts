import { expect, test } from 'vitest'
import { roulette } from '@/games/roulette'

const TEST_CASES = [
  {
    input: '2c10efdd7a86356478fe8774:placeholder:212',
    output: '27',
  }
]

test('roulette', () => {
  for (const testCase of TEST_CASES) {
    const result = roulette.process(testCase.input);
    expect(result.result).toBe(testCase.output);
  }
});
