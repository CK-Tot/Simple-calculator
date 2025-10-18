const $ = id => document.getElementById(id);

const displayEl = $('display');
const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = $('equals');
const clearBtn = $('clear');
const backspaceBtn = $('backspace');

let currentInput = '0';
let prevInput = '';
let operation = null;
let shouldResetDisplay = false;


function updateDisplay() 
{
    displayEl.textContent = currentInput;
}

function appendNums(number) 
{
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    }else {
        currentInput += number;
    }

    updateDisplay();
}


function chooseOperator(op) 
{
    if (currentInput === '') return;

    if (prevInput !== '') {
        calculate();
    }

    operation = op;
    prevInput = currentInput;
    shouldResetDisplay = true;
    
}

function calculate() 
{
    let compute;
    const prev = parseFloat(prevInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch(operation){
        case 'add':
            compute = prev + current;
            break;
        case 'subtract':
            compute = prev - current;
            break;
        case 'multiply':
            compute = prev * current;
            break;
        case 'divide':
            if (current === 0){
                alert('Cannot divide by zero');
                clear();
                return;
            }
            compute = prev / current;
            break;
        default:
            return;
    }

    currentInput = compute.toString();
    operation = null;
    prevInput = '';
    shouldResetDisplay = true;
    updateDisplay();

}


function clear() {
    currentInput = '0';
    prevInput = '';
    operation = null;
    updateDisplay();
}

function backspace(){
    if (currentInput.length === 1) {
        currentInput = '0';
    }else {
        currentInput = currentInput.slice(0, -1);
    }

    updateDisplay();
}

// event listeners

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.dataset.number === '.' && currentInput.includes('.')) return;
        appendNums(btn.dataset.number);
    });
})


operatorBtns.forEach(opBtn => {
    opBtn.addEventListener('click', () => {
        chooseOperator(opBtn.dataset.operation);
    });
})

equalBtn.addEventListener('click', () => {
    calculate();
});
clearBtn.addEventListener('click', () => {
    clear();
});

backspaceBtn.addEventListener('click', () => {
    backspace();
})


//  Keybaord support

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9'){
        appendNums(e.key);
    }else if (e.key === '.'){
        if (!currentInput.includes('.')){
            appendNums('.')
        }
    }else if (e.key === '+' || e.key === '-'){
        chooseOperator(e.key === '+' ? 'add' : 'subtract');
    }else if (e.key === '*' || e.key === 'x') {
        chooseOperator('multiply');
    }else if (e.key === '/') {
        chooseOperator('divide');
    }else if (e.key == 'Enter' || e.key === '='){
        calculate();
    }else if (e.key === 'Escape'){
        clear()
    }else if (e.key === 'Backspace'){
        backspace();
    }
})


updateDisplay();


