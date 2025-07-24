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
        <img src="/logo.jpeg" alt="Logo" className="header-logo" />
        {/* The image path should be relative to the public folder or use a proper import statement */}
      </div>
    </header>
  );
}

export default Header;
