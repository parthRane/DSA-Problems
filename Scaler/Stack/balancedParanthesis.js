//Q2. Balanced Paranthesis
/*
Problem Description
Given an expression string A, examine whether the pairs and the orders of “{“,”}”, ”(“,”)”, ”[“,”]” are correct in A.
Refer to the examples for more clarity.
Problem Constraints
1 <= |A| <= 100
Input Format
The first and the only argument of input contains the string A having the parenthesis sequence.
Output Format
Return 0 if the parenthesis sequence is not balanced.
Return 1 if the parenthesis sequence is balanced.
Example Input
Input 1:
 A = {([])}
Input 2:
 A = (){
Input 3:
 A = ()[] 
Example Output
Output 1:
 1 
Output 2:
 0 
Output 3:
 1 
Example Explanation
You can clearly see that the first and third case contain valid paranthesis.
In the second case, there is no closing bracket for {, thus the paranthesis sequence is invalid.
*/
class Stack {
    constructor() {
        this.data = [];
    }
    push(record) {
        this.data.push(record);
    }
    pop() {
        return this.data.pop();
    }
    peek() {
        return this.data[this.data.length - 1];
    }
    isEmpty() {
        return this.data.length == 0
    }
}
module.exports = {
    //param A : string
    //return an integer
    solve: function (A) {
        let stack = new Stack();
        let open = ['(', '{', '['];
        for (let i = 0; i < A.length; i++) {
            let char = A[i];
            if (open.includes(char)) {
                stack.push(char);
            } else {
                if (stack.isEmpty()) {
                    return 0;
                }
                let stackedEle = stack.peek();
                stack.pop();
                if ((A[i] == ')' && stackedEle == '(') ||
                    (A[i] == '}' && stackedEle == '{') ||
                    (A[i] == ']' && stackedEle == '[')) {
                    continue;
                } else {
                    return 0;
                }
            }
        }
        return stack.isEmpty() ? 1 : 0;

    }
};
