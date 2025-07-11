//npm install --save-dev jest
//npm test
const { fetchProducts } = require('./productApi.js');

// Mock global fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'Ramo de rosas', price: 35 }]),
  })
);

describe('fetchProducts', () => {
  it('debe retornar un array de productos cuando la respuesta es exitosa', async () => {
    const productos = await fetchProducts();
    expect(Array.isArray(productos)).toBe(true);
    expect(productos[0]).toHaveProperty('id');
    expect(productos[0]).toHaveProperty('name');
    expect(productos[0]).toHaveProperty('price');
  });

  it('debe lanzar un error si la respuesta no es ok', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );
    await expect(fetchProducts()).rejects.toThrow('Error al obtener productos');
  });
});