import { supabase } from "./supabase.js"

export async function buscarProdutos() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

export async function criarProduto(produto) {
  const { error } = await supabase
    .from("produtos")
    .insert([produto])

  if (error) {
    console.error(error)
    throw error
  }
}
