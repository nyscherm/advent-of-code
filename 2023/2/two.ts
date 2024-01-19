const checkValueForColor = (val, color) => {
  if (val.indexOf(color) != -1) {
    val = val.slice(0, val.indexOf(color) - 1).trim();
    return Number(val);
  }
  return 0;
}

const getColorValues = (round) => {
  let dice = round.split(',');
  let red = 0;
  let green = 0;
  let blue = 0;

  for (let set of dice) {
    red += checkValueForColor(set, 'red');
    green += checkValueForColor(set, 'green');
    blue += checkValueForColor(set, 'blue');
  }
  return [red, green, blue];
}

const sumOfDicePowers = (file) => {
  const input = file.toString().split("\n");
  let total = 0;
  let row;
  let rounds;

  for(let i = 0; i < input.length; i++) {
    row = input[i];
    let score = [0, 0, 0];
    let currentScore;

    row = row.slice(row.indexOf(':') + 1);
    rounds = row.split(';');

    for (let round of rounds) {
      currentScore = getColorValues(round);
      for (let j = 0; j < score.length; j++) {
        if (currentScore[j] > score[j]) {
          score[j] = currentScore[j];
        }
      }
    }
    total += score[0] * score[1] * score[2];
  }
  console.log(total);
};

exports.default = sumOfDicePowers;
