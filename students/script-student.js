// ________________________ Get Data ________________________
const divInfo = document.getElementById('divInfo')

const getStudent = () => {
    const students = JSON.parse(localStorage.getItem('users'))
    console.log(students)
    return students
}

// ________________________ Show Info ________________________

function showStudents() {
    let students = getStudent()
    console.log(students)

    students.map(student => {
        const div = document.createElement('div')

        const nome = document.createElement('h3')
        nome.textContent = student.usuario

        const foto = document.createElement('img')
        foto.src = student.foto

        const idade = document.createElement('p')
        idade.textContent = student.idade

        const email = document.createElement('p')
        email.textContent = student.email

        const cidade = document.createElement('p')
        cidade.textContent = student.cidade

        div.appendChild(nome).classList.add('info-student')
        div.appendChild(foto).classList.add('info-student')
        div.appendChild(idade).classList.add('info-student')
        div.appendChild(email).classList.add('info-student')
        div.appendChild(cidade).classList.add('info-student')

        divInfo.appendChild(div).classList.add('div-student')
    })
}


// ________________________ Call Function ________________________

window.onload = showStudents