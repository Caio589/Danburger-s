let data = JSON.parse(localStorage.getItem("cardapio")) || {
  config:{ whatsapp:"", entrega:0 },
  categorias:[],
  produtos:[],
  adicionais:[]
};

function salvar(){
  localStorage.setItem("cardapio", JSON.stringify(data));
  render();
}

function salvarConfig(){
  data.config.whatsapp = whatsapp.value.trim();
  data.config.entrega = Number(entrega.value || 0);
  salvar();
  alert("Configurações salvas");
}

function addCategoria(){
  const nome = catNome.value.trim();
  if(!nome){
    alert("Digite o nome da categoria");
    return;
  }

  if(data.categorias.includes(nome)){
    alert("Essa categoria já existe");
    return;
  }

  data.categorias.push(nome);
  catNome.value = "";
  salvar();
}

function togglePizza(){
  if(ehPizza.checked){
    precosPizza.style.display="block";
    precoNormal.style.display="none";
  }else{
    precosPizza.style.display="none";
    precoNormal.style.display="block";
  }
}

function addProduto(){
  if(!produtoNome.value.trim()){
    alert("Digite o nome do produto");
    return;
  }

  let produto = {
    categoria: produtoCategoria.value,
    nome: produtoNome.value.trim(),
    desc: produtoDesc.value.trim(),
    pizza: ehPizza.checked
  };

  if(produto.pizza){
    produto.P = Number(pizzaP.value || 0);
    produto.M = Number(pizzaM.value || 0);
    produto.G = Number(pizzaG.value || 0);
  }else{
    produto.preco = Number(produtoPreco.value || 0);
  }

  data.produtos.push(produto);

  produtoNome.value="";
  produtoDesc.value="";
  produtoPreco.value="";
  pizzaP.value="";
  pizzaM.value="";
  pizzaG.value="";
  ehPizza.checked=false;
  togglePizza();

  salvar();
}

function render(){
  // Atualiza select de categorias
  produtoCategoria.innerHTML = "";
  data.categorias.forEach(c=>{
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    produtoCategoria.appendChild(opt);
  });

  // Lista produtos
  listaProdutos.innerHTML="";
  data.produtos.forEach(p=>{
    listaProdutos.innerHTML += `
      <div class="product">
        <b>${p.nome}</b> — ${p.categoria}
        ${p.pizza
          ? `(Pizza P:${p.P} M:${p.M} G:${p.G})`
          : `(R$ ${p.preco.toFixed(2)})`
        }
      </div>`;
  });

  whatsapp.value = data.config.whatsapp;
  entrega.value = data.config.entrega;
}

render();
