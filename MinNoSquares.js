// Minimum Number of Squares
/*
Problem Description
Given an integer A. Return minimum count of numbers, sum of whose squares is equal to A.

Problem Constraints
1 <= A <= 105

Input Format
First and only argument is an integer A.

Output Format
Return an integer denoting the minimum count.

Example Input
Input 1:
 A = 6
Input 2:
 A = 5

Example Output
Output 1:
 3
Output 2:
 2

Example Explanation
Explanation 1:
 Possible combinations are : (12 + 12 + 12 + 12 + 12 + 12) and (12 + 12 + 22).
 Minimum count of numbers, sum of whose squares is 6 is 3. 
Explanation 2:
 We can represent 5 using only 2 numbers i.e. 12 + 22 = 5
*/
module.exports = { 
    //param A : integer
    //return an integer
       countMinSquares : function(A){
           if(A == 1){
               return 1;
           }
           let dp = new Array(A+1).fill(0);
           dp[1] = 1;
           for(let i =2;i<=A;i++){
               let ans = Infinity;
               for(let j =1;j*j<=i;j++){
                   ans = Math.min(ans,dp[i-j*j]+1);
               }
               dp[i] = ans;
           }
           return dp[A];
   
       }
   };
   