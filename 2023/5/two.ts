const shouldMap = (src, srcRange, start, range) => {
  if (src + srcRange - 1 < start || src > start + range - 1) return false;
  return true;
}

const checkMappings = (input, categoryMap) => {
  let newMappingArr;
  let unchangedMappingArr;
  newMappingArr = [];
  unchangedMappingArr = [input];
  let hasMapped;

  for (let a = 0; a < categoryMap.length; a++) {
    for(let i = 0; i < unchangedMappingArr.length; i++) {
      if (shouldMap(unchangedMappingArr[i][0], unchangedMappingArr[i][1], categoryMap[a][1], categoryMap[a][2])) {
        let { unchangedMappings, newMappings } = getMappings(unchangedMappingArr[i][0], unchangedMappingArr[i][1], categoryMap[a][1], categoryMap[a][2], categoryMap[a][0]);
        unchangedMappingArr = unchangedMappings;
        newMappingArr = newMappingArr.concat(newMappings);
        hasMapped = true;
      }
    }
  }
  return ({ unchangedMappingArr, newMappingArr, hasMapped })
}

const categoryMapping = (inputArr, categoryMap) => {
  let tempArr;
  let recheckArr;
  tempArr = [];
  recheckArr = [];

  for(let i = 0; i < inputArr.length; i++) {
    let { unchangedMappingArr, newMappingArr } = checkMappings(inputArr[i], categoryMap);
    tempArr = tempArr.concat(newMappingArr);
    tempArr = tempArr.concat(unchangedMappingArr);
    recheckArr = recheckArr.concat(unchangedMappingArr);
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

const getDestination = (source, start, dest) => {
  return source + dest - start;
}

const getMappings = (src, srcRange, start, range, dest) => {
  let newMappings;
  let unchangedMappings;
  newMappings = [];
  unchangedMappings = [];
  
  if (src < start) {
    unchangedMappings.push([src, start-src]);
  }
  //smaller of range or srcRange, if range minus the diff between start and src if start is larger than src
  newMappings.push([getDestination(Math.max(src, start), start, dest), 
    Math.min(start + range, src + srcRange) - Math.max(src, start)]);
  if (src + srcRange > start + range) unchangedMappings.push([start + range, src + srcRange - start - range]);
  return ({unchangedMappings, newMappings});
}

const lowestSeedLocation = (file) => {
  const input = file.toString();
  let mapArr;
  let seedArr;
  mapArr = [];
  seedArr = [];

  const seeds = input.slice(input.indexOf('seeds: ') + 7, input.indexOf('seed-to-soil') - 2).split(' ').map((x) => Number(x));
  for (let s = 1; s < seeds.length; s += 2) {
    seedArr.push([seeds[s - 1], seeds[s]]);
  }

  const seedToSoilMap = stringToMapping(input.slice(input.indexOf('seed-to-soil map:') + 18, input.indexOf('soil-to-fertilizer') - 2));
  const soilToFertilizerMap = stringToMapping(input.slice(input.indexOf('soil-to-fertilizer map:') + 24, input.indexOf('fertilizer-to-water') - 2));
  const fertilizerToWaterMap = stringToMapping(input.slice(input.indexOf('fertilizer-to-water map:') + 25, input.indexOf('water-to-light') - 2));
  const waterToLightMap = stringToMapping(input.slice(input.indexOf('water-to-light map:') + 20, input.indexOf('light-to-temperature') - 2));
  const lightToTempMap = stringToMapping(input.slice(input.indexOf('light-to-temperature map:') + 26, input.indexOf('temperature-to-humidity') - 2));
  const tempToHumidityMap = stringToMapping(input.slice(input.indexOf('temperature-to-humidity map:') + 29, input.indexOf('humidity-to-location') - 2));
  const humidityToLocMap = stringToMapping(input.slice(input.indexOf('humidity-to-location map:') + 26));

  mapArr = categoryMapping(seedArr, seedToSoilMap);
  mapArr = categoryMapping(mapArr, soilToFertilizerMap);
  mapArr = categoryMapping(mapArr, fertilizerToWaterMap);
  mapArr = categoryMapping(mapArr, waterToLightMap);
  mapArr = categoryMapping(mapArr, lightToTempMap);
  mapArr = categoryMapping(mapArr, tempToHumidityMap);
  mapArr = categoryMapping(mapArr, humidityToLocMap);

  mapArr = mapArr.map(x => x[0])

  console.log(mapArr.reduce(
    (lowestValue, currentValue) => lowestValue > currentValue ? currentValue : lowestValue,
    mapArr[0],
  ));
};

exports.default = lowestSeedLocation;
