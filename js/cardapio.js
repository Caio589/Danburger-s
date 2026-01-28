import { supabase } from "./supabase.js"

const categoriasEl = document.getElementById("categorias")
const listaProdutos = document.getElementById("lista-produtos")
const resumoEl = document.getElementById("resumo")
const totalEl = document.getElementById("total")

let produtos = []
let carrinho = []
let categoriaAtual = "Todos"

// ==========================
// START
// ==========================
async function iniciar() {
  await carregarCategorias()
  await carregarProdutos()
  renderizarProdutos()
}

iniciar()

// ==========================
// CATEGORIAS
// ==========================
async function carregarCategorias() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")

  if (error || !Array.isArray(data)) return

  categoriasEl.innerHTML = ""
  criarBotaoCategoria("Todos")

  data.forEach(c => criarBotaoCategoria(c.nome))
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
// PRODUTOS
// ==========================
async function carregarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")

  if (error || !Array.isArray(data)) return
  produtos = data
}

// ==========================
// RENDERIZA PRODUTOS
// ==========================
function renderizarProdutos() {
  listaProdutos.innerHTML = ""

  const filtrados = categoriaAtual === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtual)

  filtrados.forEach(p => {
    if (p.categoria.toLowerCase() === "pizza") {
      renderizarPizza(p)
    } else {
      renderizarProdutoNormal(p)
    }
  })
}

// ==========================
// PRODUTO NORMAL
// ==========================
function renderizarProdutoNormal(p) {
  listaProdutos.innerHTML += `
    <div class="card">
      <h3>${p.nome}</h3>
      <p>${p.descricao || ""}</p>
      <div class="preco">R$ ${Number(p.preco).toFixed(2)}</div>
      <button class="btn btn-add" onclick='addCarrinho("${p.nome}", ${p.preco})'>
        Adicionar
      </button>
    </div>
  `
}

// ==========================
// PIZZA COM TAMANHOS
// ==========================
function renderizarPizza(p) {
  listaProdutos.innerHTML += `
    <div class="card">
      <h3>${p.nome}</h3>
      <p>${p.descricao || ""}</p>

      <button class="btn btn-add" onclick='addCarrinho("${p.nome} (P)", ${p.preco_p})'>
        🍕 Pequena — R$ ${Number(p.preco_p).toFixed(2)}
      </button>

      <button class="btn btn-add" onclick='addCarrinho("${p.nome} (M)", ${p.preco_m})'>
        🍕 Média — R$ ${Number(p.preco_m).toFixed(2)}
      </button>

      <button class="btn btn-add" onclick='addCarrinho("${p.nome} (G)", ${p.preco_g})'>
        🍕 Grande — R$ ${Number(p.preco_g).toFixed(2)}
      </button>
    </div>
  `
}

// ==========================
// CARRINHO
// ==========================
window.addCarrinho = (nome, preco) => {
  carrinho.push({ nome, preco })
  renderizarCarrinho()
}

function renderizarCarrinho() {
  resumoEl.innerHTML = ""
  let total = 0

  carrinho.forEach(item => {
    resumoEl.innerHTML += `<p>${item.nome} — R$ ${item.preco.toFixed(2)}</p>`
    total += item.preco
  })

  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`
}

// ==========================
// ENVIAR WHATSAPP
// ==========================
window.enviarPedido = () => {
  if (carrinho.length === 0) {
    alert("Carrinho vazio")
    return
  }

  let mensagem = "🧾 *Pedido DanBurgers*%0A%0A"
  carrinho.forEach(i => {
    mensagem += `• ${i.nome} - R$ ${i.preco.toFixed(2)}%0A`
  })

  mensagem += `%0A${totalEl.innerText}`

  const numero = "5511963266825" // SEU WHATS
  window.open(`https://wa.me/${numero}?text=${mensagem}`)
}
