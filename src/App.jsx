import { useState } from 'react'
import ProductList from './ProductList'
import Cart from './Cart'
import Header from './Header'
import './App.css'

function App() {
  // Productos de ejemplo
  const productos = [
    { id: 1, name: 'Manzana', price: 1.5 },
    { id: 2, name: 'Leche', price: 2.3 },
    { id: 3, name: 'Pan', price: 1.1 },
    { id: 4, name: 'Queso', price: 3.8 },
    { id: 5, name: 'Arroz', price: 2.0 },
  ];
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (idx) => setCart(cart.filter((_, i) => i !== idx));

  const handleSendClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Lista de compra en formato de lista
    const items = cart.map(item => `• ${item.name} ($${item.price.toFixed(2)})`).join('%0A');
    const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
    const whatsappNumber = '5492942532819';
    // Codificar el mensaje para URL
    const message = encodeURIComponent(`¡Hola! Quiero comprar:\n\nLista de compra:\n${items}\n\nTotal: $${total}\n\nDatos del comprador:\nNombre: ${buyerName}\nDirección: ${buyerAddress}`);
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
    setShowForm(false);
    setBuyerName('');
    setBuyerAddress('');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 0 }}>
      <Header onCartClick={() => setShowCart(true)} cartCount={cart.length} />
      <div className="banner">
        <span>¡Bienvenidos!</span>
      </div>
      <div className='banner2'>
        <span>Seleccione un producto para empezar a comprar</span>
      </div>
      <ProductList products={productos} addToCart={addToCart} />
      {showCart && (
        <div className="modal-backdrop" onClick={() => setShowCart(false)}>
          <div className="modal-cart" onClick={e => e.stopPropagation()}>
            <Cart cart={cart} removeFromCart={removeFromCart} sendCartToWhatsApp={handleSendClick} />
            <button className="close-modal" onClick={() => setShowCart(false)}>Cerrar</button>
          </div>
        </div>
      )}
      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <form className="modal-cart" onClick={e => e.stopPropagation()} onSubmit={handleFormSubmit}>
            <h3 style={{marginBottom: '1rem'}}>Completa tus datos para el pedido</h3>
            <input
              type="text"
              placeholder="Nombre completo"
              value={buyerName}
              onChange={e => setBuyerName(e.target.value)}
              required
              style={{marginBottom: '1rem', width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #333'}}
            />
            <input
              type="text"
              placeholder="Dirección de entrega"
              value={buyerAddress}
              onChange={e => setBuyerAddress(e.target.value)}
              required
              style={{marginBottom: '1rem', width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #333'}}
            />
            <button type="submit" className="close-modal" style={{width: '100%', marginTop: 0}}>Enviar pedido por WhatsApp</button>
            <button type="button" className="close-modal" style={{width: '100%', marginTop: 8, background: '#232526', color: '#fff'}} onClick={() => setShowForm(false)}>Cancelar</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App
