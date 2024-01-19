const getNumAtPos = (row, pos) => {
  let numStart = pos;
  let numEnd = pos;
  let num = row[pos];

  for (numStart; numStart > 0; numStart --) {
    if (/\D/.test(row[numStart - 1])) {
      break;
    }
    num = row[numStart - 1] + num;
  }

  for (numEnd; numEnd < row.length - 1; numEnd ++) {
    if (/\D/.test(row[numEnd + 1])) {
      break;
    }

    num = num + row[numEnd + 1];
  }
  return num;
}

const getAdjacentNumbers = (min, max, row) => {
  let isNum = false;
  let numArr;
  numArr = [];
  for (min; min <= max; min++) {
    if (/\d/.test(row[min])) {
      if (!isNum) {
        isNum = true;
        numArr.push(getNumAtPos(row, min));
      }
    }
    else {
      isNum = false;
    }
  }
  return numArr;
}

const gearRatioSum = (file) => {
  const input = file.toString().split("\n");
  let total = 0;
  let prevRow;
  let row = input[0];
  let nextRow;
  let currentChar;
  let min;
  let max;
  let adjacentNums;

  prevRow = null;

  for(let i = 1; i <= input.length; i++) {
    nextRow = i > input.length ? null : input[i];
    
    for (let j = 0; j <= row.length; j++) {
      currentChar = row[j];
      adjacentNums = [];
      if (currentChar === '*') {
        min = Math.max(0, j-1);
        max = Math.min(row.length, j+1);
        adjacentNums = prevRow ? getAdjacentNumbers(min, max, prevRow) : [];
        adjacentNums = adjacentNums.concat(getAdjacentNumbers(min, max, row));
        adjacentNums = adjacentNums.concat(nextRow ? getAdjacentNumbers(min, max, nextRow) : []);

        if (adjacentNums.length === 2) {
          total += adjacentNums[0] * adjacentNums[1];
        };
      }
    }
    row = input[i];
    prevRow = input[i-1];
  }
  console.log(total);
};

exports.default = gearRatioSum;
