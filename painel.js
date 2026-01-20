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

/* ===== CONFIG ===== */
function salvarConfig(){
  data.config.whatsapp = whatsapp.value.trim();
  data.config.entrega = Number(entrega.value || 0);
  salvar();
  alert("Configurações salvas");
}

/* ===== CATEGORIAS ===== */
function addCategoria(){
  const nome = catNome.value.trim();
  if(!nome) return alert("Digite o nome da categoria");
  if(data.categorias.includes(nome)) return alert("Categoria já existe");

  data.categorias.push(nome);
  catNome.value="";
  salvar();
}

function editarCategoria(i){
  const novo = prompt("Novo nome da categoria:", data.categorias[i]);
  if(!novo) return;

  const antigo = data.categorias[i];
  data.categorias[i] = novo;

  data.produtos.forEach(p=>{
    if(p.categoria === antigo) p.categoria = novo;
  });

  salvar();
}

function apagarCategoria(i){
  if(!confirm("Apagar categoria e seus produtos?")) return;

  const nome = data.categorias[i];
  data.categorias.splice(i,1);
  data.produtos = data.produtos.filter(p=>p.categoria !== nome);

  salvar();
}

/* ===== PRODUTOS ===== */
function togglePizza(){
  precosPizza.style.display = ehPizza.checked ? "block" : "none";
  precoNormal.style.display = ehPizza.checked ? "none" : "block";
}

function addProduto(){
  if(!produtoNome.value.trim()) return alert("Nome do produto obrigatório");

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

function editarProduto(i){
  const p = data.produtos[i];
  const nome = prompt("Nome:", p.nome);
  if(!nome) return;

  p.nome = nome;
  p.desc = prompt("Descrição:", p.desc) || p.desc;

  if(p.pizza){
    p.P = Number(prompt("Preço P:", p.P));
    p.M = Number(prompt("Preço M:", p.M));
    p.G = Number(prompt("Preço G:", p.G));
  }else{
    p.preco = Number(prompt("Preço:", p.preco));
  }

  salvar();
}

function apagarProduto(i){
  if(confirm("Apagar produto?")){
    data.produtos.splice(i,1);
    salvar();
  }
}

/* ===== RENDER ===== */
function render(){
  /* Categorias */
  listaCategorias.innerHTML="";
  produtoCategoria.innerHTML="";

  data.categorias.forEach((c,i)=>{
    listaCategorias.innerHTML += `
      <div class="product">
        <b>${c}</b>
        <button onclick="editarCategoria(${i})">Editar</button>
        <button onclick="apagarCategoria(${i})">Excluir</button>
      </div>`;

    produtoCategoria.innerHTML += `<option>${c}</option>`;
  });

  /* Produtos */
  listaProdutos.innerHTML="";
  data.produtos.forEach((p,i)=>{
    listaProdutos.innerHTML += `
      <div class="product">
        <b>${p.nome}</b> — ${p.categoria}<br>
        ${p.pizza
          ? `Pizza (P:${p.P} M:${p.M} G:${p.G})`
          : `R$ ${p.preco.toFixed(2)}`
        }
        <br>
        <button onclick="editarProduto(${i})">Editar</button>
        <button onclick="apagarProduto(${i})">Excluir</button>
      </div>`;
  });

  whatsapp.value = data.config.whatsapp;
  entrega.value = data.config.entrega;
}

render();
