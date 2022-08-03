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
                    if(parseFloat(secondNum).toFixed(2) == 0.00) {
                        alert("Cannot divide by zero!")
                        secondNum = "";
                        input.innerText = "";
                    } else {
                        displayValue = (parseFloat(firstNum) / parseFloat(secondNum)).toFixed(2);
                    }
                };
                let index = displayValue.toString().indexOf(".");
                if(index !== -1) {
                    if(displayValue.toString().includes("00") == true) {
                        displayValue = displayValue.slice(0, index);
                    } else if(displayValue.toString().includes("0", displayValue.toString().length-1)) {
                        displayValue = displayValue.slice(0, index+2);
                    } 
                };
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