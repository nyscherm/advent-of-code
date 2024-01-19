const getScoreForCard = (cardNums, scratchNums) => {
  let count = 0;
  for (let num of cardNums) {
    if (num != '' && scratchNums.indexOf(num) != -1) count++;
  }

  return count;
}

const scratchcardsTotal = (file) => {
  const input = file.toString().split("\n");
  let total = 0;
  let row;
  let cardNums;
  let scratchNums;
  let wins;
  let copies;

  copies = new Array(input.length).fill(1);

  for(let i = 0; i < input.length; i++) {
    row = input[i];

    cardNums = row.slice(row.indexOf(':') + 1, row.indexOf('|')).trim().split(' ');
    scratchNums = row.slice(row.indexOf('|') + 1).trim().split(' ');
    wins = getScoreForCard(cardNums, scratchNums);

    for (let j=0; j < copies[i]; j++) {
      for (let k=1; k <= wins; k++) {
        copies[i+k] = copies[i+k] + 1;
      }
    }
  }

  console.log(copies.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  ));
};

exports.default = scratchcardsTotal;
