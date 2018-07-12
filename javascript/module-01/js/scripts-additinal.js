const sharmAgency = 15;
const hurgadaAgency = 25;
const tabaAgency = 6;
let userAnswer = false;


function checkConfirmation (agancyName) {
    userAnswer = confirm(`Есть место в группе ${agancyName}, согласны Вы быть в этой группе?`);

    if (userAnswer) {
        alert(`Приятного путешествия в группе ${agancyName}`);
    } else {
        alert('Нам очень жаль, приходите еще!');
    }
}

const userNumber = +prompt('Введите число необходимых мест', '0');

if (typeof userNumber === 'number' && (userNumber % 1) == 0  && userNumber > 0) {
    if (userNumber <= tabaAgency) {
        checkConfirmation('Taba');
    } else if(userNumber <= sharmAgency) {
        checkConfirmation('Sharm');
        
    } else if(userNumber <= hurgadaAgency) {
        checkConfirmation('Hurgada');
    } else {
        alert('Извините, столько мест нет ни в одной группе!');
    }
} else {
    alert('Ошибка ввода');
}


