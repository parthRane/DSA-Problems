// Problem Link
// https://leetcode.com/problems/construct-k-palindrome-strings/description/

/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var canConstruct = function (s, k) {
  if (k > s.length) {
    return false;
  }

  let countMap = new Map();
  let splitedStr = s.split("");
  splitedStr.forEach((letter) => {
    if (countMap.has(letter)) {
      let currentCount = countMap.get(letter);
      countMap.set(letter, currentCount + 1);
    } else {
      countMap.set(letter, 1);
    }
  });

  let odd = 0;
  for (const counter of countMap.values()) {
    if (counter % 2 !== 0) {
      odd += 1;
    }
  }

  return odd <= k;
};

//Solved By Parth
/**
 * @param {string} s
 * @param {number} k
 * @return {boolean}
 */
var canConstruct = function(s, k) {
  if (k > s.length) {
      return false;
  }
  let map = new Map();
  for (const char of s) {
      if (map.has(char)) {
          map.set(char, map.get(char) + 1);
      } else {
          map.set(char, 1);
      }
  }
  let odd = 0;
  for (let count of map.values()) {
      odd += count % 2;
  }
  return odd <= k;
};
