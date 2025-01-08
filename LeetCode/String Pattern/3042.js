// You are given a 0-indexed string array words.

// Let's define a boolean function isPrefixAndSuffix that takes two strings, str1 and str2:

// isPrefixAndSuffix(str1, str2) returns true if str1 is both a
// prefix
//  and a
// suffix
//  of str2, and false otherwise.

/**
 * @param {string[]} words
 * @return {number}
 */
var countPrefixSuffixPairs = function (words) {
  let count = 0;
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (isPrefixAndSuffix(words[i], words[j])) {
        count++;
      }
    }
  }
  return count;
};

function isPrefixAndSuffix(str1, str2) {
  return str2.startsWith(str1) && str2.endsWith(str1);
}
