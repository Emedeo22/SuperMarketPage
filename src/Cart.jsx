// Componente para mostrar el carrito y enviar por WhatsApp
import React from 'react';

function Cart({ cart, removeFromCart, sendCartToWhatsApp }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ marginTop: 32 }}>
      <h2>Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, idx) => (
            <li key={idx}>
              <span>{item.name} - ${item.price.toFixed(2)}</span>
              <button onClick={() => removeFromCart(idx)}>Quitar</button>
            </li>
          ))}
        </ul>
      )}
      <p><b>Total: ${total.toFixed(2)}</b></p>
      <button onClick={sendCartToWhatsApp} disabled={cart.length === 0}>
        Enviar carrito por WhatsApp
      </button>
    </div>
  );
}

export default Cart;
