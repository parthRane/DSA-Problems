//Unique Path in grid
/*
Problem Description
Given a grid of size n * m, lets assume you are starting at (1,1) and your goal is to reach (n, m). 
At any instance, if you are on (x, y), you can either go to (x, y + 1) or (x + 1, y).
Now consider if some obstacles are added to the grids. 
Return the total number unique paths from (1, 1) to (n, m).
Note: 
1. An obstacle is marked as 1 and empty space is marked 0 respectively in the grid.
2. Given Source Point and Destination points are 1-based index.

Problem Constraints
1 <= n, m <= 100
A[i][j] = 0 or 1

Input Format
Firts and only argument A is a 2D array of size n * m.

Output Format
Return an integer denoting the number of unique paths from (1, 1) to (n, m).

Example Input
Input 1:
 A = [
        [0, 0, 0]
        [0, 1, 0]
        [0, 0, 0]
     ]
Input 2:
 A = [
        [0, 0, 0]
        [1, 1, 1]
        [0, 0, 0]
     ]

Example Output
Output 1:
 2
Output 2:
 0
Example Explanation
Explanation 1:
 Possible paths to reach (n, m): {(1, 1), (1, 2), (1, 3), (2, 3), (3, 3)} and {(1 ,1), (2, 1), (3, 1), (3, 2), (3, 3)}  
 So, the total number of unique paths is 2. 
Explanation 2:
 It is not possible to reach (n, m) from (1, 1). So, ans is 0.
*/
module.exports = {
    // param A : array of array of integers
    // return an integer
    uniquePathsWithObstacles: function (A) {
      const rows = A.length;
      const cols = A[0].length;
  
      // Initialize arrays to hold previous and current rows
      let prev = new Array(cols).fill(0);
      let curr = new Array(cols).fill(0);
  
      // Set the starting point based on the obstacle
      prev[0] = A[0][0] === 1 ? 0 : 1;
      curr[0] = prev[0];
  
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let first = 0, second = 0;
  
          // Skip the starting point
          if (i === 0 && j === 0) continue;
  
          if (A[i][j] !== 1) {
            if (i >= 1) first = prev[j];
            if (j >= 1) second = curr[j - 1];
          }
  
          curr[j] = first + second;
        }
  
        // Update previous row to current row
        prev = [...curr];
      }
  
      return prev[cols - 1];
    },
  
    // Helper method for memoized recursion
    uniquePathsWithObstaclesRecursive: function (A, m, n, dp) {
      // Base cases
      if (m < 0 || n < 0) return 0;
      if (A[m][n] === 1) return 0;
  
      // If already computed, return the value
      if (dp[m][n] !== -1) return dp[m][n];
  
      // If reached the starting point
      if (m === 0 && n === 0) return 1;
  
      // Recursive calls
      const back = this.uniquePathsWithObstaclesRecursive(A, m, n - 1, dp);
      const up = this.uniquePathsWithObstaclesRecursive(A, m - 1, n, dp);
  
      dp[m][n] = back + up;
      return dp[m][n];
    }
  };
  