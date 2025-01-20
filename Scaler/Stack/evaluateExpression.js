//Q1. Evaluate Expression
/*
Problem Description
An arithmetic expression is given by a string array A of size N. Evaluate the value of an arithmetic expression in Reverse Polish Notation.
Valid operators are +, -, *, /. Each string may be an integer or an operator.
Note: Reverse Polish Notation is equivalent to Postfix Expression, where operators are written after their operands.
Problem Constraints
1 <= N <= 105
Input Format
The only argument given is string array A.
Output Format
Return the value of arithmetic expression formed using reverse Polish Notation.
Example Input
Input 1:
A =   ["2", "1", "+", "3", "*"]
Input 2:
A = ["4", "13", "5", "/", "+"]
Example Output
Output 1:
9
Output 2:
6
Example Explanation
Explaination 1:
starting from backside:
    * : () * ()
    3 : () * (3)
    + : (() + ()) * (3)
    1 : (() + (1)) * (3)
    2 : ((2) + (1)) * (3)
    ((2) + (1)) * (3) = 9
Explaination 2:
starting from backside:
    + : () + ()
    / : () + (() / ())
    5 : () + (() / (5))
    13 : () + ((13) / (5))
    4 : (4) + ((13) / (5))
    (4) + ((13) / (5)) = 6
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
}
module.exports = {
    //param A : array of strings
    //return an integer
    evalRPN: function (A) {
        let operator = ["+", "-", "/", "*"];
        let ans = 0;
        let stack = new Stack();
        for (const i of A) {
            if (!operator.includes(i)) {
                stack.push(Number(i));
            } else {
                let num2 = stack.peek();
                stack.pop();
                let num1 = stack.peek();
                stack.pop();
                if (i == '+') {
                    let z = num1 + num2;
                    stack.push(z);
                } else if (i == '-') {
                    let z = num1 - num2;
                    stack.push(z);
                } else if (i == '/') {
                    let z = Math.floor(num1 / num2);
                    stack.push(z);
                } else if (i == '*') {
                    let z = Math.floor(num1 * num2);
                    stack.push(z);
                }
            }
        }
        return stack.peek();
    }
};
