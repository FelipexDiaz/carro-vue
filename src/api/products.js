// src/api/products.js
export async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products; // devolvemos solo el array de productos
}
