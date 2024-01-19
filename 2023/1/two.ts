const numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const isStringNum = (string) => {
  for (let num in numbers) {
    if (string.indexOf(numbers[num]) === 0) {
      return Number(num) + 1;
    }
  }
  return false;
}

const getfirstNum = (row) => {
  while (row.length > 0) {
    if (/^[0-9]*$/.test(row[0])) {
      return row[0];
    }
    if (isStringNum(row)) {
      return isStringNum(row);
    }
    row = row.slice(1);
  }
}
const getLastNum = (row) => {
  for (let i = row.length-1; i >= 0; i--) {
    if (/^[0-9]*$/.test(row[i])) {
      return row[i];
    }
    const num = isStringNum(row.slice(i, row.length))
    if (num) {
      return num;
    }
  }
}

const getSumOfCalibrationWithStrings = (file) => {
  const input = file.toString().split("\n");
  let total = 0;
  let numLeft;
  let numRight;
  let row;

  for(let i = 0; i < input.length; i++) {
    row = input[i];
    
    numRight = getLastNum(row);
    numLeft = getfirstNum(row);
    row = input[i].split('').reverse().join('');
    total +=  Number(`${numLeft}${numRight}`);
  }

  console.log(total);
};

exports.default = getSumOfCalibrationWithStrings;
