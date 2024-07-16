// __________________________ Loading Data from API __________________________

async function loadData() {
    const url = 'https://raw.githubusercontent.com/GilsonJunio/Alunos-Do-Lets-Code-2024/main/data.json'

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Data status ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        localStorage.setItem('users', JSON.stringify(data.alunos))

    } catch (error){
        console.error(error.message)
    }
}


// _______________________________ Login Page _______________________________

const buttonLogin = document.getElementById('buttonLogin')

if (buttonLogin) {
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()

        let emailLogin = document.getElementById('emailLogin').value
        let passwordLogin = document.getElementById('passwordLogin').value

        let users = JSON.parse(localStorage.getItem('users')) || []

        let user = users.find(userFind =>
            userFind.email === emailLogin && userFind.senha === passwordLogin
        )

        console.log(user)

        localStorage.setItem('userLogged', JSON.stringify(user))

        if (user) {
            window.location.href = '../welcome-page/index.html'
        }
    })
}


// ______________________________ Register Page ______________________________

const buttonSignup = document.getElementById('buttonSignup')

if (buttonSignup) {
    buttonSignup.addEventListener('click', (event) => {
        event.preventDefault()

        let usuario = document.getElementById('userSignup').value
        let email = document.getElementById('emailSignup').value
        let idade = document.getElementById('ageSignup').value
        let cidade = document.getElementById('citySignup').value
        let senha = document.getElementById('passwordSignup').value

        let arrayValues = []
        arrayValues.push(usuario, email, idade, cidade, senha)

        let users = JSON.parse(localStorage.getItem('users')) || []

        function existingEmail(email, users) {
            console.log(users)
            let user = users.find(emailFind =>
                emailFind.email === email
            )
            
            if (user) {
                alert('Email already exists')
            } else {
                users.push({usuario, email, idade, cidade, senha})
                localStorage.setItem('users', JSON.stringify(users))

                alert('Sucess!')
                window.location.href = '../login-page/index.html'
            }
        }

        function blankSpaces(arrayValues) {
            let blank = ''
            
            function searchBlank() {
                let space = arrayValues.map(value =>
                    value === blank
                )
                return space
            }
            
            let existingBlank = searchBlank()
            
            if (existingBlank.find(findBlank => findBlank === true)) {
                alert('Space Not Filled')
                existingBlank = ''
                searchBlank()
            } else {
                existingEmail(email, users)
            }
        }

        blankSpaces(arrayValues)
    })
}


// ______________________________ Welcome Page ______________________________

const divWelcome = document.getElementById('divWelcome')
const titleWelcome = document.getElementById('titleWelcome')

if (divWelcome && titleWelcome) {
    let user = JSON.parse(localStorage.getItem('userLogged'))
    let username = user.usuario
    let userEmail = user.email
    let userAge = user.idade
    let userCity = user.cidade
    let userImg = user.foto
    
    let title = document.createElement('h1')
    title.textContent = `Welcome, ${username}`

    let email = document.createElement('h3')
    email.textContent = userEmail
    let age = document.createElement('h3')
    age.textContent = userAge
    let city = document.createElement('h3')
    city.textContent = userCity
    let photo = document.createElement('img')
    photo.src = userImg

    titleWelcome.appendChild(title)
    divWelcome.appendChild(email)
    divWelcome.appendChild(age)
    divWelcome.appendChild(city)
    divWelcome.appendChild(photo)

    const buttonExit = document.createElement('button')
    buttonExit.textContent = 'Exit'
    
    buttonExit.addEventListener('click', () => {
        window.location.href = '../login-page/index.html'
    })
    
    divWelcome.appendChild(buttonExit).classList.add('button-page')
}


// ____________________________ Calling Functions ____________________________

if (localStorage.getItem('users') == null) {
    loadData()
}