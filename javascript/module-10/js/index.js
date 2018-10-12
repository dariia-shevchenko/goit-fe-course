const url = "https://test-users-api.herokuapp.com/users/";

const usersAdd = document.querySelector(".btn-users-add");
const list = document.querySelector(".users-add");

const userId = document.querySelector(".btn-user-id");
const listId = document.querySelector(".user-id");

const inputBtn = document.querySelector(".input-user-add");
const inputName = document.querySelector(".input-name");
const inputAge = document.querySelector(".input-age");
const listPost = document.querySelector(".user-post");

const userRemove = document.querySelector(".btn-user-remove");
const listRemove = document.querySelector(".user-remove");

const userUpdate = document.querySelector(".btn-user-update");
const inputNameUpdate = document.querySelector(".input-name-update");
const inputAgeUpdate = document.querySelector(".input-age-update");
const listUpdate = document.querySelector(".user-update");

// GENERAL
const getUsers = (fun1, fun2, obj) => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Error fetching data");
    })
    .then(data => {
      if (!obj) {
        fun1(fun2(data.data));
      } else {
        fun1(fun2(data.data), obj);
      }
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const UserById = (id) => {
   return fetch(url + id)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Error fetching data");
    })
}

const createUser = function(item) {
  const userItem = document.createElement("div");
  userItem.classList.add("users__item");

  for (const key in item) {
    if (!(key === "__v")) {
      const p = document.createElement("p");
      p.innerHTML = item[key]
      
      userItem.appendChild(p);
    }
  }
  
  return userItem;
};

const addUsers = function(data, divElement) {
  if (Array.isArray(data)) {
    data.map(item => divElement.appendChild(createUser(item)));
  } else {
    divElement.appendChild(createUser(data));    
  }
};

const displayingUsers = function(item) {
  item.classList.add("isActive");
}

const showError = function(input, errorMessage) {
  input.classList.add("isError");
  const msgError = document.createElement("span");
  msgError.classList.add("error-message");
  msgError.innerHTML = errorMessage;
  input.appendChild(msgError);
}

const resetError = function(input) {
  input.classList.remove("isError");
  
  if (input.lastChild.className == "error-message") {
    input.removeChild(input.lastChild);
  }
}

const validate = function(form) {
  var elems = form.elements;

  resetError(elems.name.parentNode);
  if (!elems.name.value) {
    showError(elems.name.parentNode, "Enter name");
    // return false;
  }

  resetError(elems.age.parentNode);
  if (!elems.age.value || isNaN(elems.age.value)) {
    showError(elems.age.parentNode, "Enter age");
    return false;
  }
  return true;
}

const randomUser = function(arr) {
  const randomNumber =  Math.floor(Math.random() * arr.length);
  
  return arr[randomNumber].id;
}

const getLastUser = function(arr) {
  const userAmount = arr.length;
  
  return arr[userAmount - 1].id;
}

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
      addUsers(data.data, list);
      displayingUsers(list);
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const getUsersHandler = function() {
  getAllUsers();
  usersAdd.disabled = true;
}
usersAdd.addEventListener("click", getUsersHandler);


// GET USER BY ID
const getUserById = (id) => {
  UserById(id)
    .then(data => {
      console.log("data", data);
      addUsers(data.data, listId);
      displayingUsers(listId);
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const getUserByIdHandler = function() {
  getUsers(getUserById, randomUser)
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
    .then(data => {
      UserById(data.data._id)
      .then(data => {
        addUsers(data.data, listPost);
        displayingUsers(listPost);
      })
    })
    .catch(error => console.error("Error", error))
}

const addUserHandler = function(e) {
  e.preventDefault();
  validate(this.form);
  if (!validate(this.form)) return;
  addUser(inputName.value, inputAge.value);
  inputName.value = "";
  inputAge.value = "";
}

inputBtn.addEventListener("click", addUserHandler);

// REMOVE USER
const removeUser = (id) => {
  UserById(id)
    .then(data => {
      addUsers(data.data, listRemove);
      displayingUsers(listRemove);
    })
    .then(
      fetch(url + id, {
        method: "DELETE"
      })
      .then(() => console.log('success'))
    )
    .catch(error => console.log('ERROR' + error));
}

const removeHandler = function() {
  getUsers(removeUser, getLastUser)
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
    .then(data => {
      console.log(data);
      addUsers(data.data, listUpdate);
      displayingUsers(listUpdate);
    })
    .catch(error => console.log('ERROR' + error));
}

const updateHandler = function(e) {
  e.preventDefault();
  validate(this.form);
  if (!validate(this.form)) return;
  getUsers(updateUser, randomUser, {name: inputNameUpdate.value, age: inputAgeUpdate.value})
  inputNameUpdate.value = "";
  inputAgeUpdate.value = "";
}
userUpdate.addEventListener("click", updateHandler);