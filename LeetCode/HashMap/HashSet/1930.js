// 1930. Unique Length-3 Palindromic Subsequences
/*
Given a string s, return the number of unique palindromes of length three that are a subsequence of s.
Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.
A palindrome is a string that reads the same forwards and backwards. A subsequence of a string is a new string
generated from the original string with some characters (can be none) deleted without changing the relative order of the 
remaining characters. For example, "ace" is a subsequence of "abcde".

Example 1:
Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")

*/

/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function(s) {
    let res = new Set();
    let left = new Set();
    let map = new Map();
    for(const char of s){
        if(map.has(char)){
            map.set(char,map.get(char)+1);
        }else{
            map.set(char,1);
        }
    }
    for(const midChar of s){
        map.set(midChar, map.get(midChar)-1);
        for(const outerChar of left){
            if(map.get(outerChar)>0){
                res.add(`${midChar}${outerChar}`);
            }
        }
        left.add(midChar);
    }
    return res.size;
};