import { supabase } from "./supabase.js"

/* =======================
   ELEMENTOS (BLINDADOS)
======================= */
const categoriasEl = document.getElementById("categorias")
const listaProdutos = document.getElementById("lista-produtos")
const resumoEl = document.getElementById("resumo")
const totalEl = document.getElementById("total")

const entregaSelect = document.getElementById("entrega") || { value: "retirada" }

/* =======================
   VARIÁVEIS
======================= */
let produtos = []
let carrinho = []
let categoriaAtual = "Todos"
let frete = 0

/* =======================
   START
======================= */
async function iniciar() {
  await carregarCategorias()
  await carregarProdutos()
  renderizarProdutos()
  renderizarCarrinho()
}
iniciar()

/* =======================
   CATEGORIAS
======================= */
async function carregarCategorias() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")

  if (error) {
    console.error(error)
    return
  }

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

/* =======================
   PRODUTOS
======================= */
async function carregarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")

  if (error) {
    console.error(error)
    return
  }

  produtos = data || []
}

/* =======================
   RENDER PRODUTOS
======================= */
function renderizarProdutos() {
  listaProdutos.innerHTML = ""

  const filtrados =
    categoriaAtual === "Todos"
      ? produtos
      : produtos.filter(
          p =>
            p.categoria &&
            p.categoria.toLowerCase() === categoriaAtual.toLowerCase()
        )

  filtrados.forEach(p => {
    if (p.categoria?.toLowerCase() === "pizza") {
      renderizarPizza(p)
    } else {
      renderizarProduto(p)
    }
  })
}

function renderizarProduto(p) {
  if (p.preco == null) return

  listaProdutos.innerHTML += `
    <div class="card">
      <h3>${p.nome}</h3>
      <p>${p.descricao || ""}</p>
      <div class="preco">R$ ${Number(p.preco).toFixed(2)}</div>
      <button class="btn btn-add" onclick="addCarrinho('${p.nome}', ${Number(p.preco)})">
        ➕ Adicionar
      </button>
    </div>
  `
}

function renderizarPizza(p) {
  if (p.preco_p == null || p.preco_m == null || p.preco_g == null) return

  listaProdutos.innerHTML += `
    <div class="card">
      <h3>${p.nome}</h3>
      <p>${p.descricao || ""}</p>

      <button class="btn btn-add" onclick="addCarrinho('${p.nome} (P)', ${Number(p.preco_p)})">
        🍕 Pequena — R$ ${Number(p.preco_p).toFixed(2)}
      </button>

      <button class="btn btn-add" onclick="addCarrinho('${p.nome} (M)', ${Number(p.preco_m)})">
        🍕 Média — R$ ${Number(p.preco_m).toFixed(2)}
      </button>

      <button class="btn btn-add" onclick="addCarrinho('${p.nome} (G)', ${Number(p.preco_g)})">
        🍕 Grande — R$ ${Number(p.preco_g).toFixed(2)}
      </button>
    </div>
  `
}

/* =======================
   CARRINHO
======================= */
window.addCarrinho = function (nome, preco) {
  carrinho.push({ nome, preco })
  renderizarCarrinho()
}

function renderizarCarrinho() {
  resumoEl.innerHTML = ""
  let subtotal = 0

  carrinho.forEach(item => {
    resumoEl.innerHTML += `🛒 ${item.nome} — R$ ${item.preco.toFixed(2)}<br>`
    subtotal += item.preco
  })

  frete = entregaSelect.value === "fora" ? 7 : 0

  resumoEl.innerHTML += `<br>`
  resumoEl.innerHTML += frete > 0
    ? `🚗 Frete: R$ ${frete.toFixed(2)}`
    : `🚚 Frete: Grátis`

  totalEl.innerText = `Total: R$ ${(subtotal + frete).toFixed(2)}`
}

/* =======================
   ENVIO DO PEDIDO
======================= */
window.enviarPedido = function () {
  if (carrinho.length === 0) {
    alert("Carrinho vazio")
    return
  }

  let subtotal = 0
  carrinho.forEach(item => subtotal += item.preco)

  const totalPedido = subtotal + frete

  fetch("http://127.0.0.1:5000/novo_pedido", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      itens: carrinho,
      total: totalPedido
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("Pedido enviado com sucesso")
      carrinho = []
      renderizarCarrinho()
    })
    .catch(err => {
      console.error(err)
      alert("Erro ao enviar pedido")
    })
}
