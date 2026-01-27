const form = document.getElementById("form-produto")
const lista = document.getElementById("lista-admin")

form.addEventListener("submit", e => {
  e.preventDefault()

  const nome = form.nome.value
  const descricao = form.descricao.value
  const preco = Number(form.preco.value)
  const categoria = form.categoria.value

  produtos.push({
    id: Date.now(),
    nome,
    descricao,
    preco,
    categoria,
    ativo: true
  })

  salvarProdutos()
  form.reset()
  renderizarAdmin()
})

function renderizarAdmin() {
  lista.innerHTML = ""

  produtos.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <strong>${p.nome}</strong> - R$ ${p.preco}
        <button onclick="remover(${p.id})">❌</button>
      </div>
    `
  })
}

function remover(id) {
  produtos = produtos.filter(p => p.id !== id)
  salvarProdutos()
  renderizarAdmin()
}

renderizarAdmin()
