const logins = ['Mango', 'robotGoogles', 'Poly', 'Aj4x1sBozz', 'qwerty123'];

const checkLoginValidity = function(login) {
    if (login.length >= 4 && login.length <= 16) {
        return true;
    } else {
        return false;
    }
}

const checkIfLoginExists = function(logins, login) {
    
    if (logins.includes(login)) {
        return true;
    } else {
        return false;
    }
}

const addLogin = function(logins, login) {
    if (checkLoginValidity(login)) {
        if (checkIfLoginExists(logins, login)) {
            alert('Такой логин уже используется!');
        } else {
            logins.push(login);
            alert('Логин успешно добавлен!');
        }
    } else {
        alert('Ошибка! Логин должен быть от 4 до 16 символов');
    }
}

addLogin(logins, 'log');
addLogin(logins, 'login');
