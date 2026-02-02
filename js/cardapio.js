import { supabase } from "./supabase.js"

/* =======================
   ELEMENTOS (BLINDADOS)
======================= */
const categoriasEl = document.getElementById("categorias")
const listaProdutos = document.getElementById("lista-produtos")
const resumoEl = document.getElementById("resumo")
const totalEl = document.getElementById("total")

const entregaSelect = document.getElementById("entrega") || { value: "retirada" }
const pagamentoSelect = document.getElementById("pagamento") || { value: "" }
const trocoInput = document.getElementById("troco") || { value: "", style: {} }

const nomeInput = document.getElementById("nomeCliente") || { value: "" }
const telefoneInput = document.getElementById("telefoneCliente") || { value: "" }
const enderecoInput = document.getElementById("enderecoCliente") || { value: "" }

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
   TROCO DINHEIRO
======================= */
if (pagamentoSelect.addEventListener) {
  pagamentoSelect.addEventListener("change", () => {
    if (pagamentoSelect.value === "dinheiro") {
      trocoInput.style.display = "block"
    } else {
      trocoInput.style.display = "none"
      trocoInput.value = ""
    }
  })
}

/* =======================
   ENTREGA
======================= */
if (entregaSelect.addEventListener) {
  entregaSelect.addEventListener("change", () => {
    renderizarCarrinho()
  })
}

/* =======================
   CATEGORIAS
======================= */
async function carregarCategorias() {
  const { data } = await supabase.from("categorias").select("*")
  if (!data) return

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
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)

  if (data) produtos = data
}

/* =======================
   RENDER PRODUTOS
======================= */
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

function renderizarProduto(p) {
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

/* =======================
   CARRINHO
======================= */
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

/* =======================
   WHATSAPP FINAL
======================= */
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

  mensagem += `%0A`
  mensagem += frete > 0
    ? `🚗 *Frete:* R$ ${frete.toFixed(2)}`
    : `🚚 *Frete:* Grátis`

  mensagem += `%0A💰 *Total:* R$ ${(subtotal + frete).toFixed(2)}`
  mensagem += `%0A🔥 *DanBurgers agradece!*`

fetch("http://127.0.0.1:5000/novo_pedido", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        itens: carrinho,
        total: total
    })
})
.then(res => res.json())
.then(() => {
    alert("Pedido enviado com sucesso!");
    carrinho = [];
    renderizarCarrinho();
});
function enviarPedidoBackend() {
    fetch("http://127.0.0.1:5000/novo_pedido", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            itens: carrinho,
            total: total
        })
    })
    .then(res => res.json())
    .then(() => {
        alert("Pedido enviado com sucesso!");
        carrinho = [];
        renderizarCarrinho();
    })
    .catch(err => {
        console.error("Erro ao enviar pedido:", err);
        alert("Erro ao enviar pedido");
    });
}
