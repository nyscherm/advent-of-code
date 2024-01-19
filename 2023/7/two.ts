const cards = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];

const numberOfPairs = (arr) => {
  let num =0;
  for (let x of arr) {
    if (x===2) num++;
  }
  
  return num;
}

const getCardsVal = (hand) => {
  let total = '';

  for (let card of hand) {
    total += (Number(cards.indexOf(card)) + 10).toString();
  }
  return total;
}
  

const getHandRank = (hand) => {
  const num = new Array(cards.length).fill(0);
  let jokers = 0;
  for (let i = 0; i < hand.length; i++) {
    for (let x in cards) {
      if (hand.charAt(i) === 'J') {
        jokers++;
        break;
      }
      else if (hand.charAt(i) === cards[x]) {
        num[x] = num[x] + 1;
        break;
      } 
    }
  }

  let highest = num.reduce((acc, curr) => curr > acc ? curr : acc, 0) + jokers;
  if (jokers === 0 && (numberOfPairs(num) === 2 || (highest === 3 && numberOfPairs(num) === 1))) highest = highest + .25;
  else if (jokers != 0 && ((highest === 3 && numberOfPairs(num) === 2) || (highest === 2 && numberOfPairs(num) === 1))) highest = highest + .25;
  const rank = highest; 

  return (rank * 100).toString();
}

const totalWithJokers = (file) => {
  const input = file.toString().split("\n");
  const hands = new Array(input.length);
  const bids = new Array(input.length);
  const ranks = new Array(input.length);
  let total = 0;

  for (let x in input) {
    const hand = input[x].split(' ');
    hands[x] = Number(getHandRank(hand[0]) + getCardsVal(hand[0]));
    bids[x] = Number(hand[1]);
    ranks[x] = Number(getHandRank(hand[0]) + getCardsVal(hand[0]));
  }
  ranks.sort(function(a, b) {
    return a - b;
  });
  for (let x in hands) {
    total += bids[x] * (ranks.indexOf(hands[x]) + 1);
  }

  console.log(total)
};

exports.default = totalWithJokers;
