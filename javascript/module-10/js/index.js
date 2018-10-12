const url = "https://test-users-api.herokuapp.com/users/";

const users = document.querySelector(".users-add");
const list = document.querySelector(".users__body");

const userId = document.querySelector(".user-id");
const listId = document.querySelector(".user");

const form = document.querySelector(".user-add");
const inputName = document.querySelector(".input-name");
const inputAge = document.querySelector(".input-age");

const userRemove = document.querySelector(".user-remove");
const userUpdate = document.querySelector(".user-update");

// GET ALL USERS
const getAllUsers = () => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Error fetching data");
    })
    .then(data => {
      addUsers(data.data);
      displayingUsers();
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const createItem = function(item) {
  const userItem = document.createElement("div");
  userItem.classList.add("users__item");

  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      const p = document.createElement("p");
      p.innerHTML = item[key]
      
      userItem.appendChild(p);
    }
  }
  
  return userItem;
};

const addUsers = function(arr) {
  arr.map(item => list.appendChild(createItem(item)));
}

const displayingUsers = function() {
  const users = document.querySelector(".users");
  users.classList.add("isActive");
}

const getUsersHandler = function() {
  getAllUsers();
}
users.addEventListener("click", getUsersHandler);


// GET USER BY ID
const getUserById = (id) => {
  fetch(url + id)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Error fetching data");
    })
    .then(data => {
      console.log("data", data);
      createUser(data.data);
      displayingUser();
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const getUsers = () => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Error fetching data");
    })
    .then(data => {
      getUserById(countUsers(data.data));
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const createUser = function(item) {
  const userItem = document.createElement("div");
  userItem.classList.add("user__item");

  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      const p = document.createElement("p");
      p.innerHTML = item[key]
      
      userItem.appendChild(p);
    }
  }
  
  listId.appendChild(userItem);
};

const displayingUser = function() {
  const user = document.querySelector(".user");
  user.classList.add("isActive");
}

const countUsers = function(arr) {
  const randomNumber =  Math.floor(Math.random() * arr.length);
  
  return arr[randomNumber].id;
}

const getUserByIdHandler = function() {
  getUsers()
};

userId.addEventListener("click", getUserByIdHandler);


// ADD USER
const addUser = (name, age) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify({name, age}),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => console.log("data", data))
    .catch(error => console.error("Error", error))
}

const showError = function(input, errorMessage) {
  input.classList.add('isError');
  const msgError = document.createElement('span');
  msgError.classList.add("error-message");
  msgError.innerHTML = errorMessage;
  input.appendChild(msgError);
}

const resetError = function(input) {
  input.classList.remove('isError');
  
  if (input.lastChild.className == "error-message") {
    input.removeChild(input.lastChild);
  }
}

const validate = function(form) {
  var elems = form.elements;

  resetError(elems.name.parentNode);
  if (!elems.name.value) {
    showError(elems.name.parentNode, ' Enter name');
  }

  resetError(elems.age.parentNode);
  if (!elems.age.value) {
    showError(elems.age.parentNode, ' Enter age');
  }

}

const addUserHandler = function(e) {
  e.preventDefault();
  validate(this.form);
  if (!inputName.value || !inputAge.value) return;
  addUser(inputName.value, inputAge.value);
  inputName.value = "";
  inputAge.value = "";
}

form.addEventListener("click", addUserHandler);

// REMOVE USER
const removeUser = (id) => {
  fetch(url + id, {
    method: "DELETE"
  })
    .then(() => console.log('success'))
    .catch(error => console.log('ERROR' + error));
}

const getUsers2 = () => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Error fetching data");
    })
    .then(data => {
      removeUser(countUsers2(data.data));
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const countUsers2 = function(arr) {
  const userAmount = arr.length;
  
  return arr[userAmount - 1].id;
}

const removeHandler = function() {
  getUsers2()
}
userRemove.addEventListener("click", removeHandler);

// UPDATE USER BY ID
const updateUser = (id, user) => {
  fetch(url + id, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log('ERROR' + error));
}

const updateHandler = function() {
  updateUser("5bbf20b54c81970014c84e2e", {name: "Roma", age: 11});
}
userUpdate.addEventListener("click", updateHandler);