const hasAdjacentSymbol = (symbols) => {
  if (/[^\d\.]/.test(symbols)) return true;
  return false;
}

const schematicSum = (file) => {
  const input = file.toString().split("\n");
  let total = 0;
  let prevRow = input[0];
  let row = input[0];
  let nextRow;
  let currentChar;
  let symbols;
  let min;
  let start;
  let isNum;

  for(let i = 1; i <= input.length; i++) {
    if (i < input.length) nextRow = input[i];
    start = 0;
    isNum = false;
    for (let j = 0; j <= row.length; j++) {
      currentChar = row[j];
      if (/\d/.test(currentChar)) {
        if (isNum === false) {
          isNum = true;
          start = j;
        }
      }
      else {
        if (isNum === true) {
          isNum = false;
          min = Math.max(0, start-1);
          symbols = prevRow.slice(min, j+1) + row.slice(min, j+1) + nextRow.slice(min, j+1);
          if (hasAdjacentSymbol(symbols)) total +=Number(row.slice(start, j));
        }
      }
    }
    row = input[i];
    prevRow = input[i-1];
  }

  console.log(total);
};

exports.default = schematicSum;
