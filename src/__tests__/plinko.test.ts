import { expect, test } from 'vitest'
import { plinko } from '@/games/plinko'

const TEST_CASES = [
  {
    input: '529b778e19d71a10d5d76b86:placeholder:69',
    output: 'LRLLRLRLLRRLRRRL',
    options: { rows: 16 }
  }
]

test('plinko', () => {
  for (const testCase of TEST_CASES) {
    const result = plinko.process(testCase.input, testCase.options);
    expect(result.result).toBe(testCase.output);
  }
});
