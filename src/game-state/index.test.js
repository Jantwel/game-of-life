import { getInitialState, cellLifeCycle } from './index';

describe('Get initial state', () => {
  test('Should return correct size', () => {
    const rows = 50;
    const cols = 50;
    const initialState = getInitialState({ rows, cols });
    expect(initialState).toHaveLength(rows);
    initialState.forEach((row) => {
      expect(row).toHaveLength(cols);
    });
  });

  test('Should be filled with booleans', () => {
    const rows = 50;
    const cols = 50;
    const initialState = getInitialState({ rows, cols });
    initialState.forEach((row) =>
      row.forEach((cell) => expect(typeof cell).toBe('boolean'))
    );
  });
});

describe('Cell life cycle', () => {
  test('Underpopulation. Dies if has < 2 live neighbours', () => {
    expect(cellLifeCycle(true, 1)).toBe(false);
  });

  test('Survive. Lives if has 2 or 3 live neighbours', () => {
    expect(cellLifeCycle(true, 2)).toBe(true);
    expect(cellLifeCycle(true, 3)).toBe(true);
  });

  test('Overcrowding. Dies if has > 3 live neighbours', () => {
    expect(cellLifeCycle(true, 4)).toBe(false);
  });

  test('Reproduction. Dead cell become alive if 3 live neighbours', () => {
    expect(cellLifeCycle(false, 3)).toBe(true);
  });
});