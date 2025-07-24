// Componente para mostrar productos y agregar al carrito
import React from 'react';

function ProductList({ products, addToCart }) {
  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
              onError={e => e.target.style.display = 'none'}
              style={{ width: '100%', maxWidth: 200, height: 260, objectFit: 'cover', borderRadius: 10, marginBottom: 10, background: '#f3f3f3' }}
            />
          )}
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
