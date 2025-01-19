//407. Trapping Rain Water II
/*
Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it 
can trap after raining.
Example 1:
Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
Output: 4
Explanation: After the rain, water is trapped between the blocks.
We have two small ponds 1 and 3 units trapped.
The total volume of water trapped is 4.
Example 2:
Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
Output: 10
Constraints:
m == heightMap.length
n == heightMap[i].length
1 <= m, n <= 200
0 <= heightMap[i][j] <= 2 * 104
*/
/**
 * @param {number[][]} heightMap - A 2D elevation map representing heights of each unit cell
 * @return {number} - The total volume of water trapped after raining
 */
var trapRainWater = function (heightMap) {
    // If the heightMap is empty or has no valid cells, return 0 as no water can be trapped
    if (heightMap.length === 0 || heightMap[0].length === 0) return 0;

    let rows = heightMap.length; // Number of rows in the heightMap
    let cols = heightMap[0].length; // Number of columns in the heightMap

    // Create a visited matrix to track cells that have already been processed
    let visited = Array.from({ length: rows }, () => Array(cols).fill(false));

    // Initialize a minHeap to process cells in order of their height
    let min_heap = new minHeap();

    // Add all border cells to the minHeap since water can only be trapped inside
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (r == 0 || r == rows - 1 || c == 0 || c == cols - 1) {
                // Add the border cell to the heap and mark it as visited
                min_heap.insert([heightMap[r][c], r, c]);
                visited[r][c] = true;
            }
        }
    }

    let res = 0; // To store the total volume of trapped water
    let directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]; // Directions to move to neighbors (down, up, right, left)

    // Process cells in the minHeap until it is empty
    while (!min_heap.isEmpty()) {
        // Extract the cell with the smallest height from the heap
        const [height, r, c] = min_heap.extractMin();

        // Check all 4 neighboring cells
        for (let [dr, dc] of directions) {
            let nr = r + dr; // Row index of the neighbor
            let nc = c + dc; // Column index of the neighbor

            // Skip if the neighbor is out of bounds or already visited
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                // Calculate the water trapped at the neighbor cell
                // Water trapped is the difference between the current height and the neighbor height
                res += Math.max(0, height - heightMap[nr][nc]);

                // Mark the neighbor as visited
                visited[nr][nc] = true;

                // Add the neighbor to the heap with the maximum height of the current cell and neighbor
                // This ensures that the height for trapping water propagates correctly
                min_heap.insert([Math.max(height, heightMap[nr][nc]), nr, nc]);
            }
        }
    }

    // Return the total water trapped
    return res;
};

/**
 * MinHeap implementation for a priority queue.
 * Used to always process the cell with the smallest height first.
 */
class minHeap {
    constructor() {
        this.heap = []; // Array to store heap elements
    }

    /**
     * Insert a new element into the heap
     * @param {Array} item - An array [height, row, col]
     */
    insert(item) {
        this.heap.push(item); // Add the new item to the end of the heap
        this.bubbleUp(); // Reorganize the heap to maintain the min-heap property
    }

    /**
     * Extract the smallest element (minimum height) from the heap
     * @returns {Array} - The smallest element [height, row, col]
     */
    extractMin() {
        if (this.heap.length === 1) {
            return this.heap.pop(); // If only one element, remove and return it
        }
        const min = this.heap[0]; // The smallest element is at the root (index 0)
        this.heap[0] = this.heap.pop(); // Replace the root with the last element
        this.bubbleDown(); // Reorganize the heap to maintain the min-heap property
        return min; // Return the smallest element
    }

    /**
     * Check if the heap is empty
     * @returns {boolean} - True if the heap is empty, false otherwise
     */
    isEmpty() {
        return this.heap.length === 0;
    }

    /**
     * Reorganize the heap after insertion to maintain the min-heap property
     */
    bubbleUp() {
        let index = this.heap.length - 1; // Start at the last inserted element
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2); // Find the parent index
            // If the current element is greater than or equal to the parent, stop bubbling up
            if (this.heap[index][0] >= this.heap[parentIndex][0]) break;
            // Swap the current element with its parent
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex; // Move up to the parent's index
        }
    }

    /**
     * Reorganize the heap after extraction to maintain the min-heap property
     */
    bubbleDown() {
        let index = 0; // Start at the root element
        let length = this.heap.length;

        while (true) {
            let leftChildIndex = 2 * index + 1; // Index of the left child
            let rightChildIndex = 2 * index + 2; // Index of the right child
            let smallest = index; // Assume the current element is the smallest

            // If the left child exists and is smaller, update smallest
            if (leftChildIndex < length && this.heap[leftChildIndex][0] < this.heap[smallest][0]) {
                smallest = leftChildIndex;
            }

            // If the right child exists and is smaller, update smallest
            if (rightChildIndex < length && this.heap[rightChildIndex][0] < this.heap[smallest][0]) {
                smallest = rightChildIndex;
            }

            // If the current element is already the smallest, stop
            if (smallest === index) break;

            // Swap the current element with the smallest child
            [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
            index = smallest; // Move down to the smallest child's index
        }
    }
}