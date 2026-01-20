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
  let produto = {
    categoria: produtoCategoria.value,
    nome: produtoNome.value,
    desc: produtoDesc.value,
    pizza: ehPizza.checked
  };

  if(produto.pizza){
    produto.P = Number(pizzaP.value);
    produto.M = Number(pizzaM.value);
    produto.G = Number(pizzaG.value);
  }else{
    produto.preco = Number(produtoPreco.value);
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
  produtoCategoria.innerHTML="";
  data.categorias.forEach(c=>{
    produtoCategoria.innerHTML+=`<option>${c}</option>`;
  });

  listaProdutos.innerHTML="";
  data.produtos.forEach(p=>{
    listaProdutos.innerHTML+=`
      <div class="product">
        <b>${p.nome}</b> (${p.categoria})
        ${p.pizza
          ? `(Pizza P:${p.P} M:${p.M} G:${p.G})`
          : `(R$ ${p.preco})`
        }
      </div>`;
  });

  whatsapp.value=data.config.whatsapp;
  entrega.value=data.config.entrega;
}

render();
