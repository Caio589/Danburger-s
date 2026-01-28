import { supabase } from "./supabase.js"

const lista = document.getElementById("lista-produtos")
let carrinho = []

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
        <button class="btn" onclick="add('${p.nome}', ${p.preco})">
          Adicionar
        </button>
      </div>
    `
  })
}

window.add = (nome, preco) => {
  carrinho.push({ nome, preco })
  alert("Adicionado ao pedido!")
}

window.enviarPedido = () => {
  const nome = document.getElementById("nome").value
  const tel = document.getElementById("telefone").value
  const end = document.getElementById("endereco").value
  const entrega = document.getElementById("entrega").value
  const pag = document.getElementById("pagamento").value

  let total = carrinho.reduce((s, i) => s + i.preco, 0)

  let taxa = entrega === "fora" ? 7 : 0
  total += taxa

  let msg = `🍔 *Pedido DanBurgers*%0A`
  msg += `👤 ${nome}%0A📞 ${tel}%0A`
  msg += `%0A🧾 *Itens:*%0A`
  carrinho.forEach(i => msg += `- ${i.nome}%0A`)
  msg += `%0A🚚 Entrega: ${entrega}%0A`
  msg += `💳 Pagamento: ${pag}%0A`
  msg += `💰 Total: R$ ${total.toFixed(2)}`

  const numero = "5599999999999" // SEU WHATSAPP
  window.open(`https://wa.me/${numero}?text=${msg}`, "_blank")
}

carregarProdutos()
