const checkValueForColor = (score, color) => {
  if (score.indexOf(color) != -1) {
    score = score.slice(0, score.indexOf(color) - 1).trim();
    return Number(score);
  }
  return 0;
}

const checkForHighValue = (round) => {
  let dice = round.split(',');
  for (let score of dice) {
    if (checkValueForColor(score, 'red') > 12) return true;
    if (checkValueForColor(score, 'green') > 13) return true;
    if (checkValueForColor(score, 'blue') > 14) return true;
  }
  return false;
}

const rollDice = (file) => {
  const input = file.toString().split("\n");
  let total = 0;
  let row;
  let game;
  let rounds;
  let validGame;

  for(let i = 0; i < input.length; i++) {
    row = input[i];
    validGame = true;
    game = row.slice(row.indexOf('Game') + 5, row.indexOf(':'));
    
    row = row.slice(row.indexOf(':') + 1);
    rounds = row.split(';');

    for (let round of rounds) {
      if (checkForHighValue(round)) validGame = false;
    }
    if (validGame) total +=  Number(game);
  }

  console.log(total);
};

exports.default = rollDice;
