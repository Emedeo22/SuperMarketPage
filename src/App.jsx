import { useState } from 'react'
import ProductList from './ProductList'
import Cart from './Cart'
import Header from './Header'
import './App.css'

function App() {
//categorias
 const categorias = [
    'Promociones', // Nueva categoría para promos
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
    { id: 1, name: 'Brahma 473ml', price: 1200, image: '/products/brahamaPromo.jpg', category: 'Cervezas', promo: true },
    { id: 2, name: 'Heineken 473ml', price: 2200, image: '/products/heineken430Promo.jpg', category: 'Cervezas', promo: true },
    { id: 3, name: 'Imperial Lata 473ml', price: 1400, image: '/products/imperialLata430Promo.jpg', category: 'Cervezas', promo: true },
    { id: 4, name: 'Imperial IPA 473ml', price: 1500, image: '/products/imperialIPA430.jpg', category: 'Cervezas', promo: true },
    { id: 5, name: 'Imperial Lata 710ml', price: 2500, image: '/products/ImprerialLata710Promo.jpg', category: 'Cervezas', promo: true },
    { id: 6, name: 'Nuggets de Pollo Sadia Crocantes', price: 4200, image: '/products/nuggetsPromo.jpg', category: 'Carnes', promo: true },
    { id: 7, name: 'Milanesas De Ternera x Kg', price: 14900, image: '/products/MilanesaDeTerneraxKgPromo.jpg', category: 'Carnes', promo: true },
    { id: 8, name: 'Milanesa De Pollo x Kg', price: 14900, image: '/products/MilanesaDePolloxKgPromo.jpg', category: 'Carnes', promo: true },
    { id: 9, name: 'Quilmes 710ml', price: 2500, image: '/products/quilmes710Promo.jpg', category: 'Cervezas', promo: true },
    { id: 10, name: 'Matambre de Ternera x Kg', price: 14900, image: '/products/MatambreDeTerneraxKgPromo.jpg', category: 'Verduras', promo: true },
    { id: 11, name: 'Lomo De Ternera x Kg', price: 19900, image: '/products/LomoDeTerneraxKgPromo.jpg', category: 'Verduras', promo: true },
    { id: 12, name: '4 Panes de hamburguesas Artesanales, 4 medallones de carne ', price: 7000, image: '/products/PromoHambur.jpg', category: 'Otros', promo: true },
    { id: 13, name: 'Zanahoria', price: 0.6, image: '/products/zanahoria.jpg', category: 'Verduras' },
    { id: 14, name: 'Papas', price: 0.8, image: '/products/papas.jpg', category: 'Verduras' },
    { id: 15, name: 'Maple de Huevos', price: 6500, image: '/products/HuevoPromo.jpg', category: 'Huevos y Granos', promo: true },
    { id: 16, name: 'Aceite', price: 3.0, image: '/products/aceite.jpg', category: 'Aceites y Condimentos' },
    { id: 17, name: 'Azúcar', price: 1.0, image: '/products/azucar.jpg', category: 'Otros' },
    { id: 18, name: 'Sal', price: 0.3, image: '/products/sal.jpg', category: 'Aceites y Condimentos' },
    { id: 19, name: 'Harina Cañuelas', price: 800, image: '/products/harinaCañuelasPromo.jpg', category: 'Otros', promo: true },
    { id: 20, name: 'Cereal', price: 2.2, image: '/products/cereal.jpg', category: 'Otros' }
  ];
  // El carrito ahora almacena productos con cantidad
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');


  // Agregar producto al carrito, incrementando cantidad si ya existe
  const addToCart = (product) => {
    setCart(prevCart => {
      const idx = prevCart.findIndex(p => p.id === product.id);
      if (idx !== -1) {
        // Si ya está, incrementar cantidad
        const updated = [...prevCart];
        updated[idx] = { ...updated[idx], cantidad: (updated[idx].cantidad || 1) + 1 };
        return updated;
      } else {
        // Si no está, agregar con cantidad 1
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };

  // Decrementar cantidad o eliminar producto
  const decrementFromCart = (productId) => {
    setCart(prevCart => {
      const idx = prevCart.findIndex(p => p.id === productId);
      if (idx !== -1) {
        const updated = [...prevCart];
        if ((updated[idx].cantidad || 1) > 1) {
          updated[idx] = { ...updated[idx], cantidad: updated[idx].cantidad - 1 };
          return updated;
        } else {
          // Si la cantidad es 1, eliminar
          updated.splice(idx, 1);
          return updated;
        }
      }
      return prevCart;
    });
  };

  // Eliminar producto completamente
  const removeFromCart = (idx) => setCart(cart.filter((_, i) => i !== idx));

  const handleSendClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Lista de compra en formato de lista
    const items = cart.map(item => `• ${item.name} x${item.cantidad || 1} ($${(item.price * (item.cantidad || 1)).toFixed(2)})`).join('%0A');
    const total = cart.reduce((sum, item) => sum + item.price * (item.cantidad || 1), 0).toFixed(2);
    const whatsappNumber = '5492942532819';
    // Codificar el mensaje para URL
    const message = encodeURIComponent(`¡Hola! Quiero comprar:\n\nLista de compra:\n${items}\n\nTotal: $${total}\n\nDatos del comprador:\nNombre: ${buyerName}\nDirección: ${buyerAddress}`);
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
    setShowForm(false);
    setBuyerName('');
    setBuyerAddress('');
  };

  // Filtrado de productos
  const productosFiltrados = productos
    .filter(producto => {
      // Si la categoría seleccionada es "Promociones", mostrar solo productos en promo
      if (selectedCategory === 'Promociones') return producto.promo === true;
      // Si es otra categoría, mostrar productos de esa categoría
      if (selectedCategory && selectedCategory !== 'Todas') return producto.category === selectedCategory;
      // Si es "Todas" o no hay categoría seleccionada, mostrar solo promociones
      return producto.promo === true;
    })
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

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
      <Analytics/>
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
        products={productosFiltrados}
        addToCart={addToCart}
      />
      {showCart && (
        <div className="modal-backdrop" onClick={() => setShowCart(false)} role="dialog" aria-modal="true" aria-label="Carrito de compras" tabIndex={-1}>
          <div
            className="modal-cart"
            onClick={e => e.stopPropagation()}
            style={{
              maxHeight: '90vh',
              width: '100%',
              maxWidth: 400,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: '#fff',
              borderRadius: 12,
              boxShadow: '0 4px 24px #0003',
              outline: 'none',
            }}
            tabIndex={0}
            aria-labelledby="cart-title"
          >
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: 8 }}>
              <h3 id="cart-title" style={{marginBottom: '1rem', fontSize: '1.3rem', color: '#232526'}}>Carrito</h3>
              {cart.length === 0 ? <div>El carrito está vacío</div> : (
                <ul style={{padding:0, margin:0, listStyle:'none'}}>
                  {cart.map((item, idx) => (
                    <li key={item.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8, borderBottom:'1px solid #eee', paddingBottom:4}}>
                      <span style={{flex:1, fontWeight:500, color:'#232526'}}>{item.name}</span>
                      <span style={{margin:'0 8px', fontWeight:500}}>x{item.cantidad || 1}</span>
                      <span style={{fontWeight:500, color:'#c60000ff'}}>${(item.price * (item.cantidad || 1)).toFixed(2)}</span>
                      <button
                        style={{marginLeft:8, padding:'2px 8px', background:'#252424ff', color:'#fff', border:'1px solid #bbb', borderRadius:4, cursor:'pointer'}}
                        aria-label={`Quitar una unidad de ${item.name}`}
                        tabIndex={0}
                        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && decrementFromCart(item.id)}
                        onClick={() => decrementFromCart(item.id)}
                      >-</button>
                      <button
                        style={{marginLeft:4, padding:'2px 8px', background:'#252424ff', color:'#fff', border:'1px solid #bbb', borderRadius:4, cursor:'pointer'}}
                        aria-label={`Agregar una unidad de ${item.name}`}
                        tabIndex={0}
                        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && addToCart(item)}
                        onClick={() => addToCart(item)}
                      >+</button>
                      <button
                        style={{marginLeft:4, padding:'2px 8px', color:'#fff', background:'#d00', border:'none', borderRadius:4, cursor:'pointer'}}
                        aria-label={`Eliminar ${item.name} del carrito`}
                        tabIndex={0}
                        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && removeFromCart(idx)}
                        onClick={() => removeFromCart(idx)}
                      >x</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '8px 0', boxShadow: '0 -2px 8px #0001', zIndex: 2 }}>
              <div style={{marginBottom:8, fontWeight:700, color:'#232526'}}>Total: ${cart.reduce((sum, item) => sum + item.price * (item.cantidad || 1), 0).toFixed(2)}</div>
              <button
                className="close-modal"
                style={{width: '100%', marginTop: 0, background:'#006915ff', color:'#fff', fontWeight:600, fontSize:'1rem', borderRadius:8, border:'none', padding:'0.7rem 0', outline:'none'}}
                onClick={handleSendClick}
                aria-label="Enviar pedido por WhatsApp"
                tabIndex={0}
              >Enviar pedido por WhatsApp</button>
              <button
                className="close-modal"
                style={{width: '100%', marginTop: 8, background: '#232526', color: '#fff', fontWeight:600, fontSize:'1rem', borderRadius:8, border:'none', padding:'0.7rem 0', outline:'none'}}
                onClick={() => setShowCart(false)}
                aria-label="Cerrar carrito"
                tabIndex={0}
              >Cerrar</button>
            </div>
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
