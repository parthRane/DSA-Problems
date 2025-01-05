// 2381. Shifting Letters II
/*
You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. 
For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the 
characters backward if directioni = 0. Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').
Return the final string after all such shifts to s are applied.
*/

/**
 * @param {string} s
 * @param {number[][]} shifts
 * @return {string}
 */
var shiftingLetters = function(s, shifts) {
    let n = s.length;
    let prefixDiff = new Array(n).fill(0);
    for (let shift of shifts) {
            if (shift[2] === 1) {
                prefixDiff[shift[0]] += 1;
                if (shift[1] + 1 < n) {
                    prefixDiff[shift[1] + 1] -= 1;
                }
            } else {
                prefixDiff[shift[0]] -= 1;
                if (shift[1] + 1 < n) {
                    prefixDiff[shift[1] + 1] += 1;
                }
            }
        }
    let numberOfShifts = 0;
    let result = s.split('');
    for(let i = 0;i<n;i++){
        numberOfShifts = (numberOfShifts + prefixDiff[i]) % 26;
        if (numberOfShifts < 0) {
            numberOfShifts += 26;
        }
        const shiftedChar = String.fromCharCode((s.charCodeAt(i) - 97 + numberOfShifts) 
        % 26 + 97);
        result[i] = shiftedChar;
    }
    return result.join('');
    
};