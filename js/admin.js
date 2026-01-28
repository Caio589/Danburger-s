import { supabase } from "./supabase.js"

document.addEventListener("DOMContentLoaded", () => {

  const listaCategorias = document.getElementById("lista-categorias")
  const listaProdutos = document.getElementById("lista-produtos")
  const selectCategoria = document.getElementById("categoriaProduto")

  // ======================
  // 🔹 CATEGORIAS
  // ======================

  async function carregarCategorias() {
    const { data } = await supabase
      .from("categorias")
      .select("*")
      .order("created_at", { ascending: true })

    listaCategorias.innerHTML = ""
    selectCategoria.innerHTML = `<option value="">Selecione a categoria</option>`

    data.forEach(c => {
      listaCategorias.innerHTML += `
        <div class="card">
          <b>${c.nome}</b>
          <button onclick="editarCategoria('${c.id}', '${c.nome}')">✏️</button>
          <button onclick="excluirCategoria('${c.id}')">🗑️</button>
        </div>
      `

      if (c.ativo) {
        selectCategoria.innerHTML += `<option value="${c.nome}">${c.nome}</option>`
      }
    })
  }

  window.editarCategoria = async (id, nomeAtual) => {
    const novoNome = prompt("Novo nome da categoria:", nomeAtual)
    if (!novoNome) return

    await supabase
      .from("categorias")
      .update({ nome: novoNome })
      .eq("id", id)

    carregarCategorias()
  }

  window.excluirCategoria = async (id) => {
    if (!confirm("Excluir categoria?")) return

    await supabase
      .from("categorias")
      .update({ ativo: false })
      .eq("id", id)

    carregarCategorias()
  }

  // ======================
  // 🔹 PRODUTOS
  // ======================

  async function carregarProdutos() {
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .order("created_at", { ascending: false })

    listaProdutos.innerHTML = ""

    data.forEach(p => {
      listaProdutos.innerHTML += `
        <div class="card">
          <b>${p.nome}</b> — ${p.categoria} — R$ ${p.preco}
          <br>
          <button onclick="editarProduto('${p.id}')">✏️ Editar</button>
          <button onclick="excluirProduto('${p.id}')">🗑️ Excluir</button>
        </div>
      `
    })
  }

  window.editarProduto = async (id) => {
    const { data } = await supabase
      .from("produtos")
      .select("*")
      .eq("id", id)
      .single()

    const nome = prompt("Nome:", data.nome)
    const descricao = prompt("Descrição:", data.descricao || "")
    const preco = prompt("Preço:", data.preco)
    const categoria = prompt("Categoria:", data.categoria)

    if (!nome || !preco || !categoria) return

    await supabase
      .from("produtos")
      .update({
        nome,
        descricao,
        preco,
        categoria
      })
      .eq("id", id)

    carregarProdutos()
  }

  window.excluirProduto = async (id) => {
    if (!confirm("Excluir produto?")) return

    await supabase
      .from("produtos")
      .update({ ativo: false })
      .eq("id", id)

    carregarProdutos()
  }

  // ======================
  // 🚀 START
  // ======================
  carregarCategorias()
  carregarProdutos()
})
