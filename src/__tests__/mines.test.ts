import { expect, test } from 'vitest'
import { mines } from '@/games/mines';

const TEST_CASES = [
  {
    input: '529b778e19d71a10d5d76b86:placeholder:38',
    output: '0000000000010111000000010',
    options: {
      size: 5,
      mines: 5
    }
  }
]

test('mines', () => {
  for (const testCase of TEST_CASES) {
    const result = mines.process(testCase.input, testCase.options);
    const flat = result.result.flat();
    expect(flat.join('')).toBe(testCase.output);
  }
});
