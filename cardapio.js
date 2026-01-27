import { buscarProdutos } from "./data.js"

const lista = document.getElementById("lista-produtos")

async function renderizarCardapio() {
  lista.innerHTML = "Carregando..."

  const produtos = await buscarProdutos()
  lista.innerHTML = ""

  produtos.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>${p.descricao || ""}</p>
        <strong>R$ ${Number(p.preco).toFixed(2)}</strong>
      </div>
    `
  })
}

renderizarCardapio()
