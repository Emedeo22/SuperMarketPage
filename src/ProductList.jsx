// Componente para mostrar productos y agregar al carrito
import React from 'react';

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
