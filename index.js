const operators = "+-/x";
const numbers = "0123456789.";
const actions = {
  "+": (x, y) => parseFloat(x) + parseFloat(y),
  "-": (x, y) => parseFloat(x) - parseFloat(y),
  "/": (x, y) => parseFloat(x) / parseFloat(y),
  x: (x, y) => parseFloat(x) * parseFloat(y),
};

const screen = document.getElementById("screen");

let stack = [];

function drawScreen() {
  screen.innerHTML = "";
  stack.forEach((value) => {
    screen.innerHTML = screen.innerHTML + value;
  });
}

function setStack(value) {
  stack.push(value);
  drawScreen();
}

function calc() {
  if (stack.length <= 2) {
    alert("Existe poucos inputs");
    return;
  }

  const y = stack.pop();
  const operator = stack.pop();
  const x = stack.pop();

  console.log(x, operator, y);

  setStack(actions[operator](x, y).toFixed(4));

  console.log(stack);
}

// &#x232b;
function clearLastInput() {
  if (stack.length <= 0) return;

  const lastInput = stack[stack.length - 1];

  console.log(lastInput);
  console.dir(stack);

  stack[stack.length - 1] = lastInput.slice(0, -1);
  if (stack[stack.length - 1] === "") stack.pop();

  drawScreen();
}

// C
function clearScreen() {
  screen.innerHTML = "";
  stack = [];
  console.log(stack);
}

// 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'
function addNumber(number) {
  const lastInput = stack[stack.length - 1];

  if (lastInput !== undefined && lastInput.length >= 5) return;
  if (lastInput !== undefined && number === "." && lastInput.includes(number))
    return;

  if (lastInput === undefined || operators.includes(lastInput)) {
    if (number === ".") number = "0" + number;
    setStack(number);

    return;
  }

  if (operators.includes(lastInput) && number === ".") number = "0" + number;

  stack[stack.length - 1] = stack[stack.length - 1] + number;
  drawScreen();
}

function addOperator(operator) {
  const lastInput = stack[stack.length - 1];

  if (lastInput === undefined) return;
  if (operators.includes(lastInput)) return;

  if (stack.length >= 3) calc();

  setStack(operator);
}
