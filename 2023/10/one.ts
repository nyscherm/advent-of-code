const EAST = 'east';
const SOUTH = 'south';
const WEST = 'west';
const NORTH = 'north';

const possibleSteps = {
  "|": [NORTH, SOUTH],
  "-": [EAST, WEST],
  "L": [NORTH, EAST],
  "J": [NORTH, WEST],
  "7": [SOUTH, WEST],
  "F": [SOUTH, EAST]
}

const getNextSteps = (grid, location) => {
  let x = location.x;
  let y = location.y;
  let steps;
  steps = [];
  let char;

  if (y - 1 >= 0) {
    char = grid[y - 1][x];
    if (char === 'F' || char === '7' || char === '|') {
      steps.push({ x: x, y: y - 1, char, prev: SOUTH });
    }
  }

  if (y + 1 < grid.length) {
    char = grid[y + 1][x];
    if (char == 'L' || char == 'J' || char == '|') {
      steps.push({ x: x, y: y + 1, char, prev: NORTH });
    }
  }

  if (x - 1 >= 0) {
    char = grid[y][x - 1];
    if (char === 'L' || char === 'F' || char === '-') {
      steps.push({ x: x - 1, y: y, char, prev: EAST });
    }
  }
  
  if (x + 1 < grid[0].length) {
    char = grid[y][x + 1];
    if (char === 'J' || char === '7' || char === '-') {
      steps.push({ x: x + 1, y: y, char, prev: WEST });
    }
  }

  return steps;
}

const getNextDirection = (char, prev) => {
  for (let step in possibleSteps) {
    if (step === char) {
      const options = possibleSteps[step];
      if (options[0] != prev) return options[0];
      return options[1];
    }
  }
};

const getStartTile = tiles => {
  for (let i = 0; i < tiles.length; i++) {
    let row = tiles[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === 'S') return { x: j, y:i }
    }
  }
}

const takeAStep = (grid, step) => {
  const next = getNextDirection(step.char, step.prev);
  let x;
  let y;

  if (next === EAST) {
    x = step.x + 1;
    y = step.y;
    return { x, y, char: grid[y][x], prev: WEST }
  }
  if (next === SOUTH) {
    x = step.x;
    y = step.y + 1;
    return { x, y, char: grid[y][x], prev: NORTH }
  }
  if (next === WEST) {
    x = step.x - 1;
    y = step.y;
    return { x, y, char: grid[y][x], prev: EAST }
  }
  if (next === NORTH) {
    x = step.x;
    y = step.y - 1;
    return { x, y, char: grid[y][x], prev: SOUTH }
  }
}

const answer = (file) => {
  const input = file.toString().split("\n");
  let tiles;
  tiles = [];
  input.forEach(line => tiles.push(line.trim().split('')));
  let firstCount = 2;
  let secondCount = 2;
  const start = getStartTile(tiles);
  const steps = getNextSteps(tiles, start);
  let first = takeAStep(tiles, steps[0]);
  let second = takeAStep(tiles, steps[1]);

  while (first?.x != second?.x || first?.y != second?.y || first?.char != second?.char) {
    firstCount++;
    secondCount++;
    first = takeAStep(tiles, first);
    second = takeAStep(tiles, second);
  }

  console.log('count', firstCount);  
};

exports.default = answer;
