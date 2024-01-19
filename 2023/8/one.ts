const wastelandSteps = (file) => {
  const input = file.toString().split("\n");
  const instructions = input[0].trim();
  let nodes;
  let temp;
  let directions;
  let steps = 0;
  let nextInstruction = 0;
  nodes = [];
  temp = [];
  directions = [];

  for (let x of input.slice(2)) {
    nodes.push(x.trim().substring(0, 3));
    temp.push(x.substring(x.indexOf('(') + 1, x.indexOf(')')).split(", "));
  }
  
  for (let i in temp) {
    directions[i] = [nodes.indexOf(temp[i][0]), nodes.indexOf(temp[i][1])];
  }

  let step = nodes.indexOf('AAA');
  
  while (nodes[step] !== 'ZZZ') {
    steps++;
    if (instructions.charAt(nextInstruction) === 'L') {
      step = directions[step][0];
    } else {
      step = directions[step][1];
    }
    nextInstruction = (nextInstruction + 1) % instructions.length;
  }

  console.log(steps)
};

exports.default = wastelandSteps;
