import { supabase } from "./supabase.js"

const categoriasEl = document.getElementById("categorias")
const listaProdutos = document.getElementById("lista-produtos")
const resumoEl = document.getElementById("resumo")
const totalEl = document.getElementById("total")
const entregaSelect = document.getElementById("entrega")

let produtos = []
let carrinho = []
let categoriaAtual = "Todos"
let frete = 0

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
    .eq("ativo", true)

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
  if (p.preco == null) return

  listaProdutos.innerHTML += `
    <div class="card">
      <h3>${p.nome}</h3>
      <p>${p.descricao || ""}</p>
      <div class="preco">R$ ${Number(p.preco).toFixed(2)}</div>
      <button class="btn btn-add"
        onclick='addCarrinho("${p.nome}", ${Number(p.preco)})'>
        Adicionar
      </button>
    </div>
  `
}

// ==========================
// PIZZA (P / M / G)
// ==========================
function renderizarPizza(p) {
  if (p.preco_p == null || p.preco_m == null || p.preco_g == null) return

  listaProdutos.innerHTML += `
    <div class="card">
      <h3>${p.nome}</h3>
      <p>${p.descricao || ""}</p>

      <button class="btn btn-add"
        onclick='addCarrinho("${p.nome} (P)", ${Number(p.preco_p)})'>
        🍕 Pequena — R$ ${Number(p.preco_p).toFixed(2)}
      </button>

      <button class="btn btn-add"
        onclick='addCarrinho("${p.nome} (M)", ${Number(p.preco_m)})'>
        🍕 Média — R$ ${Number(p.preco_m).toFixed(2)}
      </button>

      <button class="btn btn-add"
        onclick='addCarrinho("${p.nome} (G)", ${Number(p.preco_g)})'>
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
  let subtotal = 0

  carrinho.forEach(item => {
    resumoEl.innerHTML += `<p>${item.nome} — R$ ${item.preco.toFixed(2)}</p>`
    subtotal += item.preco
  })

  // FRETE
  if (entregaSelect && entregaSelect.value === "fora") {
    frete = 7
  } else {
    frete = 0
  }

  if (frete > 0) {
    resumoEl.innerHTML += `<p>🚗 Frete — R$ ${frete.toFixed(2)}</p>`
  }

  const total = subtotal + frete
  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`
}

// ==========================
// ATUALIZA AO TROCAR ENTREGA
// ==========================
if (entregaSelect) {
  entregaSelect.addEventListener("change", () => {
    renderizarCarrinho()
  })
}

// ==========================
// WHATSAPP
// ==========================
window.enviarPedido = () => {
  if (carrinho.length === 0) {
    alert("Carrinho vazio")
    return
  }

  let mensagem = "🧾 *Pedido DanBurgers*%0A%0A"
  let subtotal = 0

  carrinho.forEach(i => {
    mensagem += `• ${i.nome} - R$ ${i.preco.toFixed(2)}%0A`
    subtotal += i.preco
  })

  if (frete > 0) {
    mensagem += `🚗 Frete: R$ ${frete.toFixed(2)}%0A`
  }

  const total = subtotal + frete
  mensagem += `%0A💰 Total: R$ ${total.toFixed(2)}`

  const numero = "5511963266825" // seu WhatsApp
  window.open(`https://wa.me/${numero}?text=${mensagem}`)
}
