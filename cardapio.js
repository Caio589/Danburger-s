const lista = document.getElementById("lista-produtos")

function renderizarCardapio() {
  lista.innerHTML = ""

  produtos
    .filter(p => p.ativo)
    .forEach(p => {
      lista.innerHTML += `
        <div class="card">
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <strong>R$ ${p.preco.toFixed(2)}</strong>
        </div>
      `
    })
}

renderizarCardapio()
