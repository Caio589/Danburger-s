import { supabase } from "./supabase.js"

const lista = document.getElementById("lista-produtos")
const resumo = document.getElementById("resumo")
const totalEl = document.getElementById("total")

let carrinho = []

function atualizarResumo() {
  resumo.innerHTML = ""
  let total = 0

  carrinho.forEach((i, idx) => {
    total += i.preco
    resumo.innerHTML += `
      <p>${i.nome} - R$ ${i.preco.toFixed(2)}</p>
    `
  })

  const entrega = document.getElementById("entrega").value
  if (entrega === "fora") total += 7

  totalEl.innerText = `Total: R$ ${total.toFixed(2)}`
  return total
}

async function carregarProdutos() {
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)

  lista.innerHTML = ""

  data.forEach(p => {
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

window.add = (nome, preco) => {
  carrinho.push({ nome, preco })
  atualizarResumo()
}

window.enviarPedido = () => {
  const nome = document.getElementById("nome").value
  const tel = document.getElementById("telefone").value
  const end = document.getElementById("endereco").value
  const pag = document.getElementById("pagamento").value
  const troco = document.getElementById("troco").value

  const total = atualizarResumo()

  let msg = `🍔 *Pedido DanBurgers*%0A`
  msg += `👤 ${nome}%0A📞 ${tel}%0A`
  msg += `%0A🧾 *Itens:*%0A`
  carrinho.forEach(i => msg += `- ${i.nome}%0A`)
  msg += `%0A💳 ${pag}%0A`
  if (troco) msg += `💵 Troco para: R$ ${troco}%0A`
  msg += `💰 Total: R$ ${total.toFixed(2)}`

  const numero = "5599999999999" // SEU WHATSAPP
  window.open(`https://wa.me/${numero}?text=${msg}`, "_blank")
}

document.getElementById("entrega").addEventListener("change", atualizarResumo)

carregarProdutos()
