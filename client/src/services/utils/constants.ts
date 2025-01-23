
export const TETROMINOES = {
  I: {
    shape: [
      [1, 1, 1, 1]
    ],
    color: 'cyan',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: 'yellow',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: 'purple',
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: 'green',
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: 'red',
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ],
    color: 'blue',
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ],
    color: 'orange',
  },
};

// Define an array for random generation of blocks
export const TETROMINO_ORDER = Object.keys(TETROMINOES); // ['I', 'O', 'T', 'S', 'Z', 'J', 'L']
