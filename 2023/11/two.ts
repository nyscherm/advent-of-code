const addRows = (tiles) => {
  let isEmpty;
  let emptyRows;
  emptyRows = [];
  for (let row in tiles) {
    isEmpty = true;
    for (let data of tiles[row]) {
      if (data != '.') {
        isEmpty = false;
        break;
      }
    }
    
    if (isEmpty) {
      emptyRows.unshift(row);
    }
  }

  for (let row of emptyRows) {
    tiles[row].fill('m');
  }
}

const addColumns = (tiles) => {
  let columns = new Array(tiles[0].length);
  columns.fill(true);
  let emptyColumns;
  emptyColumns = [];

  for (let row in tiles) {
    for (let data in tiles[row]) {
      if (tiles[row][data] === '#') {
        columns[data] = false;
      }
    }
  }

  for (let x in columns) {
    if (columns[x]) emptyColumns.unshift(x); 
  }
  for (let row of tiles) {
    for (let x of emptyColumns) {
      row[x] ='m';
    }
  }
}

const getAllGalaxies = (tiles) => {
  let galaxies;
  galaxies = [];

  for (let row in tiles) {
    for (let data in tiles[row]) {
      if (tiles[row][data] === '#') {
        galaxies.push([data, row]);
      }
    }
  }

  return galaxies;
}

const getShortestDistance = (first, second, tiles) => {
  // console.log('first', first)
  // console.log('second', second)
  // console.log(Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]))
  let basicDistance = Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]);
  let millions = 0;
  for (let x = Math.min(first[0], second[0]); x < Math.max(first[0], second[0]); x++) {
    if (tiles[first[1]][x] === 'm') {
      basicDistance--;
      millions++;
    }
  }
  for (let y = Math.min(first[1], second[1]); y < Math.max(first[1], second[1]); y++) {
    if (tiles[y][second[0]] === 'm') {
      basicDistance--;
      millions++;
    }
  }
  return basicDistance + 1000000 * millions;
}

const calculateBiggerCosmicExpansion = (file) => {
  const input = file.toString().split("\n");
  let tiles;
  let count;
  tiles = [];
  count = 0;
  input.forEach(line => tiles.push(line.trim().split('')));
  addRows(tiles);
  addColumns(tiles);

  const galaxies = getAllGalaxies(tiles);

  for (let a in galaxies) {
    for (let b = Number(a) + 1; b < galaxies.length; b++) {
      count += getShortestDistance(galaxies[a], galaxies[b], tiles);
    }
  }

  console.log(count)
};

exports.default = calculateBiggerCosmicExpansion;
