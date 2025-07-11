const API_URL = "http://localhost:8080/api/products";

async function fetchProducts() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener productos");
  return response.json();
}

module.exports = { fetchProducts };