import { supabase } from "./supabase.js"

export async function buscarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)
    .order("created_at", { ascending: false })

  if (error) {
    alert("Erro ao buscar produtos")
    console.error(error)
    return []
  }

  return data
}

export async function criarProduto(produto) {
  const { error } = await supabase
    .from("produtos")
    .insert([produto])

  if (error) {
    alert("Erro ao cadastrar produto")
    console.error(error)
  }
}
