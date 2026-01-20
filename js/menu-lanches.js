/* =====================================
   DANBURGER'S - LANCHES (61 ITENS)
   Cardápio fiel ao físico
===================================== */

const MENU_LANCHES = {

  /* ===== HAMBÚRGUER ===== */
  hamburguer: [
    { name: "Americano", price: 12, desc: "Pão, ovo, presunto, queijo, salada e maionese" },
    { name: "Bauru", price: 10, desc: "Pão, presunto, queijo, tomate e orégano" },
    { name: "Misto Quente", price: 8, desc: "Pão, presunto, queijo e maionese" },
    { name: "X Burguer", price: 16, desc: "Pão, hambúrguer artesanal, queijo e maionese" },
    { name: "X Burguer Salada", price: 17, desc: "Pão, hambúrguer artesanal, queijo, salada e maionese" },
    { name: "X Burguer Egg", price: 18, desc: "Pão, hambúrguer artesanal, queijo, ovo, salada e maionese" },
    { name: "X Burguer Acebolado", price: 18, desc: "Pão, hambúrguer artesanal, queijo, cebola, salada e maionese" },
    { name: "X Burguer Bacon", price: 19, desc: "Pão, hambúrguer artesanal, queijo, bacon, salada e maionese" },
    { name: "X Burguer Calabresa", price: 18, desc: "Pão, hambúrguer artesanal, queijo, calabresa defumada, salada e maionese" },
    { name: "X Burguer Egg Bacon", price: 20, desc: "Pão, hambúrguer artesanal, queijo, ovo, bacon, salada e maionese" },
    { name: "X Tártaro 1", price: 18, desc: "Pão, hambúrguer artesanal, queijo, salada e molho tártaro" },
    { name: "X Tártaro 2", price: 20, desc: "Pão, hambúrguer artesanal, queijo, bacon, salada e molho tártaro" },
    { name: "X Tártaro 3", price: 19, desc: "Pão, hambúrguer artesanal, queijo, calabresa defumada, salada e molho tártaro" },
    { name: "X Tártaro 4", price: 20, desc: "Pão, hambúrguer artesanal, queijo, ovo, bacon, salada e molho tártaro" }
  ],

  /* ===== FILÉ MIGNON ===== */
  fileMignon: [
    { name: "X Filé Salada", price: 18, desc: "Pão, filé, queijo, salada e maionese" },
    { name: "X Filé Salada Acebolado", price: 19, desc: "Pão, filé, queijo, cebola, salada e maionese" },
    { name: "X Filé Egg Salada", price: 20, desc: "Pão, filé, queijo, ovo, salada e maionese" },
    { name: "X Filé Bacon", price: 21, desc: "Pão, filé, queijo, bacon, salada e maionese" },
    { name: "X Filé Calabresa", price: 20, desc: "Pão, filé, queijo, calabresa defumada, salada e maionese" },
    { name: "X Filé Egg Bacon", price: 22, desc: "Pão, filé, queijo, ovo, bacon, salada e maionese" },
    { name: "X Tártaro 1 (Filé)", price: 20, desc: "Pão, filé, queijo, salada e molho tártaro" },
    { name: "X Tártaro 2 (Filé)", price: 21, desc: "Pão, filé, queijo, bacon, salada e molho tártaro" },
    { name: "X Tártaro 3 (Filé)", price: 21, desc: "Pão, filé, queijo, calabresa defumada, salada e molho tártaro" },
    { name: "X Tártaro 4 (Filé)", price: 22, desc: "Pão, filé, queijo, ovo, bacon, salada e molho tártaro" }
  ],

  /* ===== FILÉ DE FRANGO ===== */
  frango: [
    { name: "X Frango Salada", price: 18, desc: "Pão, frango, queijo, salada e maionese" },
    { name: "X Frango Acebolado", price: 17, desc: "Pão, frango, queijo, cebola, salada e maionese" },
    { name: "X Frango Egg", price: 17, desc: "Pão, frango, queijo, ovo, salada e maionese" },
    { name: "X Frango Bacon", price: 19, desc: "Pão, frango, queijo, bacon, salada e maionese" },
    { name: "X Frango Calabresa", price: 19, desc: "Pão, frango, queijo, calabresa defumada, salada e maionese" },
    { name: "X Frango Egg Bacon", price: 20, desc: "Pão, frango, queijo, ovo, bacon, salada e maionese" },
    { name: "X Tártaro 1 (Frango)", price: 18, desc: "Pão, frango, queijo, salada e molho tártaro" },
    { name: "X Tártaro 2 (Frango)", price: 20, desc: "Pão, frango, queijo, bacon, salada e molho tártaro" },
    { name: "X Tártaro 3 (Frango)", price: 20, desc: "Pão, frango, queijo, calabresa defumada, salada e molho tártaro" },
    { name: "X Tártaro 4 (Frango)", price: 21, desc: "Pão, frango, queijo, ovo, bacon, salada e molho tártaro" }
  ],

  /* ===== LOMBO ===== */
  lombo: [
    { name: "X Lombo Salada", price: 17, desc: "Pão, lombo, queijo, salada e maionese" },
    { name: "X Lombo Acebolado", price: 18, desc: "Pão, lombo, queijo, cebola, salada e maionese" },
    { name: "X Lombo Egg", price: 18, desc: "Pão, lombo, queijo, ovo, salada e maionese" },
    { name: "X Lombo Bacon", price: 19, desc: "Pão, lombo, queijo, bacon, salada e maionese" },
    { name: "X Lombo Calabresa", price: 18, desc: "Pão, lombo, queijo, calabresa defumada, salada e maionese" },
    { name: "X Lombo Egg Bacon", price: 20, desc: "Pão, lombo, queijo, ovo, bacon, salada e maionese" },
    { name: "X Tártaro 1 (Lombo)", price: 19, desc: "Pão, lombo, queijo, cebola, salada e molho tártaro" },
    { name: "X Tártaro 2 (Lombo)", price: 20, desc: "Pão, lombo, queijo, bacon, salada e molho tártaro" },
    { name: "X Tártaro 3 (Lombo)", price: 19, desc: "Pão, lombo, queijo, calabresa defumada, salada e molho tártaro" },
    { name: "X Tártaro 4 (Lombo)", price: 21, desc: "Pão, lombo, queijo, ovo, bacon, salada e molho tártaro" }
  ],

  /* ===== ESPECIAIS ===== */
  especiais: [
    { name: "X Costela", price: 20, desc: "Pão, hambúrguer 120g, queijo, cebola, molho barbecue, salada e maionese" },
    { name: "Especial 1", price: 20, desc: "Pão, hambúrguer, queijo, cheddar, salada e molho tártaro" },
    { name: "Especial 2", price: 23, desc: "Pão, dois hambúrgueres, dois queijos, dois cheddars, salada e molho tártaro" },
    { name: "X Istourado", price: 27, desc: "Pão, dois hambúrgueres, queijo, ovo, bacon, presunto, salada e maionese" },
    { name: "X Picanha", price: 21, desc: "Pão, hambúrguer de picanha 120g, queijo, salada e maionese" },
    { name: "X Picanha Acebolado Egg", price: 23, desc: "Pão, hambúrguer de picanha 120g, queijo, ovo, cebola, salada e maionese" },
    { name: "X Picanha Egg Bacon", price: 26, desc: "Pão, hambúrguer de picanha 120g, queijo, ovo, bacon, salada e maionese" }
  ],

  /* ===== LANCHES NO PRATO ===== */
  prato: [
    { name: "Filé Mignon no Prato", price: 18, desc: "Filé, queijo, salada e maionese" },
    { name: "Frango no Prato", price: 18, desc: "Frango, queijo, salada e maionese" },
    { name: "Lombo no Prato", price: 18, desc: "Lombo, queijo, salada e maionese" },
    { name: "Hambúrguer no Prato", price: 17, desc: "Hambúrguer, queijo, salada e maionese" },
    { name: "Hambúrguer de Picanha no Prato", price: 18, desc: "Hambúrguer de picanha, queijo, ovo, bacon, salada e maionese" }
  ]

};
