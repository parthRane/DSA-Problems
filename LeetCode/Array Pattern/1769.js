// 1769. Minimum Number of Operations to Move All Balls to Each Box
/*
You have n boxes. You are given a binary string boxes of length n, where boxes[i] is '0' if the ith box is empty, and '1' if it 
contains one ball. In one operation, you can move one ball from a box to an adjacent box. Box i is adjacent to box j if 
abs(i - j) == 1. Note that after doing so, there may be more than one ball in some boxes. Return an array answer of size n,
where answer[i] is the minimum number of operations needed to move all the balls to the ith box. Each answer[i] is calculated 
considering the initial state of the boxes.
*/
/**
 * @param {string} boxes
 * @return {number[]}
 */
var minOperations = function(boxes) {
    const boxesArr = boxes.split("").map(Number);
    let result = new Array(boxes.length).fill(0);
    let balls = 0, moves = 0;
    for(let i=0;i<boxesArr.length;i++){
        result[i] = balls + moves;
        moves = moves + balls;
        balls += boxesArr[i];

    }
    balls = 0, moves = 0;
    for(let i= boxesArr.length -1;i >= 0; i--){
        result[i] += balls + moves;
        moves = moves + balls;
        balls += boxesArr[i];

    }
    return result;
    
};