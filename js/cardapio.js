import { supabase } from "./supabase.js"

const lista = document.getElementById("lista-produtos")
const resumo = document.getElementById("resumo")
const totalEl = document.getElementById("total")

let produtos = []
let carrinho = []
let categoriaAtual = "Todos"

// BUSCAR PRODUTOS
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
  renderizarProdutos()
}

// RENDERIZAR PRODUTOS
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

// FILTRAR CATEGORIA
window.filtrar = (categoria) => {
  categoriaAtual = categoria
  renderizarProdutos()
}

// ADD CARRINHO
window.add = (nome, preco) => {
  carrinho.push({ nome, preco })
  atualizarResumo()
}

// RESUMO + TOTAL
function atualizarResumo() {
  resumo.innerHTML = ""
  let total = 0

  carrinho.forEach(i => {
    total += i.preco
    resumo.innerHTML += `<p>${i.nome} - R$ ${i.preco.toFixed(2)}</p>`
  })

  const entrega = document.getElementById("entrega").value
  if (entrega === "fora") total += 7

  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`
}

document.getElementById("entrega").addEventListener("change", atualizarResumo)

// ENVIAR WHATS
window.enviarPedido = () => {
  const nome = document.getElementById("nome").value
  const tel = document.getElementById("telefone").value
  const end = document.getElementById("endereco").value
  const pag = document.getElementById("pagamento").value
  const troco = document.getElementById("troco").value

  let msg = `🍔 *Pedido DanBurgers*%0A`
  msg += `👤 ${nome}%0A📞 ${tel}%0A`
  msg += `%0A🧾 *Itens:*%0A`

  carrinho.forEach(i => msg += `- ${i.nome}%0A`)

  msg += `%0A🚚 Entrega: ${document.getElementById("entrega").value}%0A`
  msg += `💳 Pagamento: ${pag}%0A`
  if (troco) msg += `💵 Troco para: R$ ${troco}%0A`
  msg += `💰 Total: ${totalEl.innerText.replace("Total: ", "")}`

  const numero = "55SEUNUMEROAQUI"
  window.open(`https://wa.me/${numero}?text=${msg}`, "_blank")
}

// START
carregarProdutos()
