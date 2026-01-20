const data = JSON.parse(localStorage.getItem("cardapio"));
const menu = document.getElementById("menu");
let total = 0;

if(!data){
  menu.innerHTML = "Cardápio vazio. Cadastre no painel.";
}else{
  data.categorias.forEach(cat=>{
    const c = document.createElement("div");
    c.className="category";
    c.innerText=cat;

    const p = document.createElement("div");
    p.className="products";

    c.onclick=()=>p.style.display=p.style.display==="block"?"none":"block";

    data.produtos
      .filter(x=>x.categoria===cat)
      .forEach(i=>{
        p.innerHTML += `
          <div class="product">
            <b>${i.nome}</b>
            <div class="desc">${i.desc}</div>
            <div class="price">R$ ${i.preco.toFixed(2)}</div>
            <div class="qty">
              <button onclick="add(${i.preco})">Adicionar</button>
            </div>
          </div>`;
      });

    menu.appendChild(c);
    menu.appendChild(p);
  });

  tipo.innerHTML += `<option value="${data.config.entrega}">
    Entrega (+R$ ${data.config.entrega.toFixed(2)})
  </option>`;
}

function add(v){
  total += Number(v) + Number(tipo.value);
  document.getElementById("total").innerText = total.toFixed(2);
}

function enviar(){
  const w = data.config.whatsapp;
  window.open(
    `https://wa.me/${w}?text=Pedido DANBURGER'S - Total R$ ${total.toFixed(2)}`
  );
}
