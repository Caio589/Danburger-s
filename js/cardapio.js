import { supabase } from "./supabase.js"

const lista = document.getElementById("lista-produtos")
const resumo = document.getElementById("resumo")
const totalEl = document.getElementById("total")
const categoriasEl = document.getElementById("categorias")

let produtos = []
let carrinho = []
let categoriaAtual = "Todos"

// 🔹 BUSCAR PRODUTOS
async function carregarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)

  if (error) {
    console.error(error)
    return
  }

  produtos = data
  criarCategorias()
  renderizarProdutos()
}

// 🔹 CRIAR BOTÕES DE CATEGORIA
function criarCategorias() {
  categoriasEl.innerHTML = ""

  const categorias = ["Todos", ...new Set(produtos.map(p => p.categoria))]

  categorias.forEach(cat => {
    const btn = document.createElement("button")
    btn.className = "btn btn-add"
    btn.innerText = cat
    btn.onclick = () => {
      categoriaAtual = cat
      renderizarProdutos()
    }
    categoriasEl.appendChild(btn)
  })
}

// 🔹 RENDERIZAR PRODUTOS FILTRADOS
function renderizarProdutos() {
  lista.innerHTML = ""

  const filtrados = categoriaAtual === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtual)

  filtrados.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>${p.descricao || ""}</p>
        <div class="preco">R$ ${Number(p.preco).toFixed(2)}</div>
        <button class="btn btn-add" onclick="add('${p.nome}', ${p.preco})">
          ➕ Adicionar
        </button>
      </div>
    `
  })
}

// 🔹 CARRINHO
window.add = (nome, preco) => {
  carrinho.push({ nome, preco })
  atualizarResumo()
}

// 🔹 RESUMO + TOTAL
function atualizarResumo() {
  resumo.innerHTML = ""
  let total = 0

  carrinho.forEach(i => {
    total += i.preco
    resumo.innerHTML += `<p>${i.nome} - R$ ${i.preco.toFixed(2)}</p>`
  })

  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`
}

// START
carregarProdutos()
