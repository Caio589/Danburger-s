let produtos = JSON.parse(localStorage.getItem("produtos")) || [
  {
    id: Date.now(),
    nome: "X-Burger",
    descricao: "Pão, carne e queijo",
    preco: 18,
    categoria: "Lanches",
    ativo: true
  }
]

function salvarProdutos() {
  localStorage.setItem("produtos", JSON.stringify(produtos))
}
