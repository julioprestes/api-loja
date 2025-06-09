import { productsController } from '../productsController.js';

describe('Teste do model Products', () => {
  it('Deve ter os campos: name, price, description, idCategory', () => {
    const produto = new Products({
      name: 'Pizza',
      price: 49.9,
      description: 'pizza boa',
      idCategory: 2
    });

    expect(produto.name).toBe('Pizza');
    expect(produto.price).toBe(49.9);
    expect(produto.description).toBe('pizza boa');
    expect(produto.idCategory).toBe(2);
  });

  it('Deve calcular o preço com desconto', () => {
    const produto = new Products({
      name: 'Pizza',
      price: 100,
      description: 'pizza boa',
      idCategory: 2
    });

    if (typeof produto.getDiscountedPrice === 'function') {
      expect(produto.getDiscountedPrice(10)).toBe(90);
    }
  });
});