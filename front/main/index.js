const logoutButton = document.querySelector('#logout-button');

logoutButton.addEventListener('click', logout)

function logout() {
    fetch('/logout', {
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
        window.location.href = 'http://localhost:3000';
    })
    .catch(err => console.log(err));
}

