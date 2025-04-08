import { expect, test } from 'vitest'
import { dice } from '@/games/dice'

const TEST_CASES = [
  {
    input: '91f225a82e80b438f0cee65f:placeholder:926',
    output: '5378',
  }
]

test('dice', () => {
  for (const testCase of TEST_CASES) {
    const result = dice.process(testCase.input);
    expect(result.result).toBe(testCase.output);
  }
});
