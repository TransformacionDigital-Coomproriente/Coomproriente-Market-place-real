// utils/math.util.js
exports.groupBy = (arr, key) => {
  return arr.reduce((acc, obj) => {
    const val = obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(obj);
    return acc;
  }, {});
};

exports.mean = arr => {
  const sum = arr.reduce((a, b) => a + b, 0);
  return arr.length ? sum / arr.length : 0;
};

exports.std = arr => {
  const avg = exports.mean(arr);
  const squareDiffs = arr.map(value => Math.pow(value - avg, 2));
  const avgSquareDiff = exports.mean(squareDiffs);
  return Math.sqrt(avgSquareDiff);
};
