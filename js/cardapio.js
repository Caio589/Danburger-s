import { supabase } from "./supabase.js"

const categoriasEl = document.getElementById("categorias")
const lista = document.getElementById("lista-produtos")
const resumo = document.getElementById("resumo")
const totalEl = document.getElementById("total")

let produtos = []
let carrinho = []
let categoriaAtual = "Todos"

async function carregarTudo() {
  const { data: cats } = await supabase
    .from("categorias")
    .select("*")
    .eq("ativo", true)

  categoriasEl.innerHTML = `<button class="btn btn-add" onclick="filtrar('Todos')">Todos</button>`
  cats.forEach(c => {
    categoriasEl.innerHTML += `
      <button class="btn btn-add" onclick="filtrar('${c.nome}')">${c.nome}</button>
    `
  })

  const { data: prods } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)

  produtos = prods
  renderizar()
}

window.filtrar = (cat) => {
  categoriaAtual = cat
  renderizar()
}

function renderizar() {
  lista.innerHTML = ""
  const filtrados = categoriaAtual === "Todos"
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtual)

  filtrados.forEach(p => {
    lista.innerHTML += `
      <div class="card">
        <h3>${p.nome}</h3>
        <p>${p.descricao || ""}</p>
        <div class="preco">R$ ${p.preco.toFixed(2)}</div>
        <button class="btn btn-add" onclick="add('${p.nome}', ${p.preco})">Adicionar</button>
      </div>
    `
  })
}

window.add = (nome, preco) => {
  carrinho.push({ nome, preco })
  atualizarResumo()
}

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

window.enviarPedido = () => {
  let msg = `🍔 Pedido DanBurgers%0A`
  carrinho.forEach(i => msg += `- ${i.nome}%0A`)
  msg += `%0ATotal: ${totalEl.innerText}`

  window.open(`https://wa.me/55SEUNUMEROAQUI?text=${msg}`)
}

carregarTudo()
