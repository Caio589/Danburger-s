import { supabase } from "./supabase.js"

const listaCategorias = document.getElementById("lista-categorias")
const listaProdutos = document.getElementById("lista-produtos")
const selectCategoria = document.getElementById("categoriaProduto")

// 🔹 CARREGAR CATEGORIAS NO ADM
async function carregarCategorias() {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("ativo", true)

  if (error) {
    console.error("Erro ao carregar categorias:", error)
    return
  }

  listaCategorias.innerHTML = ""
  selectCategoria.innerHTML = `<option value="">Selecione a categoria</option>`

  data.forEach(c => {
    listaCategorias.innerHTML += `<p>📂 ${c.nome}</p>`
    selectCategoria.innerHTML += `<option value="${c.nome}">${c.nome}</option>`
  })
}

// 🔹 CRIAR CATEGORIA
window.criarCategoria = async () => {
  const nome = document.getElementById("novaCategoria").value.trim()
  if (!nome) return alert("Digite o nome da categoria")

  const { error } = await supabase
    .from("categorias")
    .insert({ nome, ativo: true })

  if (error) {
    alert("Erro ao criar categoria")
    console.error(error)
    return
  }

  document.getElementById("novaCategoria").value = ""
  carregarCategorias()
}

// 🔹 CRIAR PRODUTO (COM CATEGORIA)
window.criarProduto = async () => {
  const nome = document.getElementById("nomeProduto").value.trim()
  const descricao = document.getElementById("descricaoProduto").value.trim()
  const preco = Number(document.getElementById("precoProduto").value)
  const categoria = selectCategoria.value

  if (!nome || !preco || !categoria) {
    alert("Preencha nome, preço e categoria")
    return
  }

  const { error } = await supabase
    .from("produtos")
    .insert({
      nome,
      descricao,
      preco,
      categoria,
      ativo: true
    })

  if (error) {
    alert("Erro ao criar produto")
    console.error(error)
    return
  }

  document.getElementById("nomeProduto").value = ""
  document.getElementById("descricaoProduto").value = ""
  document.getElementById("precoProduto").value = ""

  carregarProdutos()
}

// 🔹 LISTAR PRODUTOS
async function carregarProdutos() {
  const { data } = await supabase
    .from("produtos")
    .select("*")
    .order("created_at", { ascending: false })

  listaProdutos.innerHTML = ""
  data.forEach(p => {
    listaProdutos.innerHTML += `<p>🍔 ${p.nome} — ${p.categoria}</p>`
  })
}

// 🚀 START
carregarCategorias()
carregarProdutos()
