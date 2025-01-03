// 2559. Count Vowel Strings in Ranges
/*
You are given a 0-indexed array of strings words and a 2D array of integers queries.Each 
query queries[i] = [li, ri] asks us to find the number of strings present in the range li to ri (both inclusive) of 
words that start and end with a vowel. Return an array ans of size queries.length, where ans[i] is the answer to the ith query.
Note that the vowel letters are 'a', 'e', 'i', 'o', and 'u'.
*/
/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function (words, queries) {
  let vowels = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"];
  let ans = new Array(queries.length).fill(0);
  let prefSum = new Array(words.length + 1).fill(0);
  for (let i = 0; i < words.length; i++) {
    let firstChar = words[i].charAt(0);
    let lastChar = words[i].at(-1); //words[i].charAt(words[i].length - 1);
    if (vowels.includes(firstChar) && vowels.includes(lastChar)) {
      prefSum[i + 1] = prefSum[i] + 1;
    } else {
      prefSum[i + 1] = prefSum[i];
    }
  }
  for (let j = 0; j < queries.length; j++) {
    let [start, end] = queries[j];
    ans[j] = prefSum[end + 1] - prefSum[start];
  }
  return ans;
};

// Kalyan

/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function (words, queries) {
  let ans = [];
  let prefixSum = new Array(words.length + 1).fill(0);
  let vowels = new Set(["a", "e", "i", "o", "u"]);
  let count = 0;

  for (let i = 0; i < words.length; i++) {
    if (
      vowels.has(words[i].charAt(0)) &&
      vowels.has(words[i].charAt(words[i].length - 1))
    ) {
      count++;
      prefixSum[i + 1] = count;
    } else {
      prefixSum[i + 1] = count;
    }
  }

  for (let j = 0; j < queries.length; j++) {
    let wordsCount = prefixSum[queries[j][1] + 1] - prefixSum[queries[j][0]];
    ans.push(wordsCount);
  }

  return ans;
};
