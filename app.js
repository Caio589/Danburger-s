const data = JSON.parse(localStorage.getItem("cardapio"));
const menu = document.getElementById("menu");
let total = 0;
let pedido = [];

if(!data){
  menu.innerHTML="Cadastre no painel.";
}else{

  // Produtos normais
  data.categorias.forEach(cat=>{
    const c=document.createElement("div");
    c.className="category";
    c.innerText=cat;
    const p=document.createElement("div");
    p.className="products";
    c.onclick=()=>p.style.display=p.style.display==="block"?"none":"block";

    data.produtos.filter(x=>x.categoria===cat).forEach(i=>{
      p.innerHTML+=`
        <div class="product">
          <b>${i.nome}</b>
          <div class="desc">${i.desc}</div>
          <div class="price">R$ ${i.preco.toFixed(2)}</div>
          <button onclick="add(${i.preco},'${i.nome}')">Adicionar</button>
        </div>`;
    });

    menu.appendChild(c);
    menu.appendChild(p);
  });

  // Pizzas
  const cp=document.createElement("div");
  cp.className="category";
  cp.innerText="🍕 Pizzas";
  const pp=document.createElement("div");
  pp.className="products";
  cp.onclick=()=>pp.style.display=pp.style.display==="block"?"none":"block";

  data.pizzas.forEach(p=>{
    pp.innerHTML+=`
      <div class="product">
        <b>${p.nome}</b>
        <div class="desc">${p.desc}</div>
        <select onchange="add(this.value,'Pizza ${p.nome}')">
          <option value="0">Escolher tamanho</option>
          <option value="${p.P}">P - R$ ${p.P}</option>
          <option value="${p.M}">M - R$ ${p.M}</option>
          <option value="${p.G}">G - R$ ${p.G}</option>
        </select>
      </div>`;
  });

  menu.appendChild(cp);
  menu.appendChild(pp);

  // Adicionais
  const ad=document.createElement("div");
  ad.innerHTML="<h2>Adicionais</h2>";
  data.adicionais.forEach(a=>{
    ad.innerHTML+=`
      <label>
        <input type="checkbox" value="${a.preco}" onchange="toggleAdd(this,'${a.nome}')">
        ${a.nome} (+R$ ${a.preco})
      </label><br>`;
  });
  menu.appendChild(ad);

  entrega.innerHTML+=`<option value="${data.config.entrega}">Entrega (+R$ ${data.config.entrega})</option>`;
}

function add(v,n){
  if(v>0){
    total+=Number(v);
    pedido.push(n);
    atualizar();
  }
}

function toggleAdd(el,n){
  if(el.checked){
    total+=Number(el.value);
    pedido.push(n);
  }else{
    total-=Number(el.value);
  }
  atualizar();
}

function atualizar(){
  document.getElementById("total").innerText=total.toFixed(2);
}
