import { supabase } from "./supabase.js"

// ELEMENTOS
const categoriasEl = document.getElementById("categorias")
const listaProdutos = document.getElementById("lista-produtos")
const resumoEl = document.getElementById("resumo")
const totalEl = document.getElementById("total")

const entregaSelect = document.getElementById("entrega")
const pagamentoSelect = document.getElementById("pagamento")
const trocoInput = document.getElementById("troco")

const nomeInput = document.getElementById("nomeCliente")
const telefoneInput = document.getElementById("telefoneCliente")
const enderecoInput = document.getElementById("enderecoCliente")

// VARIÁVEIS
let produtos = []
let carrinho = []
let categoriaAtual = "Todos"
let frete = 0

// ======================
// START
// ======================
async function iniciar() {
  await carregarCategorias()
  await carregarProdutos()
  renderizarProdutos()
  renderizarCarrinho()
}
iniciar()

// ======================
// MOSTRAR TROCO
// ======================
pagamentoSelect.addEventListener("change", () => {
  if (pagamentoSelect.value === "dinheiro") {
    trocoInput.style.display = "block"
  } else {
    trocoInput.style.display = "none"
    trocoInput.value = ""
  }
})

// ======================
// ATUALIZAR FRETE
// ======================
entregaSelect.addEventListener("change", () => {
  renderizarCarrinho()
})

// ======================
// CATEGORIAS
// ======================
async function carregarCategorias() {
  const { data } = await supabase.from("categorias").select("*")
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

// ======================
// PRODUTOS
// ======================
async function carregarProdutos() {
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)

  produtos = data
}

// ======================
// RENDER PRODUTOS
// ======================
function renderizarProdutos() {
  listaProdutos.innerHTML = ""

  const filtrados = categoriaAtual === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtual)

  filtrados.forEach(p => {
    if (p.categoria.toLowerCase() === "pizza") {
      renderizarPizza(p)
    } else {
      renderizarProduto(p)
    }
  })
}

// PRODUTO NORMAL
function renderizarProduto(p) {
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

// PIZZA
function renderizarPizza(p) {
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

// ======================
// CARRINHO
// ======================
window.addCarrinho = (nome, preco) => {
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

// ======================
// WHATSAPP COMPLETO 🔥
// ======================
window.enviarPedido = () => {
  if (carrinho.length === 0) {
    alert("Carrinho vazio")
    return
  }

  const nome = nomeInput.value.trim()
  const telefone = telefoneInput.value.trim()
  const endereco = enderecoInput.value.trim()
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

  let mensagem =
    "🍔🍕 *PEDIDO – DanBurgers* 🍕🍔%0A" +
    "━━━━━━━━━━━━━━━━━━%0A%0A" +
    `👤 *Cliente:* ${nome}%0A` +
    `📞 *Telefone:* ${telefone}%0A` +
    `📍 *Entrega:* ${
      entregaSelect.value === "fora"
        ? "Fora da cidade"
        : entregaSelect.value === "cidade"
          ? "Na cidade"
          : "Retirada no local"
    }%0A`

  if (entregaSelect.value !== "retirada") {
    mensagem += `🏠 *Endereço:* ${endereco}%0A`
  }

  mensagem += `%0A💳 *Pagamento:* ${
    pagamento === "pix"
      ? "Pix"
      : pagamento === "cartao"
        ? "Cartão"
        : "Dinheiro"
  }%0A`

  if (pagamento === "dinheiro") {
    mensagem += `💵 *Troco para:* R$ ${Number(troco).toFixed(2)}%0A`
  }

  mensagem += `%0A🛒 *Itens do pedido:*%0A`

  let subtotal = 0
  carrinho.forEach((item, i) => {
    mensagem += `${i + 1}️⃣ ${item.nome} — R$ ${item.preco.toFixed(2)}%0A`
    subtotal += item.preco
  })

  mensagem += `%0A${frete > 0
    ? `🚗 *Frete:* R$ ${frete.toFixed(2)}`
    : `🚚 *Frete:* Grátis`
  }%0A`

  mensagem += `💰 *Total:* R$ ${(subtotal + frete).toFixed(2)}%0A`
  mensagem += `%0A🔥 *DanBurgers agradece!*`

  window.open(`https://wa.me/5511963266825?text=${mensagem}`)
}
