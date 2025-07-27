import { useState } from 'react'
import ProductList from './ProductList'
import Cart from './Cart'
import Header from './Header'
import './App.css'

function App() {
//categorias
 const categorias = [
    'Todas',
    'Cervezas',
    'Lácteos',
    'Carnes',
    'Verduras',
    'Huevos y Granos',
    'Aceites y Condimentos',
    'Otros'
  ];
  // Productos de ejemplo
  const productos = [
    { id: 1, name: 'Brahma', price: 1200, image: '/products/cerveza1.jpg', category: 'Cervezas' },
    { id: 2, name: 'Heineken', price: 3000, image: '/products/cerveza2.jpg', category: 'Cervezas' },
    { id: 3, name: 'Imperial Lata', price: 2500, image: '/products/ImperialLata.jpg', category: 'Cervezas' },
    { id: 4, name: 'Queso', price: 380, image: '/products/queso.jpg', category: 'Lácteos' },
    { id: 5, name: 'Arroz', price: 200, image: '/products/arroz.jpg', category: 'Huevos y Granos' },
    { id: 6, name: 'Pollo', price: 500, image: '/products/pollo.jpg', category: 'Carnes' },
    { id: 7, name: 'Carne molida', price: 650, image: '/products/carne-molida.jpg', category: 'Carnes' },
    { id: 8, name: 'Pasta', price: 180, image: '/products/pasta.jpg', category: 'Otros' },
    { id: 9, name: 'Tomate', price: 90, image: '/products/tomate.jpg', category: 'Verduras' },
    { id: 10, name: 'Cebolla', price: 70, image: '/products/cebolla.jpg', category: 'Verduras' },
    { id: 11, name: 'Pimiento', price: 120, image: '/products/pimiento.jpg', category: 'Verduras' },
    { id: 12, name: 'Lechuga', price: 50, image: '/products/lechuga.jpg', category: 'Verduras' },
    { id: 13, name: 'Zanahoria', price: 0.6, image: '/products/zanahoria.jpg', category: 'Verduras' },
    { id: 14, name: 'Papas', price: 0.8, image: '/products/papas.jpg', category: 'Verduras' },
    { id: 15, name: 'Huevos', price: 2.5, image: '/products/huevos.jpg', category: 'Huevos y Granos' },
    { id: 16, name: 'Aceite', price: 3.0, image: '/products/aceite.jpg', category: 'Aceites y Condimentos' },
    { id: 17, name: 'Azúcar', price: 1.0, image: '/products/azucar.jpg', category: 'Otros' },
    { id: 18, name: 'Sal', price: 0.3, image: '/products/sal.jpg', category: 'Aceites y Condimentos' },
    { id: 19, name: 'Harina', price: 1.4, image: '/products/harina.jpg', category: 'Otros' },
    { id: 20, name: 'Cereal', price: 2.2, image: '/products/cereal.jpg', category: 'Otros' }
  ];
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');


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
        <div className="category-bar-container" style={{display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center', margin:'1.2rem 0'}}>
        {categorias.map(cat => (
          <button
            key={cat}
            className={`category-btn${selectedCategory === cat ? ' selected' : ''}`}
            style={{
              background: selectedCategory === cat ? '#0000004e' : '#a9a9a9ff',
              color: selectedCategory === cat ? '#fff' : '#232526',
              border: 'none',
              borderRadius: 5,
              padding: '0.5rem 1.2rem',
              fontWeight: 500,
              cursor: 'pointer',
              boxShadow: selectedCategory === cat ? '0 2px 8px #2c2d2c33' : '0 1px 4px #0001',
              transition: 'all 0.2s'
            }}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Buscar productos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="banner">
        <span>¡Bienvenidos!</span>
      </div>
      <div className='banner2'>
        <span>Seleccione un producto para empezar a comprar</span>
      </div>
      <ProductList
        products={
          productos
            .filter(p =>
              (selectedCategory === 'Todas' || p.category === selectedCategory)
            )
            .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
        }
        addToCart={addToCart}
      />
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
