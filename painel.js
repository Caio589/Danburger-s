let data = JSON.parse(localStorage.getItem("cardapio")) || {
  config:{ whatsapp:"", entrega:0 },
  categorias:[],
  produtos:[]
};

function salvar(){
  localStorage.setItem("cardapio", JSON.stringify(data));
  render();
}

function salvarConfig(){
  data.config.whatsapp = whatsapp.value;
  data.config.entrega = Number(entrega.value);
  salvar();
  alert("Configurações salvas");
}

function addCategoria(){
  if(!catNome.value) return;
  data.categorias.push(catNome.value);
  catNome.value="";
  salvar();
}

function addProduto(){
  if(!produtoNome.value) return;
  data.produtos.push({
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

function del(i){
  data.produtos.splice(i,1);
  salvar();
}

function render(){
  produtoCategoria.innerHTML="";
  data.categorias.forEach(c=>{
    produtoCategoria.innerHTML += `<option>${c}</option>`;
  });

  listaProdutos.innerHTML="";
  data.produtos.forEach((p,i)=>{
    listaProdutos.innerHTML += `
      <div class="product">
        <b>${p.nome}</b> (${p.categoria}) - R$ ${p.preco.toFixed(2)}
        <button onclick="del(${i})">Excluir</button>
      </div>`;
  });

  whatsapp.value = data.config.whatsapp;
  entrega.value = data.config.entrega;
}

render();
