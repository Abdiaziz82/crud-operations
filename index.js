document.addEventListener('DOMContentLoaded', () => {
  const createUserForm =  document.getElementById('create-user-form')
   const usersContainer = document.getElementById('users-container')
   const nameInput =  document.getElementById('name')
    const emailInput = document.getElementById('email')
    
    // function to create a user
    createUserForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const user = {
            name: nameInput.value,
            email:emailInput.value
            
        }
        fetch ('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)

        })
        .then(response => response.json())
        .then(data => {
            addUserToDom(data)
            createUserForm.reset()
        })
        .catch(error=> {
            console.error('error fetching data', error)
        })
    })

    // function add users to DOM
    function addUserToDom(user){
        const userDiv = document.createElement('div')
        userDiv.classList.add('user')
        userDiv.innerHTML = `
        <h3> ${user.name}</h3>
        <p> ${user.email}</p>
        <button onClick = "editUser(${user.id})">Edit User</button>
        <button onClick = "deleteUser(${user.id})">Delete User</button>

        `
        usersContainer.appendChild(userDiv)
    }
// function to get users 
    function getUsers(){
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => addUserToDom(user))
        })
        .catch(error => {
            console.error('error fetching data', error)
        })
    }
    getUsers();
})