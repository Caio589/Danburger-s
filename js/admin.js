import { supabase } from "./supabase.js"

document.addEventListener("DOMContentLoaded", () => {

  console.log("ADMIN JS OK")

  const listaCategorias = document.getElementById("lista-categorias")
  const listaProdutos = document.getElementById("lista-produtos")
  const selectCategoria = document.getElementById("categoriaProduto")

  const btnCriarCategoria = document.getElementById("btnCriarCategoria")
  const btnCriarProduto = document.getElementById("btnCriarProduto")

  // =========================
  // 🔹 CATEGORIAS
  // =========================
  async function carregarCategorias() {
    const { data, error } = await supabase
      .from("categorias")
      .select("*")

    if (error || !Array.isArray(data)) {
      console.error("Erro categorias:", error)
      return
    }

    listaCategorias.innerHTML = ""
    selectCategoria.innerHTML = `<option value="">Selecione a categoria</option>`

    data.forEach(c => {
      listaCategorias.innerHTML += `
        <div class="card">
          <b>${c.nome}</b>
          <div class="acoes">
            <button class="btn editar"
              data-id="${c.id}"
              data-nome="${c.nome}">
              ✏️ Editar
            </button>

            <button class="btn excluir"
              data-id="${c.id}">
              🗑️ Excluir
            </button>
          </div>
        </div>
      `

      selectCategoria.innerHTML += `
        <option value="${c.nome}">${c.nome}</option>
      `
    })

    // ✏️ EDITAR CATEGORIA
    document.querySelectorAll("#lista-categorias .btn.editar").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id
        const nomeAtual = btn.dataset.nome
        const novoNome = prompt("Novo nome da categoria:", nomeAtual)
        if (!novoNome) return

        const { error } = await supabase
          .from("categorias")
          .update({ nome: novoNome })
          .eq("id", id)

        if (error) {
          alert("Erro ao editar categoria")
          console.error(error)
          return
        }

        carregarCategorias()
        carregarProdutos()
      }
    })

    // 🗑️ EXCLUIR CATEGORIA (DELETE REAL)
    document.querySelectorAll("#lista-categorias .btn.excluir").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id
        if (!confirm("Excluir categoria DEFINITIVAMENTE?")) return

        const { error } = await supabase
          .from("categorias")
          .delete()
          .eq("id", id)

        if (error) {
          alert("Erro ao excluir categoria")
          console.error(error)
          return
        }

        carregarCategorias()
        carregarProdutos()
      }
    })
  }

  btnCriarCategoria.onclick = async () => {
    const nome = document.getElementById("novaCategoria").value.trim()
    if (!nome) return alert("Digite o nome da categoria")

    const { error } = await supabase
      .from("categorias")
      .insert({ nome })

    if (error) {
      alert("Erro ao criar categoria")
      console.error(error)
      return
    }

    document.getElementById("novaCategoria").value = ""
    carregarCategorias()
  }

  // =========================
  // 🔹 PRODUTOS
  // =========================
  async function carregarProdutos() {
    const { data, error } = await supabase
      .from("produtos")
      .select("*")

    if (error || !Array.isArray(data)) {
      console.error("Erro produtos:", error)
      return
    }

    listaProdutos.innerHTML = ""

    data.forEach(p => {
      listaProdutos.innerHTML += `
        <div class="card">
          <b>${p.nome}</b> — ${p.categoria} — R$ ${p.preco}
          <div class="acoes">
            <button class="btn editar"
              data-id="${p.id}"
              data-nome="${p.nome}"
              data-descricao="${p.descricao || ""}"
              data-preco="${p.preco}"
              data-categoria="${p.categoria}">
              ✏️ Editar
            </button>

            <button class="btn excluir"
              data-id="${p.id}">
              🗑️ Excluir
            </button>
          </div>
        </div>
      `
    })

    // ✏️ EDITAR PRODUTO
    document.querySelectorAll("#lista-produtos .btn.editar").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id

        const nome = prompt("Nome:", btn.dataset.nome)
        const descricao = prompt("Descrição:", btn.dataset.descricao)
        const preco = prompt("Preço:", btn.dataset.preco)
        const categoria = prompt("Categoria:", btn.dataset.categoria)

        if (!nome || !preco || !categoria) return

        const { error } = await supabase
          .from("produtos")
          .update({
            nome,
            descricao,
            preco,
            categoria
          })
          .eq("id", id)

        if (error) {
          alert("Erro ao editar produto")
          console.error(error)
          return
        }

        carregarProdutos()
      }
    })

    // 🗑️ EXCLUIR PRODUTO (DELETE REAL)
    document.querySelectorAll("#lista-produtos .btn.excluir").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id
        if (!confirm("Excluir produto DEFINITIVAMENTE?")) return

        const { error } = await supabase
          .from("produtos")
          .delete()
          .eq("id", id)

        if (error) {
          alert("Erro ao excluir produto")
          console.error(error)
          return
        }

        carregarProdutos()
      }
    })
  }

  btnCriarProduto.onclick = async () => {
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
        categoria
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

  // 🚀 START
  carregarCategorias()
  carregarProdutos()
})
