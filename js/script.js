window.onload = function() {
  clearDisplay();
};

let display = document.getElementById('display');
let currentInput = '';
let resultDisplayed = false;
let openParenthesesCount = 0;

function appendNumber(number) {
  if (resultDisplayed) {
    currentInput = '';
    resultDisplayed = false;
  }
  currentInput += number;
  updateDisplay();
}

function appendOperator(operator) {
  if (resultDisplayed) {
    resultDisplayed = false;
  }

  if (currentInput !== '' && !/[+\-*/]$/.test(currentInput)) {
    if (operator === '÷') {
      currentInput += '/';
    } else {
      currentInput += operator;
    }
    updateDisplay();
  }
}

function appendDot() {
  let currentParts = currentInput.split(/[\+\-\*\/]/);
  let lastNumber = currentParts[currentParts.length - 1];

  if (!lastNumber.includes('.')) {
    currentInput += '.';
    display.value = currentInput;
  }
}

function appendParenthesis(parenthesis) {
  if (parenthesis === '(') {
    if (resultDisplayed) {
      currentInput = '';
      resultDisplayed = false;
    }
    openParenthesesCount++;
    currentInput += parenthesis;
    display.value = currentInput;
  } else if (parenthesis === ')') {
    let lastChar = currentInput[currentInput.length - 1];

    if (openParenthesesCount > 0 && (/\d|\)/.test(lastChar))) {
      openParenthesesCount--;
      currentInput += parenthesis;
      display.value = currentInput;
    }
  }
}

function updateDisplay() {
  display.value = currentInput.replace(/\//g, '÷');
}

function clearDisplay() {
  currentInput = '';
  display.value = '';
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

function calculateResult() {
  try {
    if (openParenthesesCount === 0) {
      let result = eval(currentInput);
      display.value = result;
      currentInput = result.toString();
      resultDisplayed = true;
    } else {
      display.value = 'Error: Unmatched parentheses';
    }
  } catch (error) {
    display.value = 'Error';
  }
}

document.addEventListener('keydown', function(event) {
  const key = event.key;

  if (!isNaN(key)) {
    appendNumber(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    appendOperator(key);
  } else if (key === '.') {
    appendDot();
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearDisplay();
  }
});
