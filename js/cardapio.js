import { supabase } from "./supabase.js"

const categoriasEl = document.getElementById("categorias")
const listaProdutos = document.getElementById("lista-produtos")

let produtos = []
let categoriaAtual = "Todos"

// ==========================
// 🚀 START
// ==========================
async function iniciar() {
  await carregarCategorias()
  await carregarProdutos()
  renderizarProdutos()
}

// ==========================
// 📂 CATEGORIAS (DO BANCO)
// ==========================
async function carregarCategorias() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")

  if (error || !Array.isArray(data)) {
    console.error("Erro categorias:", error)
    return
  }

  categoriasEl.innerHTML = ""

  // Botão TODOS
  criarBotaoCategoria("Todos")

  data.forEach(c => {
    criarBotaoCategoria(c.nome)
  })
}

function criarBotaoCategoria(nome) {
  const btn = document.createElement("button")
  btn.className = "btn btn-add"
  btn.innerText = nome

  btn.onclick = () => {
    categoriaAtual = nome
    renderizarProdutos()
  }

  categoriasEl.appendChild(btn)
}

// ==========================
// 🍔 PRODUTOS
// ==========================
async function carregarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")

  if (error || !Array.isArray(data)) {
    console.error("Erro produtos:", error)
    return
  }

  produtos = data
}

// ==========================
// 🧾 RENDERIZAR PRODUTOS
// ==========================
function renderizarProdutos() {
  listaProdutos.innerHTML = ""

  const filtrados = categoriaAtual === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtual)

  if (filtrados.length === 0) {
    listaProdutos.innerHTML = `<p>Nenhum produto nesta categoria.</p>`
    return
  }

  filtrados.forEach(p => {
    listaProdutos.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>${p.descricao || ""}</p>
        <div class="preco">R$ ${Number(p.preco).toFixed(2)}</div>
      </div>
    `
  })
}

// ==========================
// START
// ==========================
iniciar()
