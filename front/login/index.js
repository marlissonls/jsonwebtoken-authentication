const loginButton = document.querySelector('#login-button');

loginButton.addEventListener('click', login)

function login() {
    fetch('/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }//,
        /* body: JSON.stringify({
            name: nameInput,
            email: emailInput
        }) */
    })
}