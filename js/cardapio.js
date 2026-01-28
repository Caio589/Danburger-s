import { supabase } from "./supabase.js"

const categoriasEl = document.getElementById("categorias")
const listaProdutos = document.getElementById("lista-produtos")
const resumoEl = document.getElementById("resumo")
const totalEl = document.getElementById("total")

const entregaSelect = document.getElementById("entrega")
const pagamentoSelect = document.getElementById("pagamento")
const trocoInput = document.getElementById("troco")

const nomeClienteInput = document.getElementById("nomeCliente")
const telefoneClienteInput = document.getElementById("telefoneCliente")
const enderecoClienteInput = document.getElementById("enderecoCliente")

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
  renderizarCarrinho()
}
iniciar()

// ==========================
// MOSTRAR TROCO SÓ SE DINHEIRO
// ==========================
if (pagamentoSelect) {
  pagamentoSelect.addEventListener("change", () => {
    if (pagamentoSelect.value === "dinheiro") {
      trocoInput.style.display = "block"
    } else {
      trocoInput.style.display = "none"
      trocoInput.value = ""
    }
  })
}

// ==========================
// ATUALIZAR TOTAL AO TROCAR ENTREGA
// ==========================
if (entregaSelect) {
  entregaSelect.addEventListener("change", () => {
    renderizarCarrinho()
  })
}

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
        ➕ Adicionar
      </button>
    </div>
  `
}

// ==========================
// PIZZA P / M / G
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
// CARRINHO + FRETE
// ==========================
window.addCarrinho = (nome, preco) => {
  carrinho.push({ nome, preco })
  renderizarCarrinho()
}

function renderizarCarrinho() {
  resumoEl.innerHTML = ""
  let subtotal = 0

  carrinho.forEach(item => {
    resumoEl.innerHTML += `🛒 ${item.nome} — R$ ${item.preco.toFixed(2)}<br>`
    subtotal += Number(item.preco)
  })

  if (entregaSelect && entregaSelect.value === "fora") {
    frete = 7
  } else {
    frete = 0
  }

  resumoEl.innerHTML += `<br>`

  resumoEl.innerHTML += frete > 0
    ? `🚗 Frete: R$ ${frete.toFixed(2)}`
    : `🚚 Frete: Grátis`

  const total = subtotal + frete
  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`
}

// ==========================
// WHATSAPP FINAL BONITO
// ==========================
window.enviarPedido = () => {
  if (carrinho.length === 0) {
    alert("Carrinho vazio")
    return
  }

  const nome = nomeClienteInput.value.trim()
  const telefone = telefoneClienteInput.value.trim()
  const endereco = enderecoClienteInput.value.trim()
  const pagamento = pagamentoSelect.value
  const troco = trocoInput.value

  if (!nome || !telefone || !pagamento) {
    alert("Preencha nome, telefone e pagamento")
    return
  }

  if (entregaSelect.value !== "retirada" && !endereco) {
    alert("Preencha o endereço")
    return
  }

  if (pagamento === "dinheiro" && !troco) {
    alert("Informe o troco")
    return
  }

  let subtotal = 0
  let mensagem = "🍔🍕 *PEDIDO – DanBurgers* 🍕🍔%0A"
  mensagem += "━━━━━━━━━━━━━━━━━━%0A%0A"

  mensagem += `👤 *Cliente:* ${nome}%0A`
  mensagem += `📞 *Telefone:* ${telefone}%0A`

  mensagem += `📍 *Entrega:* `
  mensagem += entregaSelect.value === "fora"
    ? "Fora da cidade%0A"
    : entregaSelect.value === "cidade"
      ? "Na cidade%0A"
      : "Retirada no local%0A"

  if (entregaSelect.value !== "retirada") {
    mensagem += `🏠 *Endereço:* ${endereco}%0A`
  }

  mensagem += `%0A💳 *Pagamento:* `
  mensagem += pagamento === "pix"
    ? "Pix%0A"
    : pagamento === "cartao"
      ? "Cartão%0A"
      : "Dinheiro%0A"

  if (pagamento === "dinheiro") {
    mensagem += `💵 *Troco para:* R$ ${Number(troco).toFixed(2)}%0A`
  }

  mensagem += `%0A🛒 *Itens:*%0A`

  carrinho.forEach((item, i) => {
    mensagem += `${i + 1}️⃣ ${item.nome} — R$ ${item.preco.toFixed(2)}%0A`
    subtotal += Number(item.preco)
  })

  mensagem += `%0A`
  mensagem += frete > 0
    ? `🚗 *Frete:* R$ ${frete.toFixed(2)}%0A`
    : `🚚 *Frete:* Grátis%0A`

  const total = subtotal + frete
  mensagem += `💰 *Total:* R$ ${total.toFixed(2)}%0A`
  mensagem += `%0A🔥 *DanBurgers agradece!*`

  window.open(`https://wa.me/5511963266825?text=${mensagem}`)
}
