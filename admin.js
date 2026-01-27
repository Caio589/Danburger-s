import { criarProduto } from "./data.js"

const form = document.getElementById("form-produto")

form.addEventListener("submit", async e => {
  e.preventDefault()

  const produto = {
    nome: form.nome.value,
    descricao: form.descricao.value,
    preco: Number(form.preco.value),
    categoria: form.categoria.value,
    ativo: true
  }

  await criarProduto(produto)
  alert("Produto cadastrado!")
  form.reset()
})
