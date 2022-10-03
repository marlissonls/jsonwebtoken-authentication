const loginButton = document.querySelector('#login-button');

loginButton.addEventListener('click', login)

function login() {
    fetch('/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }/* ,
        body: JSON.stringify({
            name: nameInput,
            email: emailInput
        }) */
    })
    .then(res => res.json())
    .then(data => {
        window.location.href = 'http://localhost:3000/main';
    })
    .catch(err => console.log(err));
}