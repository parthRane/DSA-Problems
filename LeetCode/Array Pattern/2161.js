/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
var pivotArray = function (nums, pivot) {
  let lessValues = [];
  let pivotValues = [];
  let greaterValues = [];

  nums.map((num) => {
    if (num < pivot) {
      lessValues.push(num);
    } else if (num > pivot) {
      greaterValues.push(num);
    } else {
      pivotValues.push(num);
    }
  });

  return lessValues.concat(pivotValues.concat(greaterValues));
};
