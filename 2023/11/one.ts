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
    tiles.splice(row, 0, new Array(tiles[0].length).fill('m'));
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
      row.splice(x, 0, 'm');
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

const getShortestDistance = (first, second) => {
  // console.log('first', first)
  // console.log('second', second)
  // console.log(Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]))
  return Math.abs(first[0] - second[0]) + Math.abs(first[1] - second[1]);
}

const calculateCosmicExpansion = (file) => {
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
      count += getShortestDistance(galaxies[a], galaxies[b]);
    }
  }

  console.log(count)
};

exports.default = calculateCosmicExpansion;
