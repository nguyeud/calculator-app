// Constants
const input = document.getElementById("input");
const history = document.getElementById("history");
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const decimal = document.querySelector(".decimal");
const clear = document.querySelector(".clear");
const remove = document.querySelector(".delete");

// Variables
let displayValue = 0;
let firstNum = "";
let secondNum = "";
let firstOp = "";
let secondOp = "";

numbers.forEach(number => {
    number.addEventListener("click", e => {
        if(firstOp === "") { // Read first number if no operator set yet
            if(firstNum.length < 8) {
                firstNum += e.target.innerText;
                input.innerText = firstNum;
                history.innerText = "";
            }
        } else { // Read second number
            if(secondNum.length < 8) {
                secondNum += e.target.innerText;
                input.innerText = secondNum;
                history.innerText = firstNum + " " + firstOp;
            }
        };
    });
});

operands.forEach(op => {
    op.addEventListener("click", e => {
        if(firstNum !== "") {
            if(firstOp !== ""  && firstOp !== "=") {
                secondOp = firstOp;
                firstOp = e.target.innerText;
                history.innerText = firstNum + " " + secondOp + " " + secondNum;
                if(secondNum !== "" && secondOp == "+") {
                    displayValue = (parseFloat(firstNum) + parseFloat(secondNum)).toFixed(2);
                } else if(secondNum !== "" && secondOp == "-") {
                    displayValue = (parseFloat(firstNum) - parseFloat(secondNum)).toFixed(2);
                } else if(secondNum !== "" && secondOp == "×") {
                    displayValue = (parseFloat(firstNum) * parseFloat(secondNum)).toFixed(2);
                } else if(secondNum !== "" && secondOp == "÷") {
                    if(parseFloat(secondNum) == 0) {
                        alert("Cannot divide by zero!")
                        secondNum = "";
                        input.innerText = "";
                    } else {
                        if((parseFloat(firstNum) / parseFloat(secondNum)) < 0.1) { // allow of notation
                            displayValue = (parseFloat(firstNum) / parseFloat(secondNum));
                        } else {
                            displayValue = (parseFloat(firstNum) / parseFloat(secondNum)).toFixed(2);
                        }
                    }
                };
                console.log(displayValue);
                let index = displayValue.toString().indexOf(".");
                // if a decimal is present...
                if(index !== -1) {
                    // if numbers are integers, remove extra zeros
                    if(displayValue.toString().includes(".00") == true && displayValue.length !== undefined) {
                        displayValue = displayValue.slice(0, index);
                    } 
                    // notation for numbers over 8 char in length
                    if(displayValue.length > 8) {
                        let multiplier = "";
                        for(let i = 0; i < displayValue.length - 1; i++) {
                            multiplier += "0";
                        }
                        let num = displayValue / parseInt("1" + multiplier);
                        let remainder = num.toString().slice(0, 5);
                        let remainderNum = parseFloat(remainder);
                        if(remainder[4] >= 5) {
                            remainderNum += 0.01
                            remainder = remainderNum.toString().slice(0, 4);
                        } else {
                            remainder = remainderNum.toString().slice(0, 4);
                        }
                        let notation = displayValue.length - 1;
                        displayValue = remainder.toString() + "e+" + notation.toString();
                    }  else if(displayValue.length == undefined && displayValue.toString().indexOf("e") == -1) { // notation for numbers < 0.01
                        let i = displayValue;
                        let notation = 0;
                        while(i < 1) {
                            if(displayValue.toString()[0] == "0") {
                                i *= 10;
                                notation++;
                            }
                        }
                        let remainder = i.toString().slice(0, 5);
                        let remainderNum = parseFloat(remainder);
                        if(remainder[4] >= 5) {
                            remainderNum += 0.01
                            remainder = remainderNum.toString().slice(0, 4);
                        } else {
                            remainder = remainderNum.toString().slice(0, 4);
                        }
                        displayValue = remainder.toString() + "e-" + notation.toString();
                    } else if(displayValue.length == undefined && displayValue.toString().indexOf("e") !== -1) { // numbers that have been notated in JS
                        let remainder = displayValue.toString().slice(0, 5);
                        let remainderNum = parseFloat(remainder);
                        if(remainder[4] >= 5) {
                            remainderNum += 0.01
                            remainder = remainderNum.toString().slice(0, 4);
                        } else {
                            remainder = remainderNum.toString().slice(0, 4);
                        }
                        let notation = displayValue.toString().slice(displayValue.toString().length - 3, displayValue.toString().length);
                        displayValue = remainder + notation;
                    }
                } 
                input.innerText = displayValue.toString();
                firstNum = displayValue.toString();
                secondNum = "";
                if(firstOp == "=") {
                    firstNum = "";
                    firstOp = "";
                    secondOp = "";
                };
            } else {
                firstOp = e.target.innerText;
                history.innerText = firstNum + " " + firstOp;
            };
        };
    });
});

decimal.addEventListener("click", e => {
    if(firstNum !== "") {
        if(firstNum.indexOf(".") == -1) {
            firstNum = firstNum + ".";
            input.innerText = firstNum;
        }
    };
    if(secondNum !== "") {
        if(secondNum.indexOf(".") == -1) {
            secondNum = secondNum + ".";
            input.innerText = secondNum;
        }
    };
});

clear.addEventListener("click", e => {
    firstNum = "";
    secondNum = "";
    firstOp = "";
    secondOp = "";
    input.innerText = "0";
    history.innerText = "";
});

remove.addEventListener("click", e => {
    if(input.innerText == firstNum) {
        firstNum = firstNum.slice(0, -1);
        input.innerText = firstNum;
    } else if(input.innerText == secondNum) {
        secondNum = secondNum.slice(0, -1);
        input.innerText = secondNum;
    }
});

$(document).ready(function() {
    history.innerText = "";
});