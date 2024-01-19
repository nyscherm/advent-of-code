const getSumOfCalibration = (file) => {
  const input = file.toString().split("\n");
  let total = 0;
  let numLeft;
  let numRight;

  for(let i = 0; i < input.length; i++) {
    let row = input[i];
    
    for(let index = 0; index < row.length; index++) {
    numLeft = -1;
      if (numLeft === -1 && /^[0-9]*$/.test(row[index])) {
        numLeft = row[index];
        break;
      }
    }

    for(let index = row.length-1; index >= 0; index--) {
      numRight = -1;
      if (numRight === -1 && /^[0-9]*$/.test(row[index])) {
        numRight = row[index];;
        break;
      }
    }
    total +=  Number(`${numLeft}${numRight}`);
  }

  console.log(total);
};

exports.default = getSumOfCalibration;
