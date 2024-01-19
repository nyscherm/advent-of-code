const categoryMapping = (inputArr, categoryMap) => {
  let tempArr;
  tempArr = [];

  for(let i = 0; i < inputArr.length; i++) {
    for (let a = 0; a < categoryMap.length; a++) {
      if (shouldMap(inputArr[i], categoryMap[a][1], categoryMap[a][2])) {
        tempArr[i] = getDestination(inputArr[i], categoryMap[a][1], categoryMap[a][0]);
        break;
      }
      else {
        tempArr[i] = inputArr[i];
      };
    }
  }
  return tempArr;
}

const stringToMapping = (string) => {
  const tempArr = string.split('\n');
  let mapping;
  mapping = [];
  for (let i = 0; i < tempArr.length; i++) {
    mapping[i] = tempArr[i].split(' ').map((x) => Number(x));
  }
  return mapping;
}

const shouldMap = (source, start, range) => {
  if (source < start || source > start + range - 1) return false;
  return true;
}

const getDestination = (source, start, dest) => {
  return source + dest - start;
}

const seedsMapping = (file) => {
  const input = file.toString();
  let mapArr;
  mapArr = [];

  const seeds = input.slice(input.indexOf('seeds: ') + 7, input.indexOf('seed-to-soil') - 2).split(' ').map((x) => Number(x));

  const seedToSoilMap = stringToMapping(input.slice(input.indexOf('seed-to-soil map:') + 18, input.indexOf('soil-to-fertilizer') - 2));
  const soilToFertilizerMap = stringToMapping(input.slice(input.indexOf('soil-to-fertilizer map:') + 24, input.indexOf('fertilizer-to-water') - 2));
  const fertilizerToWaterMap = stringToMapping(input.slice(input.indexOf('fertilizer-to-water map:') + 25, input.indexOf('water-to-light') - 2));
  const waterToLightMap = stringToMapping(input.slice(input.indexOf('water-to-light map:') + 20, input.indexOf('light-to-temperature') - 2));
  const lightToTempMap = stringToMapping(input.slice(input.indexOf('light-to-temperature map:') + 26, input.indexOf('temperature-to-humidity') - 2));
  const tempToHumidityMap = stringToMapping(input.slice(input.indexOf('temperature-to-humidity map:') + 29, input.indexOf('humidity-to-location') - 2));
  const humidityToLocMap = stringToMapping(input.slice(input.indexOf('humidity-to-location map:') + 26));

  mapArr = categoryMapping(seeds, seedToSoilMap);
  mapArr = categoryMapping(mapArr, soilToFertilizerMap);
  mapArr = categoryMapping(mapArr, fertilizerToWaterMap);
  mapArr = categoryMapping(mapArr, waterToLightMap);
  mapArr = categoryMapping(mapArr, lightToTempMap);
  mapArr = categoryMapping(mapArr, tempToHumidityMap);
  mapArr = categoryMapping(mapArr, humidityToLocMap);

  console.log(mapArr.reduce(
    (lowestValue, currentValue) => lowestValue > currentValue ? currentValue : lowestValue,
    mapArr[0],
  ));
};

exports.default = seedsMapping;
