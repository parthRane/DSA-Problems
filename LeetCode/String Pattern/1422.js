// 1422. Maximum Score After Splitting a String

/* 
Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings 
(i.e. left substring and right substring).The score after splitting a string is the number of zeros in the left substring
 plus the number of ones in the right substring. 
 */
/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
    let count0 = 0;
    let count1 = s.split("1").length - 1;
    let result = 0;
    for (let i = 0; i < s.length - 1; i++) {
        if (s.charAt(i) == '0') {
            count0 += 1;
        } else {
            count1 -= 1;
        }
        result = Math.max(result, count0 + count1);
    }
    return result;


};