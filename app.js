const data = JSON.parse(localStorage.getItem("cardapio"));
const menu = document.getElementById("menu");

let total = 0;
let pedido = [];

if(!data){
  menu.innerHTML = "Cadastre os produtos no painel.";
}else{

  // ========= PRODUTOS NORMAIS =========
  data.categorias.forEach(cat=>{
    const c = document.createElement("div");
    c.className = "category";
    c.innerText = cat;

    const p = document.createElement("div");
    p.className = "products";
    c.onclick = ()=> p.style.display = p.style.display==="block" ? "none" : "block";

    data.produtos
      .filter(x => x.categoria === cat)
      .forEach(i=>{
        p.innerHTML += `
          <div class="product">
            <b>${i.nome}</b>
            <div class="desc">${i.desc}</div>
            <div class="price">R$ ${i.preco.toFixed(2)}</div>
            <button onclick="addItem(${i.preco}, '${i.nome}')">Adicionar</button>
          </div>`;
      });

    menu.appendChild(c);
    menu.appendChild(p);
  });

  // ========= PIZZAS (SÓ SE EXISTIREM) =========
  if(data.pizzas && data.pizzas.length > 0){
    const cp = document.createElement("div");
    cp.className = "category";
    cp.innerText = "🍕 Pizzas";

    const pp = document.createElement("div");
    pp.className = "products";
    cp.onclick = ()=> pp.style.display = pp.style.display==="block" ? "none" : "block";

    data.pizzas.forEach(pz=>{
      pp.innerHTML += `
        <div class="product">
          <b>${pz.nome}</b>
          <div class="desc">${pz.desc}</div>
          <select onchange="addPizza(this, '${pz.nome}')">
            <option value="">Escolher tamanho</option>
            ${pz.P ? `<option value="${pz.P}">P - R$ ${pz.P}</option>` : ``}
            ${pz.M ? `<option value="${pz.M}">M - R$ ${pz.M}</option>` : ``}
            ${pz.G ? `<option value="${pz.G}">G - R$ ${pz.G}</option>` : ``}
          </select>
        </div>`;
    });

    menu.appendChild(cp);
    menu.appendChild(pp);
  }

  // ========= ADICIONAIS (SÓ SE EXISTIREM) =========
  if(data.adicionais && data.adicionais.length > 0){
    const ad = document.createElement("div");
    ad.innerHTML = "<h2>➕ Adicionais</h2>";

    data.adicionais.forEach(a=>{
      ad.innerHTML += `
        <label>
          <input type="checkbox" value="${a.preco}" onchange="toggleAdd(this,'${a.nome}')">
          ${a.nome} (+R$ ${a.preco})
        </label><br>`;
    });

    menu.appendChild(ad);
  }

  // ========= ENTREGA =========
  entrega.innerHTML += `
    <option value="${data.config.entrega}">
      Entrega (+R$ ${data.config.entrega.toFixed(2)})
    </option>`;
}

// ========= FUNÇÕES =========

function addItem(valor, nome){
  total += Number(valor);
  pedido.push(nome);
  atualizar();
}

function addPizza(select, nome){
  if(select.value){
    total += Number(select.value);
    pedido.push(`Pizza ${nome}`);
    select.disabled = true; // evita somar duas vezes
    atualizar();
  }
}

function toggleAdd(el, nome){
  if(el.checked){
    total += Number(el.value);
    pedido.push(nome);
  }else{
    total -= Number(el.value);
  }
  atualizar();
}

function atualizar(){
  document.getElementById("total").innerText = total.toFixed(2);
}
