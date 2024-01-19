const getScoreForCard = (cardNums, scratchNums) => {
  let count = 0;
  for (let num of cardNums) {
    if (num != '' && scratchNums.indexOf(num) != -1) count++;
  }

  if (count === 0) return 0;
  return Math.pow(2, count-1);
}

const scratchcardTotal = (file) => {
  const input = file.toString().split("\n");
  let total = 0;
  let row;
  let cardNums;
  let scratchNums;

  for(let i = 0; i < input.length; i++) {
    row = input[i];

    cardNums = row.slice(row.indexOf(':') + 1, row.indexOf('|')).trim().split(' ');
    scratchNums = row.slice(row.indexOf('|') + 1).trim().split(' ');
    total += getScoreForCard(cardNums, scratchNums);
  }

  console.log(total);
};

exports.default = scratchcardTotal;
