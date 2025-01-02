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
