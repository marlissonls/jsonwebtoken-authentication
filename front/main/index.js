const logoutButton = document.querySelector('#logout-button');

logoutButton.addEventListener('click', logout)

function logout() {
    fetch('/logout', {
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