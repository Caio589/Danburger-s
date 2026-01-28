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

    if (error) {
      console.error("Erro ao carregar categorias:", error)
      return
    }

    if (!Array.isArray(data)) return

    listaCategorias.innerHTML = ""
    selectCategoria.innerHTML = `<option value="">Selecione a categoria</option>`

    data.forEach(c => {
      listaCategorias.innerHTML += `
        <div class="card">
          <b>${c.nome}</b>
          <div class="acoes">
            <button class="btn editar" data-id="${c.id}" data-nome="${c.nome}">
              ✏️ Editar
            </button>
            <button class="btn excluir" data-id="${c.id}">
              🗑️ Excluir
            </button>
          </div>
        </div>
      `

      if (c.ativo) {
        selectCategoria.innerHTML += `
          <option value="${c.nome}">${c.nome}</option>
        `
      }
    })

    // eventos editar/excluir categoria
    document.querySelectorAll(".btn.editar").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id
        const nomeAtual = btn.dataset.nome
        const novoNome = prompt("Novo nome da categoria:", nomeAtual)
        if (!novoNome) return

        await supabase
          .from("categorias")
          .update({ nome: novoNome })
          .eq("id", id)

        carregarCategorias()
        carregarProdutos()
      }
    })

    document.querySelectorAll(".btn.excluir").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id
        if (!confirm("Excluir categoria?")) return

        await supabase
          .from("categorias")
          .update({ ativo: false })
          .eq("id", id)

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
      .insert({ nome, ativo: true })

    if (error) {
      console.error(error)
      alert("Erro ao criar categoria")
      return
    }

    document.getElementById("novaCategoria").value = ""
    carregarCategorias()
  }

 // ======================
// 🔹 PRODUTOS
// ======================
async function carregarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")

  if (error || !Array.isArray(data)) {
    console.error("Erro ao carregar produtos:", error)
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

          <button class="btn excluir" data-id="${p.id}">
            🗑️ Excluir
          </button>
        </div>
      </div>
    `
  })

  // ✏️ EDITAR
  document.querySelectorAll(".btn.editar").forEach(btn => {
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
        console.error(error)
        alert("Erro ao editar produto")
        return
      }

      carregarProdutos()
    }
  })

  // 🗑️ EXCLUIR (soft delete)
  document.querySelectorAll(".btn.excluir").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id
      if (!confirm("Excluir produto?")) return

      const { error } = await supabase
        .from("produtos")
        .update({ ativo: false })
        .eq("id", id)

      if (error) {
        console.error(error)
        alert("Erro ao excluir produto")
        return
      }

      carregarProdutos()
    }
  })
}

    // eventos editar/excluir produto
    document.querySelectorAll(".btn.editar").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id

        const { data: p } = await supabase
          .from("produtos")
          .select("*")
          .eq("id", id)
          .single()

        const nome = prompt("Nome:", p.nome)
        const descricao = prompt("Descrição:", p.descricao || "")
        const preco = prompt("Preço:", p.preco)
        const categoria = prompt("Categoria:", p.categoria)

        if (!nome || !preco || !categoria) return

        await supabase
          .from("produtos")
          .update({ nome, descricao, preco, categoria })
          .eq("id", id)

        carregarProdutos()
      }
    })

    document.querySelectorAll(".btn.excluir").forEach(btn => {
      btn.onclick = async () => {
        const id = btn.dataset.id
        if (!confirm("Excluir produto?")) return

        await supabase
          .from("produtos")
          .update({ ativo: false })
          .eq("id", id)

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
        categoria,
        ativo: true
      })

    if (error) {
      console.error(error)
      alert("Erro ao criar produto")
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
