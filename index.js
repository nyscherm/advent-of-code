const fs = require('node:fs');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const readFile = (day) => {
  try {
    const data = fs.readFileSync(__dirname + '/2023/' + day + '/input', 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
};

rl.question('Which day do you want to run the code for? (1-25) ', (day) => {
  rl.question('Which part do you want to run? (one or two)', (part) => {
    const func = require(__dirname + '/2023/' + day + '/' + part + '.ts');
    func.default(readFile(day));
    rl.close();
  });
});

