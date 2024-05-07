let display = document.querySelector('.calculator-display');
let historyContainer = document.querySelector('.calculator-history-list');

let history = [];

function factorial(number) {
  if (number === 0 || number === 1) {
      return 1;
  } else {
      return number * factorial(number - 1);
  }
}

// Function to append text to the display
function appendText(text) {
  if (display.textContent === '0' || display.textContent === 'Error') {
    display.textContent = '';
  }
  if (text !== 'Enter') {
    if (text === 'sin(' || text === 'cos(' || text === 'tan(' || text === 'log(' || text === 'log10(' || text === 'sqrt(' || text === 'exp(') {
      if (display.textContent !== '' && !isNaN(display.textContent[display.textContent.length - 1])) {
        display.textContent += '*';
      }
      display.textContent += `Math.${text}`;
    } else if (text === 'π') {
      display.textContent += Math.PI;
    } else if (text === 'e') {
      display.textContent += Math.E;
    } else if (text === '^') {
      display.textContent += '**'; 
    } else if (text === 'Radian') {
      display.textContent += '* Math.PI / 180';
    } else if (text === 'Degree') {
      display.textContent += '* 180 / Math.PI';
    }  else {
      display.textContent += text;
    }
  }
}

// Function to clear the display
function clearDisplay() {
  display.textContent = '0';
}

// Function to clear entry
function clearEntry() {
  if (display.textContent !== 'Error') {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') {
      display.textContent = '0';
    }
  }
}

// Function to calculate the result
function calculate() {
  try {
    console.log(display.textContent);
    let expression = display.textContent;
    let result = math.evaluate(eval(expression));
    display.textContent = result;
    history.push({ expression, result });
    updateHistory();
  } catch (error) {
    console.error(error); // Logging the error for debugging
    display.textContent = 'Error';
    window.alert(error);
  }
}

// Function to update the history display
function updateHistory() {
  historyContainer.innerHTML = '';
  history.forEach(item => {
    let expression = item.expression;
    let result = item.result;
    let historyItem = document.createElement('div');
    historyItem.textContent = `${expression} = ${result}`;
    historyContainer.appendChild(historyItem);
  });
}

// Event listeners for button clicks
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', event => {
    let buttonText = button.textContent;
    switch (buttonText) {
      case 'AC':
        clearDisplay();
        break;
      case '=':
        calculate();
        break;
      case 'x!':
        display.textContent = factorial(parseInt(display.textContent));
        break;
      case '1/x':
        display.textContent **= -1 ;
        break;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'log10':
      case 'sqrt':
      case 'exp':
        appendText(`${buttonText}(`);
        break;
      case 'π':
        appendText('π');
        break;
      case 'e':
        appendText('e');
        break;
      case 'x^y':
        appendText('^');
        break;
      case 'Ans':
        appendText('Ans');
        break;
      case 'Radian':
        appendText('* Math.PI / 180');
        break;
      case 'Degree':
        appendText('* 180 / Math.PI');
        break;
      default:
        appendText(buttonText);
    }
  });
});

// Key event listener
document.addEventListener('keydown', event => {
  let key = event.key;
  let allowedKeys = /^[0-9+\-*/().=!^Eeπ\%]/;
  if (allowedKeys.test(key)) {
    appendText(key);
  }
  if (key === 'Backspace') {
    clearEntry();
  }
  if (key === 'Escape') {
    clearDisplay();
  }
  if (key === 'Enter') {
    event.preventDefault(); // Prevents default behavior (e.g., form submission)
    calculate();
  }
});

// Called updateHistory initially to display any existing history
updateHistory();

// Function to clear the history
function clearHistory() {
  history = []; 
  updateHistory(); 
}
// Event listener for clearing history
document.querySelector('.calculator-history-clear').addEventListener('click', clearHistory);
