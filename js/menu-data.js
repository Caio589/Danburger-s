/* =========================
   DANBURGER'S - MENU DATA
   Cardápio completo do PDF
========================= */

const MENU = {

  /* ========= LINHA GOURMET ========= */
  gourmet: [
    {
      name: "Mateus",
      price: 26,
      desc: "Pão pincelado, hambúrguer de picanha 120g, bacon, cream cheese, vinagrete e molho tártaro"
    },
    {
      name: "Picanha Bacon",
      price: 25,
      desc: "Pão pincelado, hambúrguer de picanha 120g, bacon, queijo, salada e molho tártaro"
    },
    {
      name: "Picanha Top",
      price: 26,
      desc: "Pão pincelado, hambúrguer de picanha 120g, bacon, cebola, queijo, cheddar, salada e molho tártaro"
    },
    {
      name: "Duplo Costela",
      price: 26,
      desc: "Pão, 2 hambúrgueres de costela 120g, molho barbecue, queijo, cebola, salada e maionese"
    },
    {
      name: "Chapada",
      price: 26,
      desc: "Pão pincelado, hambúrguer de picanha 120g, bacon, queijo, salada e molho tártaro"
    }
  ],

  /* ========= PIZZAS SALGADAS ========= */
  pizzasSalgadas: [
    { name: "Calabresa", P: 22, M: 28, G: 35, desc: "Molho, calabresa, cebola e orégano" },
    { name: "Mussarela", P: 24, M: 31, G: 37, desc: "Molho, mussarela, tomate e orégano" },
    { name: "Portuguesa", P: 29, M: 32, G: 45, desc: "Molho, mussarela, presunto, milho, ervilha, ovo e orégano" },
    { name: "Frango Catupiry", P: 28, M: 31, G: 44, desc: "Molho, frango desfiado, catupiry e orégano" },
    { name: "Bacon", P: 29, M: 32, G: 45, desc: "Molho, mussarela, bacon e orégano" },
    { name: "Marguerita", P: 24, M: 31, G: 37, desc: "Molho, mussarela, manjericão e orégano" },
    { name: "Brócolis", P: 28, M: 32, G: 45, desc: "Molho, brócolis, mussarela, alho frito e orégano" },
    { name: "Atum", P: 29, M: 33, G: 45, desc: "Molho, atum, mussarela, cebola e orégano" },
    { name: "Toscana", P: 29, M: 33, G: 45, desc: "Molho, calabresa, queijo, cebola e orégano" },
    { name: "Toscana Bacon", P: 32, M: 36, G: 53, desc: "Molho, calabresa, queijo, bacon, cebola e orégano" }
  ],

  /* ========= PIZZAS DOCES ========= */
  pizzasDoces: [
    { name: "Romeu e Julieta", P: 40, M: 50, G: 60, desc: "Creme, goiabada e leite condensado" },
    { name: "Prestígio", P: 40, M: 50, G: 60, desc: "Chocolate ao leite, coco ralado e creme" },
    { name: "Brigadeiro", P: 40, M: 50, G: 60, desc: "Chocolate, brigadeiro, creme e leite condensado" },
    { name: "Morango", P: 7, M: 7, G: 7, desc: "Chocolate com morango" },
    { name: "Kit Kat", P: 7, M: 7, G: 7, desc: "Chocolate com Kit Kat" },
    { name: "Oreo", P: 7, M: 7, G: 7, desc: "Chocolate com Oreo" },
    { name: "Banana Nevada", P: 7, M: 7, G: 7, desc: "Chocolate branco, banana e canela" }
  ],

  /* ========= ESFIHAS SALGADAS ========= */
  esfihasSalgadas: [
    { name: "Carne", price: 3 },
    { name: "Carne com Queijo", price: 4.5 },
    { name: "Carne Seca", price: 5 },
    { name: "Calabresa", price: 4 },
    { name: "Calabresa com Queijo", price: 4 },
    { name: "Calabresa com Catupiry", price: 4 },
    { name: "Frango", price: 4 },
    { name: "Frango Catupiry", price: 4 },
    { name: "Frango com Cheddar", price: 4 },
    { name: "Queijo", price: 4 },
    { name: "Atum", price: 5 }
  ],

  /* ========= ESFIHAS DOCES ========= */
  esfihasDoces: [
    { name: "Romeu e Julieta", price: 7, desc: "Queijo e goiabada" },
    { name: "Prestígio", price: 7, desc: "Chocolate e coco ralado" },
    { name: "Brigadeiro", price: 7, desc: "Chocolate e granulado" },
    { name: "Morango", price: 7, desc: "Chocolate com morango" },
    { name: "Kit Kat", price: 7, desc: "Chocolate com Kit Kat" },
    { name: "Oreo", price: 7, desc: "Chocolate com Oreo" },
    { name: "Banana Nevada", price: 7, desc: "Chocolate branco, banana e canela" }
  ],

  /* ========= LANCHES (BASE) ========= */
  lanches: {
    hamburguer: [
      { name: "X-Burguer", price: 16, desc: "Hambúrguer artesanal, queijo e maionese" },
      { name: "X-Burguer Salada", price: 17, desc: "Hambúrguer, queijo, salada e maionese" },
      { name: "X-Burguer Egg", price: 18, desc: "Hambúrguer, queijo, ovo, salada e maionese" }
    ],
    fileMignon: [
      { name: "X-Filé Salada", price: 18, desc: "Filé mignon, queijo, salada e maionese" },
      { name: "X-Filé Bacon", price: 20, desc: "Filé mignon, queijo, bacon, salada e maionese" }
    ],
    frango: [
      { name: "X-Frango Salada", price: 18, desc: "Frango, queijo, salada e maionese" },
      { name: "X-Frango Bacon", price: 19, desc: "Frango, queijo, bacon, salada e maionese" }
    ],
    lombo: [
      { name: "X-Lombo Salada", price: 18, desc: "Lombo, queijo, salada e maionese" },
      { name: "X-Lombo Egg", price: 20, desc: "Lombo, queijo, ovo, salada e maionese" }
    ],
    picanha: [
      { name: "X-Picanha", price: 21, desc: "Hambúrguer de picanha 120g, queijo, salada e maionese" }
    ]
  },

  /* ========= ACRÉSCIMOS ========= */
  acrescimos: [
    { name: "Bacon", price: 3 },
    { name: "Ovo", price: 2 },
    { name: "Queijo", price: 3 },
    { name: "Cheddar", price: 3 },
    { name: "Calabresa", price: 3 }
  ],

  /* ========= PORÇÕES ========= */
  porcoes: [
    { name: "Filé Acebolado", price: 40 },
    { name: "Calabresa Acebolada", price: 33 },
    { name: "Frango Acebolado", price: 38 },
    { name: "Porção Mista", price: 50 },
    { name: "Batata Frita 1", price: 20 },
    { name: "Batata Frita 2", price: 25 }
  ],

  /* ========= BEBIDAS ========= */
  bebidas: [
    { name: "Skol Litrinho", price: 5 },
    { name: "Skol Lata", price: 5 },
    { name: "Brahma Lata", price: 5 },
    { name: "Corona Long Neck", price: 10 },
    { name: "Heineken Long Neck", price: 10 },
    { name: "Refrigerante Lata", price: 6 },
    { name: "Suco Copo", price: 6 },
    { name: "Suco Jarra", price: 16 }
  ]

};
