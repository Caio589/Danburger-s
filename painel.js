let data = JSON.parse(localStorage.getItem("cardapio")) || {
  config:{ whatsapp:"", entrega:0 },
  categorias:[],
  produtos:[],
  pizzas:[],
  adicionais:[]
};

function salvar(){
  localStorage.setItem("cardapio", JSON.stringify(data));
  render();
}

function salvarConfig(){
  data.config.whatsapp = whatsapp.value;
  data.config.entrega = Number(entrega.value);
  salvar();
}

function addCategoria(){
  if(!catNome.value) return;
  data.categorias.push(catNome.value);
  catNome.value="";
  salvar();
}

function addProduto(){
  data.produtos.push({
    tipo:"normal",
    categoria: produtoCategoria.value,
    nome: produtoNome.value,
    desc: produtoDesc.value,
    preco: Number(produtoPreco.value)
  });
  produtoNome.value="";
  produtoDesc.value="";
  produtoPreco.value="";
  salvar();
}

function addPizza(){
  data.pizzas.push({
    nome: pizzaNome.value,
    desc: pizzaDesc.value,
    P:Number(pizzaP.value),
    M:Number(pizzaM.value),
    G:Number(pizzaG.value)
  });
  pizzaNome.value="";
  pizzaDesc.value="";
  pizzaP.value="";
  pizzaM.value="";
  pizzaG.value="";
  salvar();
}

function addAdicional(){
  data.adicionais.push({
    nome: addNome.value,
    preco: Number(addPreco.value)
  });
  addNome.value="";
  addPreco.value="";
  salvar();
}

function render(){
  produtoCategoria.innerHTML="";
  data.categorias.forEach(c=>{
    produtoCategoria.innerHTML += `<option>${c}</option>`;
  });

  listaProdutos.innerHTML="<h3>Produtos / Pizzas</h3>";
  data.produtos.forEach(p=>{
    listaProdutos.innerHTML += `<div>${p.nome} - R$ ${p.preco}</div>`;
  });
  data.pizzas.forEach(p=>{
    listaProdutos.innerHTML += `<div>🍕 ${p.nome} (P:${p.P} M:${p.M} G:${p.G})</div>`;
  });

  listaAdicionais.innerHTML="<h3>Adicionais</h3>";
  data.adicionais.forEach(a=>{
    listaAdicionais.innerHTML += `<div>${a.nome} - R$ ${a.preco}</div>`;
  });

  whatsapp.value=data.config.whatsapp;
  entrega.value=data.config.entrega;
}

render();
