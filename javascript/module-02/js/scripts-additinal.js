const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attempts = 3;

do {
    const userPassword = prompt('Введите пароль');
    if (passwords.includes(userPassword)) {
        alert('Добро пожаловать!');
        break;
    } else if (userPassword == null) {
        break;
    } else {
        --attempts;
        if (attempts == 0) {
            alert('У вас закончились попытки, аккаунт заблокирован!');
        } else {
            alert(`Неверный пароль, у вас осталось ${attempts} попыток`);
        }
    }
} while (attempts != 0);
