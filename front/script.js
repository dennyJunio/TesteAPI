const form = document.querySelector('#filmesForm')
const tituloInput = document.querySelector('#tituloInput')
const diretorInput = document.querySelector('#diretorInput')
const ano_lancamentoInput = document.querySelector('#ano_lancamentoInput')
const generoInput = document.querySelector('#generoInput')
const URL = 'http://localhost:8000/filmes.php'

const tableBody = document.querySelector('#filmesTable')

function carregarfilmes() {
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(filmes => {
            tableBody.innerHTML = ''

            for (let i = 0; i < filmes.length; i++) {
                const tr = document.createElement('tr')
                const filme = filmes[i]
                tr.innerHTML = `
                    <td>${filme.id}</td>
                    <td>${filme.titulo}</td>
                    <td>${filme.diretor}</td>
                    <td>${filme.ano_lancamento}</td>
                    <td>${filme.genero}</td>
                    <td>
                        <button data-id="${filme.id}" onclick="atualizarfilme(${filme.id})">Editar</button>
                        <button onclick="excluirfilme(${filme.id})">Excluir</button>
                    </td>
                `
                tableBody.appendChild(tr)
            }

        })
}

function adicionarfilme(e) {

    e.preventDefault()

    const titulo = tituloInput.value
    const diretor = diretorInput.value
    const ano_lancamento = ano_lancamentoInput.value
    const genero = generoInput.value

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `titulo=${encodeURIComponent(titulo)}&diretor=${encodeURIComponent(diretor)}&ano_lancamento=${encodeURIComponent(ano_lancamento)}&genero=${encodeURIComponent(genero)}`
    })
        .then(response => {
            if (response.ok) {
                carregarfilmes()
                tituloInput.value = ''
                diretorInput.value = ''
                ano_lancamentoInput.value = ''
                generoInput.value = ''
            } else {
                console.error('Erro ao add filme')
                alert('Erro ao add filme')
            }
        })
}

function atualizarfilme(id) {
    const novoTitulo = prompt("Digite o novo Titulo")
    const novodiretor = prompt("Digite o novo diretor")
    const novoAno = prompt("Digite o novo Ano")
    const novoGenero = prompt("Digite o novo Genero")
    if (novoTitulo && novodiretor && novoAno && novoGenero) {
        fetch(`${URL}?id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `titulo=${encodeURIComponent(novoTitulo)}&diretor=${encodeURIComponent(novodiretor)}&ano_lancamento=${encodeURIComponent(novoAno)}&novoGenero=${encodeURIComponent(novoGenero)}`
        })
            .then(response => {
                if (response.ok) {
                    carregarfilmes()
                } else {
                    console.error('Erro ao att filme')
                    alert('Erro ao att filme')
                }
            })
    }
}


function excluirfilme(id) {
    if (confirm('Deseja excluir o filme ?')) {
        fetch(`${URL}?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    carregarfilmes()
                } else {
                    console.error('Erro ao excluir filme')
                    alert('Erro ao excluir filme')
                }
            })
    }
}

form.addEventListener('submit', adicionarfilme)

carregarfilmes()

