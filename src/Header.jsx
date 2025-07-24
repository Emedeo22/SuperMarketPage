import React from 'react';

function Header({ onCartClick, cartCount }) {
  return (
    <header className="header">
      <div className="header-titles">
        <h1>Super Market</h1>
        <h2>Mini Market</h2>
      </div>
      <div className="header-actions">
        <button className="cart-btn" onClick={onCartClick}>
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <img src="/src/assets/img/logo.jpg" alt="Logo" className="header-logo" />
      </div>
    </header>
  );
}

export default Header;
