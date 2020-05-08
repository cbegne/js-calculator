import "./styles.scss";

let firstNumber = "0";
let secondNumber = "0";
let sign = "";
let results = 0;

const getNumberFromString = (string) => {
  return Number.parseInt(Math.floor(string));
};

const checkIfNumber = (string) => {
  return !Number.isNaN(Number.parseInt(string));
};

const reset = () => {
  firstNumber = "0";
  secondNumber = "0";
  sign = "";
  return 0;
};

const checkIsSign = (sign) => {
  return sign === "÷" || sign === "+" || sign === "-" || sign === "×";
};

const calculate = () => {
  const first = getNumberFromString(firstNumber);
  const second = getNumberFromString(secondNumber);
  if (sign === "+") return first + second;
  if (sign === "÷") return first / second;
  if (sign === "-") return first - second;
  if (sign === "×") return first * second;
};

const resetAfterCalculate = (newResults) => {
  firstNumber = newResults.toString();
  secondNumber = "0";
  sign = "";
};

const addFigure = (figure, total) => {
  return total + figure;
};

const saveNumber = (figure) => {
  if (!sign) {
    firstNumber = addFigure(figure, firstNumber);
    return getNumberFromString(firstNumber);
  } else {
    secondNumber = addFigure(figure, secondNumber);
    return getNumberFromString(secondNumber);
  }
};

const addSign = (item) => {
  sign = item;
  return 0;
};

const deleteFigure = (total) => {
  if (total === "0" || total.length === 1) return "0";
  const truncatedFigure = total.substring(0, total.length - 1);
  return truncatedFigure;
};

const removeLastFigure = () => {
  if (!sign) {
    firstNumber = deleteFigure(firstNumber);
    return getNumberFromString(firstNumber);
  } else {
    secondNumber = deleteFigure(secondNumber);
    return getNumberFromString(secondNumber);
  }
};

const showFinalResults = () => {
  if (!sign) return;
  const newResults = calculate();
  resetAfterCalculate(newResults);
  return newResults;
};

const activateCalculation = (event) => {
  const item = event.target.innerText;
  let newResults;
  if (checkIfNumber(item)) {
    newResults = saveNumber(item);
  } else if (item === "C") {
    newResults = reset();
  } else if (item === "=") {
    newResults = showFinalResults();
  } else if (checkIsSign(item)) {
    newResults = addSign(item);
  } else if (item === "←") {
    newResults = removeLastFigure();
  }
  resultsDOM.innerHTML = newResults;
};

const actionButtons = document.querySelector(".action-buttons");
actionButtons.addEventListener("click", activateCalculation);

const resultsDOM = document.querySelector(".result");
resultsDOM.innerHTML = results;
