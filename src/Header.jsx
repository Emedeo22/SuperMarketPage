import React from 'react';

function Header({ onCartClick, cartCount }) {
  return (
    <header className="header">
       <img src="/logo.jpeg" alt="Logo" className="header-logo" />
        {/* The image path should be relative to the public folder or use a proper import statement */}
      <div className="header-titles">
        
      </div>
      <div className="header-actions">
        <button className="cart-btn" onClick={onCartClick}>
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
       
      </div>
    </header>
  );
}

export default Header;
