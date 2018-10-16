const url = "https://test-users-api.herokuapp.com/users/";

const usersAdd = document.querySelector(".btn-users-add");
const list = document.querySelector(".users-add");
const listBody = document.querySelector(".users-add .users__body");

const userId = document.querySelector(".btn-user-id");
const inputId = document.querySelector(".input-id");
const listId = document.querySelector(".user-id");
const listIdBody = document.querySelector(".user-id .users__body");

const inputBtn = document.querySelector(".input-user-add");
const inputName = document.querySelector(".input-name");
const inputAge = document.querySelector(".input-age");
const listPost = document.querySelector(".user-post");

const userRemove = document.querySelector(".btn-user-remove");
const listRemove = document.querySelector(".user-remove");
const inputRemove = document.querySelector(".input-remove");

const userUpdate = document.querySelector(".btn-user-update");
const inputIdUpdate = document.querySelector(".input-id-update");
const inputNameUpdate = document.querySelector(".input-name-update");
const inputAgeUpdate = document.querySelector(".input-age-update");
const listUpdate = document.querySelector(".user-update");

// GENERAL
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
  const userBodyRepl = document.querySelector(`${divElement} .users__body`)
  const userBody = document.createElement("div")
  userBody.classList.add("users__body");

  if (Array.isArray(data)) {
    data.map(item => userBody.appendChild(createUser(item)));
  } else {
    userBody.appendChild(createUser(data));    
  }
  userBodyRepl.replaceWith(userBody);
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

  if (elems.id) {
    resetError(elems.id.parentNode);
    if (!elems.id.value) {
      showError(elems.id.parentNode, "Enter id");
    }
  }

  if (elems.name) {
    resetError(elems.name.parentNode);
    if (!elems.name.value) {
      showError(elems.name.parentNode, "Enter name");
    }
  }

  if (elems.age) {
    resetError(elems.age.parentNode);
    if (!elems.age.value || isNaN(elems.age.value)) {
      showError(elems.age.parentNode, "Enter age");
    }
  }
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
      addUsers(data.data, ".users-add");
      displayingUsers(list);
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const getUsersHandler = function() {
  getAllUsers();
}
usersAdd.addEventListener("click", getUsersHandler);


// GET USER BY ID
const getUserById = (id) => {
  UserById(id)
    .then(data => {
      console.log("data", data);
      addUsers(data.data, ".user-id");
      displayingUsers(listId);
    })
    .catch(error => {
      console.error("Error", error);
    })
}

const getUserByIdHandler = function() {
  validate(this.form);
  if (!inputId.value) return;
  getUserById(inputId.value);
  inputId.value = "";
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
        addUsers(data.data, ".user-post");
        displayingUsers(listPost);
      })
    })
    .catch(error => console.error("Error", error))
}

const addUserHandler = function(e) {
  e.preventDefault();
  validate(this.form);
  if (!inputName.value && !inputAge.value) return;
  addUser(inputName.value, inputAge.value);
  inputName.value = "";
  inputAge.value = "";
}

inputBtn.addEventListener("click", addUserHandler);

// REMOVE USER
const removeUser = (id) => {
  UserById(id)
    .then(data => {
      addUsers(data.data, ".user-remove");
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
  validate(this.form);
  if (!inputRemove.value) return;
  removeUser(inputRemove.value);
  inputRemove.value = "";
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
      addUsers(data.data, ".user-update");
      displayingUsers(listUpdate);
    })
    .catch(error => console.log('ERROR' + error));
}

const updateHandler = function(e) {
  e.preventDefault();
  validate(this.form);
  if (!inputIdUpdate.value && !inputNameUpdate.value && !inputAgeUpdate.value) return;
  updateUser(inputIdUpdate.value, {name: inputNameUpdate.value, age: inputAgeUpdate.value})
  inputIdUpdate.value = "";
  inputNameUpdate.value = "";
  inputAgeUpdate.value = "";
}
userUpdate.addEventListener("click", updateHandler);