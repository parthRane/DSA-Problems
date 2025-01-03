//2270. Number of Ways to Split Array

/* You are given a 0-indexed integer array nums of length n.
nums contains a valid split at index i if the following are true:
The sum of the first i + 1 elements is greater than or equal to the sum of the last n - i - 1 elements.
There is at least one element to the right of i. That is, 0 <= i < n - 1.
Return the number of valid splits in nums. */
/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplitArray = function(nums) {
    let leftSum = 0;
    let rightSum = nums[0];
    let ans = 0; // ans represents number of valid split count
    for(let i=1;i<nums.length;i++){
        rightSum += nums[i];
    };
    for(let i =0;i<nums.length-1;i++){
        leftSum += nums[i];
        rightSum -= nums[i];
        if(leftSum >= rightSum){
            ans++;
        }
    }
    return ans;
};