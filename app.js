/*const data = JSON.parse(localStorage.getItem("cardapio"));
const menu = document.getElementById("menu");*/
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://lrngbekbptzjplyanzfu.supabase.co'
const supabaseKey = 'sb_publishable_V3zBtqHmGtWu_kz83QEVIQ_bWxPxiqm'
const supabase = createClient(supabaseUrl, supabaseKey)

async function carregarProdutos() {
  const { data, error } = await supabase
    .from('produtos')
    .select('*')
    .order('nome')

  if (error) {
    console.error(error)
    return
  }

  const menu = document.getElementById('menu')
  menu.innerHTML = ''

  data.forEach(produto => {
    menu.innerHTML += `
      <div class="produto">
        <h3>${produto.nome}</h3>
        <p>R$ ${Number(produto.preco).toFixed(2)}</p>
      </div>
    `
  })
}

carregarProdutos()
let total = 0;
let pedido = [];

if(!data){
  menu.innerHTML = "Cadastre produtos no painel.";
}else{

  /* ================= PRODUTOS NORMAIS ================= */
  data.categorias.forEach(cat=>{
    const c = document.createElement("div");
    c.className = "category";
    c.innerText = cat;

    const p = document.createElement("div");
    p.className = "products";
    c.onclick = ()=>p.style.display=p.style.display==="block"?"none":"block";

    data.produtos
      .filter(x=>x.categoria===cat)
      .forEach(i=>{
        p.innerHTML += `
          <div class="product">
            <b>${i.nome}</b>
            <div class="desc">${i.desc}</div>
            <div class="price">R$ ${i.preco.toFixed(2)}</div>
            <button onclick="addItem(${i.preco},'${i.nome}')">Adicionar</button>
          </div>`;
      });

    if(p.innerHTML.trim() !== ""){
      menu.appendChild(c);
      menu.appendChild(p);
    }
  });

  /* ================= PIZZAS (SÓ SE EXISTIR) ================= */
  if(data.pizzas && data.pizzas.length > 0){
    const c = document.createElement("div");
    c.className = "category";
    c.innerText = "🍕 Pizzas";

    const p = document.createElement("div");
    p.className = "products";
    c.onclick = ()=>p.style.display=p.style.display==="block"?"none":"block";

    data.pizzas.forEach(pz=>{
      p.innerHTML += `
        <div class="product">
          <b>${pz.nome}</b>
          <div class="desc">${pz.desc}</div>
          <select onchange="addPizza(this,'${pz.nome}')">
            <option value="">Escolher tamanho</option>
            ${pz.P ? `<option value="${pz.P}">P - R$ ${pz.P}</option>` : ``}
            ${pz.M ? `<option value="${pz.M}">M - R$ ${pz.M}</option>` : ``}
            ${pz.G ? `<option value="${pz.G}">G - R$ ${pz.G}</option>` : ``}
          </select>
        </div>`;
    });

    menu.appendChild(c);
    menu.appendChild(p);
  }

  /* ================= ADICIONAIS (SÓ SE EXISTIR) ================= */
  if(data.adicionais && data.adicionais.length > 0){
    const a = document.createElement("div");
    a.innerHTML = "<h2>➕ Adicionais</h2>";

    data.adicionais.forEach(ad=>{
      a.innerHTML += `
        <label>
          <input type="checkbox" value="${ad.preco}" onchange="toggleAdd(this,'${ad.nome}')">
          ${ad.nome} (+R$ ${ad.preco})
        </label><br>`;
    });

    menu.appendChild(a);
  }

  /* ================= ENTREGA ================= */
  entrega.innerHTML += `
    <option value="${data.config.entrega}">
      Entrega (+R$ ${data.config.entrega.toFixed(2)})
    </option>`;
}

/* ================= FUNÇÕES ================= */

function addItem(v,n){
  total += Number(v);
  pedido.push(n);
  atualizarTotal();
}

function addPizza(sel,n){
  if(sel.value){
    total += Number(sel.value);
    pedido.push(`Pizza ${n}`);
    sel.disabled = true;
    atualizarTotal();
  }
}

function toggleAdd(el,n){
  if(el.checked){
    total += Number(el.value);
    pedido.push(n);
  }else{
    total -= Number(el.value);
  }
  atualizarTotal();
}

function atualizarTotal(){
  total += Number(entrega.value);
  document.getElementById("total").innerText = total.toFixed(2);
}

function toggleTroco(){
  trocoDiv.style.display = pagamento.value==="Dinheiro" ? "block" : "none";
}

function enviar(){
  if(!nome.value || !endereco.value){
    alert("Preencha nome e endereço!");
    return;
  }
  if(pedido.length===0){
    alert("Adicione pelo menos um item!");
    return;
  }

  let msg = `🧾 PEDIDO DANBURGER'S%0A`;
  pedido.forEach(i=>msg+=`• ${i}%0A`);

  msg += `%0A👤 Cliente: ${nome.value}`;
  msg += `%0A📍 Endereço: ${endereco.value}`;
  msg += `%0A🚚 ${entrega.options[entrega.selectedIndex].text}`;
  msg += `%0A💳 Pagamento: ${pagamento.value}`;

  if(pagamento.value==="Dinheiro" && troco.value){
    msg += `%0A💵 Troco para: R$ ${troco.value}`;
  }

  msg += `%0A%0A💰 Total: R$ ${total.toFixed(2)}`;

  window.open(`https://wa.me/${data.config.whatsapp}?text=${msg}`);
}
