const fs = require('node:fs');

const readFile = (filename = 'input') => {
  try {
    const data = fs.readFileSync(__dirname + '/' + filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
};

const calculateDistance = (buttonTime, raceTime) => {
  return buttonTime * (raceTime - buttonTime);
}


const getRangeTotal = (raceTime, distance) => {
  let low = 0;
  let high = raceTime;

  while (calculateDistance(low, raceTime) <= distance) low++;
  while (calculateDistance(high, raceTime) <= distance) high--;

  return high - low + 1;
}


const longRace = (file) => {
  const input = file.toString().split("\n");
  const times = input[0].slice(input.indexOf('Time: ') + 6).trim().split(' ')
    .filter((x) => x.trim().length > 0).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      '',
    );
  const distance = input[1].slice(input.indexOf('Distance: ') + 10).trim().split(' ')
    .filter((x) => x.trim().length > 0).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      '',
    );
  let total = 1;

  console.log(getRangeTotal(Number(times), Number(distance)))
};

exports.default = longRace;
