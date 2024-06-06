import { UserInterface } from './interface';

const users: UserInterface[] = [];

const getClass = (className: string): HTMLInputElement => {
    return document.querySelector(className) as HTMLInputElement;
};

let loginRegExp = /^(?<login>[a-zA-Z]{4,16})$/;
let passRegExp = /^(?<password>[a-zA-Z0-9_.-]{4,16})$/;
let emailRegExp = /^(?<email>[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

getClass('.login').oninput = function (this: HTMLInputElement) {
    let testLogin = loginRegExp.test(this.value);
    if (testLogin) {
        this.style.border = '2px solid green';
    } else {
        this.style.border = '2px solid red';
    }
    validateForm();
}

getClass('.password').oninput = function (this: HTMLInputElement) {
    let testPass = passRegExp.test(this.value);
    if (testPass) {
        this.style.border = '2px solid green';
    } else {
        this.style.border = '2px solid red';
    }
    validateForm();
}

getClass('.email').oninput = function (this: HTMLInputElement) {
    let testEmail = emailRegExp.test(this.value);
    if (testEmail) {
        this.style.border = '2px solid green';
    } else {
        this.style.border = '2px solid red';
    }
    validateForm();
}

function validateForm() {
    let isLoginValid = loginRegExp.test(getClass('.login').value);
    let isPassValid = passRegExp.test(getClass('.password').value);
    let isEmailValid = emailRegExp.test(getClass('.email').value);
    let isFormValid = isLoginValid && isPassValid && isEmailValid;
    (document.getElementById('addUser') as HTMLButtonElement).disabled = !isFormValid;
}

// style button "add User"

(document.querySelector('.addUser') as HTMLButtonElement).addEventListener('mouseover', function (event) {
    const target = event.target as HTMLButtonElement;
    target.style.backgroundColor = 'green';
    target.style.color = 'white';
    target.style.border = '3px solid green';
});

(document.querySelector('.addUser') as HTMLButtonElement).addEventListener('mouseout', function (event) {
    const target = event.target as HTMLButtonElement;
    target.style.backgroundColor = 'white';
    target.style.color = 'green';
    target.style.border = '3px solid green';
});

// add user

class User implements UserInterface {
    login: string;
    password: string;
    email: string;

    constructor(login: string, password: string, email: string) {
        this.login = login;
        this.password = password;
        this.email = email;
    }
}

function add() {
    const login = (document.getElementsByClassName("login")[0] as HTMLInputElement).value;
    const password = (document.getElementsByClassName("password")[0] as HTMLInputElement).value;
    const email = (document.getElementsByClassName("email")[0] as HTMLInputElement).value;
    const user = new User(login, password, email);
    users.push(user);

    (document.getElementById("form") as HTMLFormElement).reset();
    render();
    validateForm();
}

function render() {
    const element = document.getElementById("data") as HTMLElement;
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

// edit user

let editUserIndex: number | null = null;

function editUser(index: number) {
    const user = users[index];
    (document.getElementsByClassName("login")[0] as HTMLInputElement).value = user.login;
    (document.getElementsByClassName("password")[0] as HTMLInputElement).value = user.password;
    (document.getElementsByClassName("email")[0] as HTMLInputElement).value = user.email;
    (document.getElementById('addUser') as HTMLButtonElement).style.display = 'none';
    (document.getElementById('editUser') as HTMLButtonElement).style.display = 'block';
    editUserIndex = index;
}

function saveEdit() {
    if (editUserIndex !== null) {
        const login = (document.getElementsByClassName("login")[0] as HTMLInputElement).value;
        const password = (document.getElementsByClassName("password")[0] as HTMLInputElement).value;
        const email = (document.getElementsByClassName("email")[0] as HTMLInputElement).value;
        users[editUserIndex].login = login;
        users[editUserIndex].password = password;
        users[editUserIndex].email = email;
        editUserIndex = null;
        (document.getElementById('addUser') as HTMLButtonElement).style.display = 'block';
        (document.getElementById('editUser') as HTMLButtonElement).style.display = 'none';
        (document.getElementById("form") as HTMLFormElement).reset();
        render();
    }
}

// delete user
function deleteUser(index: number) {
    users.splice(index, 1);
    render();
}
