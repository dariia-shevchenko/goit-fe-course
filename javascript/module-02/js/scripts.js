let userInput;
const numbers = [];
let total = 0;


do {
    userInput = prompt('Введите число', '0');
    let userInputNumber = +userInput;

    if (isNaN(userInputNumber)) {
        alert('Было введено не число, попробуйте еще раз');
        continue;
    }

    numbers.push(userInputNumber);
    
} while (userInput !== null);

for(const number of numbers) {
    total += number;
}

alert(`Общая сумма чисел равна ${total}`);
