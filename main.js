const users = [];
const getClass = (className) => {
    return document.querySelector(className);
};
let loginRegExp = /^(?<login>[a-zA-Z]{4,16})$/;
let passRegExp = /^(?<password>[a-zA-Z0-9_.-]{4,16})$/;
let emailRegExp = /^(?<email>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
getClass('.login').oninput = function () {
    let testLogin = loginRegExp.test(this.value);
    if (testLogin) {
        this.style.border = '2px solid green';
    }
    else {
        this.style.border = '2px solid red';
    }
    validateForm();
};
getClass('.password').oninput = function () {
    let testPass = passRegExp.test(this.value);
    if (testPass) {
        this.style.border = '2px solid green';
    }
    else {
        this.style.border = '2px solid red';
    }
    validateForm();
};
getClass('.email').oninput = function () {
    let testEmail = emailRegExp.test(this.value);
    if (testEmail) {
        this.style.border = '2px solid green';
    }
    else {
        this.style.border = '2px solid red';
    }
    validateForm();
};
function validateForm() {
    let isLoginValid = loginRegExp.test(getClass('.login').value);
    let isPassValid = passRegExp.test(getClass('.password').value);
    let isEmailValid = emailRegExp.test(getClass('.email').value);
    let isFormValid = isLoginValid && isPassValid && isEmailValid;
    document.getElementById('addUser').disabled = !isFormValid;
}
document.querySelector('.addUser').addEventListener('mouseover', function (event) {
    event.target.style.backgroundColor = 'green';
    event.target.style.color = 'white';
    event.target.style.border = '3px solid green';
});
document.querySelector('.addUser').addEventListener('mouseout', function (event) {
    event.target.style.backgroundColor = 'white';
    event.target.style.color = 'green';
    event.target.style.border = '3px solid green';
});
class User {
    login;
    password;
    email;
    constructor(login, password, email) {
        this.login = login;
        this.password = password;
        this.email = email;
    }
}
function add() {
    const login = document.getElementsByClassName("login")[0].value;
    const password = document.getElementsByClassName("password")[0].value;
    const email = document.getElementsByClassName("email")[0].value;
    const user = new User(login, password, email);
    users.push(user);
    document.getElementById("form").reset();
    render();
    validateForm();
}
function render() {
    const element = document.getElementById("data");
    element.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        const newElement = `<tr>
        <td>${i + 1}</td>
        <td>${users[i].login}</td>
        <td>${users[i].password}</td>
        <td>${users[i].email}</td>
        <td><button class="edit" onclick="editUser(${i})"> Edit </button></td>
        <td><button class="delete" onclick="deleteUser(${i})"> Delete </button></td>
        </tr>`;
        element.insertAdjacentHTML('beforeend', newElement);
    }
}
let editUserIndex = null;
function editUser(index) {
    const user = users[index];
    document.getElementsByClassName("login")[0].value = user.login;
    document.getElementsByClassName("password")[0].value = user.password;
    document.getElementsByClassName("email")[0].value = user.email;
    document.getElementById('addUser').style.display = 'none';
    document.getElementById('editUser').style.display = 'block';
    editUserIndex = index;
}
function saveEdit() {
    const login = document.getElementsByClassName("login")[0].value;
    const password = document.getElementsByClassName("password")[0].value;
    const email = document.getElementsByClassName("email")[0].value;
    users[editUserIndex].login = login;
    users[editUserIndex].password = password;
    users[editUserIndex].email = email;
    editUserIndex = null;
    document.getElementById('addUser').style.display = 'block';
    document.getElementById('editUser').style.display = 'none';
    document.getElementById("form").reset();
    render();
}
function deleteUser(index) {
    console.log('deleteUser');
    users.splice(index, 1);
    render();
}
