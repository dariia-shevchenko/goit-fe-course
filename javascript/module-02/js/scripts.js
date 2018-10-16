let userInput;
const numbers = [];
let total = 0;


do {
    userInput = prompt('Введите число', '0');

    if (isNaN(+userInput)) {
        alert('Было введено не число, попробуйте еще раз');
        continue;
    }

    if (userInput) {
        numbers.push(+userInput);
    }

} while (userInput !== null);

for(const number of numbers) {
    total += number;
}

if (numbers.length > 0) {
    alert(`Общая сумма чисел равна ${total}`);    
}
