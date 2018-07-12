const adminLogin = 'admin';
const adminPassword = 'm4ngo1zh4ackz0r';

const userLogin = prompt('Enter Login');
const welcomeMessage = 'Добро пожаловать!';
const cancelMessage = 'Отменено пользователем!';
const deniedAccess = 'Доступ запрещен!';

if (adminLogin == userLogin) {
    const userPassword = prompt('Enter Password');
    
    if (adminPassword == userPassword) {
        alert(welcomeMessage);
    } else if (userPassword == null) {
        alert(cancelMessage);
    } else {
        alert(deniedAccess);
    }
} else if (userLogin == null) {
    alert(cancelMessage);
} else {
    alert(deniedAccess);
}