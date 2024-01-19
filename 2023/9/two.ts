const getNextSeq = (input) => {
  let next = new Array(input.length - 1);
  let isLast = true;

  for (let i = 0; i < next.length; i++) {
    next[i] = input[i+1] - input[i];
    if (isLast && next[i] != 0) isLast = false;
  }
  return {next, isLast};
}

const getSeries = (history) => {
  let sequences = history;
  let { next, isLast } = getNextSeq(history[0]);
  sequences.unshift(next);
  if (!isLast) getSeries(sequences);
  return sequences;
}

const getNextNum = (sequence, prev) => {
  sequence.unshift(sequence[0] - prev[0]);
}

const getNextVal = (sequences) => {
  for (let i=1; i< sequences.length; i++) {
    getNextNum(sequences[i], sequences[i-1]);
  }
  return sequences[sequences.length -1][0];
}

const oasisReportReverse = (file) => {
  const input = file.toString().split("\n");
  let readings;
  let total = 0;
  readings = [];
  input.forEach(line => readings.push(line.trim().split(' ').map(e => Number(e))));

  readings.forEach(history => {
    let series = getSeries([history]);
    total += getNextVal(series);
  });

  console.log(total)
 
};

exports.default = oasisReportReverse;
