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


const winningOptions = (file) => {
  const input = file.toString().split("\n");
  const times = input[0].slice(input.indexOf('Time: ') + 6).trim().split(' ')
    .filter((x) => x.trim().length > 0).map(x => Number(x));
  const distance = input[1].slice(input.indexOf('Distance: ') + 10).trim().split(' ')
    .filter((x) => x.trim().length > 0).map(x => Number(x));
  let total = 1;
  
  for(let x = 0; x < times.length; x++) {
    total = total * getRangeTotal(times[x], distance[x]);
  }

  console.log(total)
};

exports.default = winningOptions;
