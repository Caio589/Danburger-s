import { supabase } from "./supabase.js"

const listaCategorias = document.getElementById("lista-categorias")
const listaProdutos = document.getElementById("lista-produtos")
const selectCategoria = document.getElementById("categoriaProduto")

async function carregarCategorias() {
  const { data } = await supabase
    .from("categorias")
    .select("*")
    .eq("ativo", true)

  listaCategorias.innerHTML = ""
  selectCategoria.innerHTML = ""

  data.forEach(c => {
    listaCategorias.innerHTML += `<p>📂 ${c.nome}</p>`
    selectCategoria.innerHTML += `<option>${c.nome}</option>`
  })
}

window.criarCategoria = async () => {
  const nome = document.getElementById("novaCategoria").value
  if (!nome) return alert("Digite o nome")

  await supabase.from("categorias").insert({ nome })
  document.getElementById("novaCategoria").value = ""
  carregarCategorias()
}

window.criarProduto = async () => {
  const nome = document.getElementById("nome").value
  const descricao = document.getElementById("descricao").value
  const preco = document.getElementById("preco").value
  const categoria = selectCategoria.value

  await supabase.from("produtos").insert({
    nome, descricao, preco, categoria
  })

  document.getElementById("nome").value = ""
  document.getElementById("descricao").value = ""
  document.getElementById("preco").value = ""

  carregarProdutos()
}

async function carregarProdutos() {
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .order("created_at", { ascending: false })

  listaProdutos.innerHTML = ""
  data.forEach(p => {
    listaProdutos.innerHTML += `<p>🍔 ${p.nome} (${p.categoria})</p>`
  })
}

carregarCategorias()
carregarProdutos()
