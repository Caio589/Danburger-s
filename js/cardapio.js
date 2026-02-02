import { supabase } from "./supabase.js";

console.log("CARDAPIO INICIADO");

/* ELEMENTOS */
const lista = document.getElementById("lista-produtos");

/* START */
async function carregarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*");

  if (error) {
    console.error("Erro Supabase:", error);
    lista.innerHTML = "<p>Erro ao carregar produtos</p>";
    return;
  }

  if (!data || data.length === 0) {
    lista.innerHTML = "<p>Nenhum produto cadastrado</p>";
    return;
  }

  lista.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${p.nome}</h3>
      <p>R$ ${Number(p.preco).toFixed(2)}</p>
    `;
    lista.appendChild(div);
  });
}

carregarProdutos();
