import { supabase } from "./supabase.js"

document.addEventListener("DOMContentLoaded", () => {

  console.log("ADMIN JS CARREGADO")

  const listaCategorias = document.getElementById("lista-categorias")
  const listaProdutos = document.getElementById("lista-produtos")
  const selectCategoria = document.getElementById("categoriaProduto")

  const btnCriarCategoria = document.getElementById("btnCriarCategoria")
  const btnCriarProduto = document.getElementById("btnCriarProduto")

  // ======================
  // 🔹 CATEGORIAS
  // ======================

  async function carregarCategorias() {
    const { data, error } = await supabase
      .from("categorias")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Erro ao carregar categorias:", error)
      return
    }

    if (!data) return

    listaCategorias.innerHTML = ""
    selectCategoria.innerHTML = `<option value="">Selecione a categoria</option>`

    data.forEach(c => {
      listaCategorias.innerHTML += `
        <div class="card">
          <b>${c.nome}</b>
          <div class="acoes">
            <button class="btn editar" data-id="${c.id}" data-nome="${c.nome}">✏️ Editar</button>
            <button class="btn excluir" data-id="${c.id}">🗑️ Excluir</button>
          </div>
        </div>
      `

      if (c.ativo) {
        selectCategoria.innerHTML += `<option value="${c.nome}">${c.nome}</option>`
      }
    })
  }

  btnCriarCategoria.addEventListener("click", async () => {
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
  })

  // ======================
  // 🔹 PRODUTOS
  // ======================

  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao carregar produtos:", error)
      return
    }

    if (!data) return

    listaProdutos.innerHTML = ""

    data.forEach(p => {
      listaProdutos.innerHTML += `
        <div class="card">
          <b>${p.nome}</b> — ${p.categoria} — R$ ${p.preco}
          <div class="acoes">
            <button class="btn editar" data-id="${p.id}">✏️ Editar</button>
            <button class="btn excluir" data-id="${p.id}">🗑️ Excluir</button>
          </div>
        </div>
      `
    })
  }

  btnCriarProduto.addEventListener("click", async () => {
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
  })

  // ======================
  // 🚀 START
  // ======================
  carregarCategorias()
  carregarProdutos()
})
