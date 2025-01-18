//1368. Minimum Cost to Make at Least One Valid Path in a Grid
/*
Given an m x n grid. Each cell of the grid has a sign pointing to the next cell you should visit if you are currently in this cell. The sign of grid[i][j] can be:
1 which means go to the cell to the right. (i.e go from grid[i][j] to grid[i][j + 1])
2 which means go to the cell to the left. (i.e go from grid[i][j] to grid[i][j - 1])
3 which means go to the lower cell. (i.e go from grid[i][j] to grid[i + 1][j])
4 which means go to the upper cell. (i.e go from grid[i][j] to grid[i - 1][j])
Notice that there could be some signs on the cells of the grid that point outside the grid.
You will initially start at the upper left cell (0, 0). A valid path in the grid is a path that starts from the upper left cell (0, 0) and ends at the bottom-right cell (m - 1, n - 1) following the signs on the grid. The valid path does not have to be the shortest.
You can modify the sign on a cell with cost = 1. You can modify the sign on a cell one time only.
Return the minimum cost to make the grid have at least one valid path.

Example 1:
Input: grid = [[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]
Output: 3
Explanation: You will start at point (0, 0).
The path to (3, 3) is as follows. (0, 0) --> (0, 1) --> (0, 2) --> (0, 3) change the arrow to down with cost = 1 --> (1, 3) --> (1, 2) --> (1, 1) --> (1, 0) change the arrow to down with cost = 1 --> (2, 0) --> (2, 1) --> (2, 2) --> (2, 3) change the arrow to down with cost = 1 --> (3, 3)
The total cost = 3.
Example 2:

Input: grid = [[1,1,3],[3,2,2],[1,1,4]]
Output: 0
Explanation: You can follow the path from (0, 0) to (2, 2).
Example 3:

Input: grid = [[1,2],[4,3]]
Output: 1
 
Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 100
1 <= grid[i][j] <= 4
*/
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minCost = function(grid) {
    // Directions mapping based on the problem: 
    // 1 -> right, 2 -> left, 3 -> down, 4 -> up
    const directions = {
        1: [0, 1],   // right
        2: [0, -1],  // left
        3: [1, 0],   // down
        4: [-1, 0]   // up
    };

    // Define the number of rows and columns in the grid
    const ROWS = grid.length;
    const COLS = grid[0].length;

    // Queue for BFS traversal, initialized with the starting point [row, col, cost]
    const queue = [[0, 0, 0]];

    // Map to store the minimum cost for each cell (key: "row,col", value: cost)
    const minCost = new Map();
    minCost.set("0,0", 0); // Starting point cost is 0

    // BFS traversal to find the minimum cost path
    while (queue.length > 0) {
        // Dequeue the first element from the queue
        const [r, c, cost] = queue.shift();

        // If we reach the bottom-right corner, return the accumulated cost
        if (r === ROWS - 1 && c === COLS - 1) {
            return cost;
        }

        // Explore all 4 possible directions from the current cell
        for (const [d, [dr, dc]] of Object.entries(directions)) {
            // Calculate the new row and column based on the direction
            const nr = r + dr;
            const nc = c + dc;

            // Determine the cost to move to the new cell
            // If the current direction matches the grid's value, cost remains the same
            // Otherwise, increase the cost by 1
            const nCost = d == grid[r][c] ? cost : cost + 1;

            // Check if the new cell is out of bounds or if there's a cheaper way to reach it
            if (
                nr < 0 || nc < 0 || nr >= ROWS || nc >= COLS || // Out of bounds
                (minCost.has(`${nr},${nc}`) && nCost >= minCost.get(`${nr},${nc}`)) // Already visited with a lower cost
            ) {
                continue; // Skip this direction
            }

            // Update the minimum cost for the new cell
            minCost.set(`${nr},${nc}`, nCost);

            // Add the new cell to the queue
            // Prioritize same-direction moves by adding them to the front of the queue
            if (d == grid[r][c]) {
                queue.unshift([nr, nc, nCost]); // Add to the front for same-direction moves
            } else {
                queue.push([nr, nc, nCost]); // Add to the back for direction changes
            }
        }
    }

    // Return -1 as a fallback, though the problem guarantees a path exists
    return -1;
};
