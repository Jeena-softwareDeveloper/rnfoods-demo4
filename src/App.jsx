import React, { useState, useEffect } from 'react'
import { 
  Search, 
  ShoppingBag, 
  User, 
  ArrowRight, 
  Plus, 
  Minus,
  Star, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  Leaf, 
  FlaskConical, 
  HeartPulse, 
  Menu,
  Share2,
  Mail,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Info,
  Truck,
  RotateCcw,
  ShieldCheck,
  Zap,
  Dna
} from 'lucide-react'

// Custom Toast Component
const Toast = ({ message, onClose }) => (
  <div className="fixed bottom-6 right-4 left-4 md:left-auto md:right-8 z-[200] bg-primary text-on-primary px-6 md:px-10 py-4 rounded-2xl shadow-2xl animate-fade-in-up flex items-center justify-between gap-2 md:gap-4 backdrop-blur-xl border border-white/20">
    <div className="flex items-center gap-3">
      <Sparkles className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
      <span className="font-bold text-xs md:text-base leading-tight uppercase">{message}</span>
    </div>
    <button onClick={onClose} className="opacity-50 hover:opacity-100 transition-opacity"><X size={16} /></button>
  </div>
);

const Navbar = ({ onAction, cartCount, openCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-surface-container py-1 transition-all">
      <div className="flex justify-between items-center px-4 md:px-8 py-3.5 max-w-7xl mx-auto relative text-left">
        <div className="flex items-center gap-3 md:gap-6">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-primary p-1 active:scale-95 transition-transform hover:bg-black/5 rounded-full transition-all">
            <Menu className="w-6 h-6" />
          </button>
          <a className="text-xl md:text-2xl font-bold text-[#b70049] hover:scale-105 transition-transform" href="/" onClick={(e) => { e.preventDefault(); onAction('Home'); }}>
            R.N. Foods
          </a>
          <div className="hidden lg:flex items-center space-x-10">
            {['Shop All', 'Best Sellers', 'The Lab', 'Sustainability'].map(item => (
              <a key={item} className="text-[#4a2134] hover:text-[#b70049] transition-all font-bold text-[10px] uppercase relative group" href="#" onClick={(e) => { e.preventDefault(); onAction(item); }}>
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 md:space-x-5">
          <div className="relative hidden sm:block">
             <div className="bg-surface-container-highest rounded-full px-5 py-2 flex items-center gap-3 group focus-within:ring-2 ring-primary/20 transition-all border border-transparent">
                <Search className="text-secondary w-4 h-4" />
                <input className="bg-transparent border-none text-xs w-28 md:w-36 font-bold placeholder:text-on-surface-variant outline-none uppercase" placeholder="Search rituals..." type="text" />
             </div>
          </div>
          <button onClick={() => onAction('Account')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all text-[#4a2134]">
            <User className="w-5 h-5" />
          </button>
          <button onClick={openCart} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all text-[#4a2134] relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0 -right-0 bg-primary text-on-primary text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold animate-bounce shadow-lg ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className={`lg:hidden bg-white/95 backdrop-blur-xl transition-all duration-500 overflow-hidden border-b border-surface-container h-screen mt-0 ${isMenuOpen ? 'max-h-[100vh] opacity-100 shadow-xl' : 'max-h-0 opacity-0'}`}>
        <div className="px-5 py-8 md:py-6 md:py-10 flex flex-col gap-4 md:gap-6 font-bold text-3xl text-left uppercase text-[#4a2134]/50">
          {['Shop All', 'Best Sellers', 'The Lab', 'Sustainability'].map(item => (
            <a key={item} href="#" onClick={(e) => { e.preventDefault(); onAction(item); setIsMenuOpen(false); }} className="hover:text-[#b70049] hover:translate-x-4 transition-all">{item}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}

const QuickViewModal = ({ product, isOpen, onClose, addToCart, setIsCartOpen, showToast }) => {
  if (!product) return null;

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[150] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 md:top-1/2 left-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[95%] max-w-5xl h-full md:h-auto md:max-h-[90vh] bg-surface-bright md:rounded-[2.5rem] z-[160] shadow-4xl overflow-hidden transition-all duration-500 transform ${isOpen ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full md:translate-y-[-45%] scale-100 md:scale-95 opacity-0 pointer-events-none'} flex flex-col`}>
        
        {/* Mobile Header (Meesho Style) */}
        <div className="md:hidden flex items-center justify-between p-3 md:p-4 bg-white border-b border-black/5 sticky top-0 z-50 h-14">
           <button onClick={onClose} className="p-3 hover:bg-black/5 rounded-full transition-colors active:scale-90 text-on-surface flex items-center justify-center font-bold"><ChevronLeft size={28} /></button>
           <h3 className="text-[10px] font-bold uppercase truncate px-4 flex-grow text-center">{product.name}</h3>
           <div className="flex gap-2 md:gap-4">
              <button onClick={() => showToast('Link Copied!')} className="p-2 hover:bg-black/5 rounded-full outline-none"><Share2 size={20} className="text-on-surface-variant" /></button>
              <button onClick={() => { onClose(); setIsCartOpen(true); }} className="p-2 hover:bg-black/5 rounded-full outline-none"><ShoppingBag size={20} className="text-on-surface-variant" /></button>
           </div>
        </div>

        <div className="flex-grow overflow-y-auto flex flex-col md:flex-row pb-20 md:pb-12 scrollbar-hide bg-[#f0f1f4] md:bg-white text-left">
          {/* Aesthetic Imagery */}
          <div className="w-full md:w-1/2 h-[450px] md:h-auto relative bg-white flex-none overflow-hidden">
            <img src={product.img || product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 border border-white/40 shadow-sm">
                <Leaf size={14} className="text-primary" />
                <span className="text-[10px] font-bold uppercase">Community Approved</span>
            </div>
            <button onClick={onClose} className="hidden md:flex absolute top-6 right-6 w-11 h-11 bg-white hover:bg-primary hover:text-white rounded-full items-center justify-center transition-all shadow-xl group"><X size={24} className="group-hover:rotate-90 transition-transform"/></button>
          </div>

          {/* Detailed Info Section */}
          <div className="w-full md:w-1/2 flex flex-col pt-3 md:p-6 space-y-2 md:space-y-3">
             
             {/* Brand & Price Header */}
             <div className="bg-white p-6 md:p-0 md:bg-transparent shadow-sm md:shadow-none">
                <div className="flex justify-between items-start mb-2 md:mb-4">
                   <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-secondary uppercase border-l-2 border-secondary pl-4">The Ritual Series</p>
                      <h2 className="text-3xl md:text-5xl font-bold text-on-surface uppercase leading-none">{product.name}</h2>
                   </div>
                   <button onClick={() => showToast('Link Copied!')} className="hidden md:block p-3 hover:bg-black/5 rounded-full transition-all outline-none"><Share2 size={20}/></button>
                </div>
                
                <div className="flex items-center gap-3 md:gap-5 mb-4 md:mb-4 md:mb-8">
                   <div className="flex flex-col">
                      <div className="flex items-baseline gap-2 md:gap-4">
                        <span className="text-4xl md:text-6xl font-bold text-primary leading-none">${product.price}</span>
                        {product.oldPrice && (
                          <div className="flex items-center gap-3">
                             <span className="text-base md:text-2xl text-on-surface-variant line-through opacity-25 font-bold leading-none">${product.oldPrice}</span>
                             <span className="bg-[#25a541]/10 text-[#25a541] px-3 py-1 rounded-lg font-bold text-[10px] md:text-sm uppercase">
                               {Math.round((1 - product.price/product.oldPrice) * 100)}% RELIEF
                             </span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-4 bg-tertiary-container/30 w-fit px-4 py-1.5 rounded-full border border-tertiary-fixed/10 shadow-inner">
                         <Star size={16} className="fill-tertiary-fixed text-tertiary-fixed" />
                         <span className="text-xs font-bold text-on-surface uppercase">{product.rating || '4.9'} <span className="opacity-30 ml-2 font-bold">{product.reviews || '840'} Ritual Logs</span></span>
                      </div>
                   </div>
                </div>

                <div className="flex items-center gap-3 bg-[#eaf7ed] px-4 py-2.5 rounded-2xl w-fit border border-[#25a541]/10 shadow-sm">
                   <Truck size={18} className="text-[#25a541]" />
                   <span className="text-[10px] font-bold uppercase text-[#25a541]">Ritual Delivery: AT NO COST</span>
                </div>
             </div>

             {/* Volume/Size Selection */}
             <div className="bg-white p-6 md:p-6 shadow-sm md:shadow-none text-left">
                <h4 className="text-[10px] font-bold text-on-surface-variant uppercase mb-4 md:mb-6">Ceremonial Dose</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                   {['500g Trial', '1kg Daily', '2.5kg Pantry', '5kg Ritual'].map(v => (
                     <button key={v} className={`py-4 rounded-2xl font-bold text-[10px] uppercase border-2 transition-all ${v.includes('1kg') ? 'border-primary bg-primary/5 text-primary shadow-xl ring-4 ring-primary/5' : 'border-black/5 text-on-surface/30 hover:border-black/20'}`}>
                       {v}
                     </button>
                   ))}
                </div>
             </div>

             {/* Botanical Specs */}
             <div className="bg-white p-6 md:p-6 shadow-sm md:shadow-none flex-grow">
                <div className="flex items-center justify-between mb-4 md:mb-4 md:mb-8 group cursor-pointer border-b border-black/5 pb-4">
                   <h4 className="text-xs font-bold uppercase text-primary">Nourishment Data</h4>
                   <ChevronRight size={24} className="text-on-surface-variant group-hover:translate-x-2 transition-transform" />
                </div>
                <div className="space-y-2 md:space-y-6">
                   {[
                     { l:"Origin", v:"Regenerative Community Farm", i: <Leaf size={16} className="text-primary"/> },
                     { l:"Extraction", v:"Ancestral Stone-Ground", i: <Zap size={16} className="text-[#ffb400]"/> },
                     { l:"Purity", v:"100% Bio-Active Grain", i: <ShieldCheck size={16} className="text-secondary"/> },
                     { l:"Sustainability", v:"Plastic-Free Compostable", i: <HeartPulse size={16} className="text-primary-fixed"/> }
                   ].map(d => (
                     <div key={d.l} className="flex items-center gap-3 md:gap-6 text-xs font-bold border-b border-black/5 pb-4">
                        <div className="w-10 h-10 rounded-2xl bg-surface-container-low flex items-center justify-center shrink-0 shadow-inner">{d.i}</div>
                        <div className="flex flex-col">
                           <span className="text-[9px] text-on-surface-variant uppercase opacity-40 mb-1">{d.l}</span>
                           <span className="text-on-surface uppercase">{d.v}</span>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-12 p-4 md:p-6 bg-[#f8f8f8] rounded-[2rem] border border-black/5 relative overflow-hidden group">
                   <Sparkles size={40} className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-150 transition-transform duration-1000" />
                   <p className="text-xs font-bold text-on-surface-variant leading-relaxed opacity-60 uppercase">"Every grain is a commitment to communal health. We partner directly with small-scale farmers to ensure you receive the most vibrant, energy-dense harvest possible."
                   </p>
                </div>
             </div>

             {/* Trust Markers */}
             <div className="bg-white p-6 md:p-6 shadow-sm md:shadow-none grid grid-cols-2 gap-2 md:gap-4">
                <div className="p-3 md:p-6 bg-primary/5 rounded-3xl border border-primary/10 flex gap-2 md:gap-4 items-center group cursor-pointer hover:bg-primary/10 transition-all">
                   <RotateCcw size={24} className="text-primary group-hover:rotate-[-45deg] transition-transform" />
                   <div className="text-left">
                      <div className="text-[10px] font-bold uppercase leading-none mb-1.5">7 Day Grace</div>
                      <div className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase">Community Swap</div>
                   </div>
                </div>
                <div className="p-3 md:p-6 bg-secondary/5 rounded-3xl border border-secondary/10 flex gap-2 md:gap-4 items-center group cursor-pointer hover:bg-secondary/10 transition-all">
                   <Dna size={24} className="text-secondary group-hover:scale-110 transition-transform" />
                   <div className="text-left">
                      <div className="text-[10px] font-bold uppercase leading-none mb-1.5">Alpha Batch</div>
                      <div className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase">Verified Genetic</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 bg-white/95 backdrop-blur-2xl border-t border-black/10 flex gap-3 md:gap-5 z-40 shadow-4xl-up">
           <button 
             onClick={() => addToCart(product)}
             className="flex-1 py-5 md:py-7 border-2 border-primary text-primary font-bold rounded-3xl uppercase text-[10px] md:text-sm flex items-center justify-center gap-2 md:gap-4 hover:bg-primary/5 active:scale-95 transition-all shadow-xl"
           >
              Add to Ritual <ShoppingBag className="w-6 h-6" />
           </button>
           <button 
             onClick={() => { addToCart(product); alert('Initiating Communal Checkout...'); }}
             className="flex-[1.3] py-5 md:py-7 bg-primary text-on-primary font-bold rounded-3xl uppercase text-[10px] md:text-sm flex items-center justify-center gap-2 md:gap-4 shadow-3xl shadow-primary/40 hover:brightness-110 active:scale-95 transition-all text-center"
           >
              Complete Order <ArrowRight className="w-6 h-6" />
           </button>
        </div>
      </div>
    </>
  );
};

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);

  return (
    <div className={`fixed inset-0 z-[210] transition-all duration-500 ${isOpen ? 'visible' : 'invisible'}`}>
      <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[450px] bg-white text-on-surface shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 md:p-6 flex justify-between items-center border-b border-surface-container bg-white/50 backdrop-blur-xl">
          <div className="flex items-center gap-2 md:gap-4">
            <ShoppingBag className="w-7 h-7 text-primary" />
            <h2 className="text-2xl font-bold uppercase">Ritual Bag</h2>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} UNITS
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full transition-all active:scale-90"><X size={24} /></button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 md:p-6 scrollbar-hide space-y-3 md:space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 opacity-30">
              <Leaf size={100} strokeWidth={0.5} className="animate-bounce" />
              <p className="font-bold text-xl uppercase">Bag is Empty</p>
              <button onClick={onClose} className="text-primary font-bold uppercase text-xs border-b-2 border-primary pb-1">Start Your Ritual</button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 md:gap-6 group animate-fade-in-up border-b border-black/5 pb-8 last:border-0 relative">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-surface-container rounded-3xl overflow-hidden shrink-0 shadow-lg border border-primary/5">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={item.img || item.image} alt={item.name} />
                </div>
                <div className="flex-grow text-left flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-sm md:text-base leading-tight uppercase line-clamp-2 pr-6">{item.name}</h4>
                      <button onClick={() => removeFromCart(item.name)} className="text-on-surface-variant hover:text-red-500 p-1.5 transition-all active:scale-90 absolute right-0 top-1"><Trash2 size={16} /></button>
                    </div>
                    <p className="text-secondary font-bold text-xs md:text-sm uppercase opacity-60">${item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center bg-surface-container-highest rounded-2xl p-1.5 border border-primary/5 ring-1 ring-black/5 text-on-surface">
                      <button onClick={() => updateQuantity(item.name, -1)} className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-xl transition-all active:scale-90"><Minus size={14} /></button>
                      <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.name, 1)} className="w-9 h-9 flex items-center justify-center hover:bg-white rounded-xl transition-all active:scale-90"><Plus size={14} /></button>
                    </div>
                    <p className="font-bold text-base md:text-lg text-on-surface">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 md:p-8 bg-surface-container-highest/30 border-t border-surface-container shadow-2xl-up">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <span className="font-bold text-xs md:text-sm uppercase opacity-40">Subtotal</span>
              <span className="text-3xl md:text-4xl font-bold text-primary">${total}</span>
            </div>
            <button 
              onClick={() => alert('Proceeding to Checkout...')}
              className="w-full bg-primary text-on-primary py-4 md:py-6 rounded-3xl font-bold text-base uppercase shadow-3xl shadow-primary/40 hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2 md:gap-4"
            >
              Secure Checkout <ArrowRight size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (isCartOpen || selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isCartOpen, selectedProduct]);

  const showToast = (message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleAction = (action) => {
    showToast(`${action} logic soon`);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => 
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added to ritual bag`);
  };

  const updateQuantity = (name, delta) => {
    setCart(prev => prev.map(item => {
      if (item.name === name) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (name) => {
    setCart(prev => prev.filter(item => item.name !== name));
    showToast(`Removed from bag`);
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen selection:bg-primary selection:text-on-primary flex flex-col text-left">
      <Navbar onAction={handleAction} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} openCart={() => setIsCartOpen(true)} />

      <QuickViewModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        addToCart={addToCart}
        setIsCartOpen={setIsCartOpen}
        showToast={showToast}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />

      <main className="pt-16 md:pt-20 flex-grow">
        {/* Community Hero */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-4 md:mb-8 md:mb-4 md:mb-8">
          <div className="relative h-[550px] md:h-[650px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl">
            <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtU3-_rhsTCksNFF99TWdHh_BhsfcVQleNqXQMrWA3u1iDyPN4XUwMLUBwBPS5E6sV6ID0dssNw448enMUP9rMV5uR_FAl3fvCKDwItR6EKDm1zZ-YrZmQc21OOXOz0dShsXAy7xJYCRr48c1QnnEH8qmaSQTXzkzq97IWP3cWY8YVVpPsEpS1BFA4F0St-vNcS2kvAinzRSgZ0B1EJB6QSXqLgqGO7K-SF-ty8Zu_RqY9jiSdwZ2k12tDZMw_rM3dHmV5b9hXFA9x" alt="Community Lifestyle" />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/30 to-transparent"></div>
            <div className="absolute bottom-10 left-6 md:bottom-16 md:left-16 right-6 max-w-2xl text-left">
              <div className="inline-block bg-secondary-container text-on-secondary px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold mb-3 md:mb-5 uppercase shadow-lg backdrop-blur-md">The Daily Ritual</div>
              <h1 className="text-white text-5xl md:text-8xl font-bold mb-6 md:mb-4 md:mb-8 leading-[0.9] uppercase">Grains That <br />Connect Us.</h1>
              <p className="text-white/90 text-sm md:text-xl mb-8 md:mb-4 md:mb-8 max-w-lg font-bold leading-relaxed opacity-90 uppercase">Discover the stories behind the harvest and the morning rituals of our community. Real food, real people, vibrant energy.</p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                <button 
                  onClick={() => handleAction('Explore Stories')}
                  className="bg-primary text-on-primary px-10 py-4.5 rounded-full text-xs md:text-sm font-bold shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all uppercase"
                >
                  Explore Stories
                </button>
                <button 
                  onClick={() => handleAction('Shop Rituals')}
                  className="bg-white/20 backdrop-blur-xl text-white border border-white/30 px-10 py-4.5 rounded-full text-xs md:text-sm font-bold hover:bg-white/30 active:scale-95 transition-all uppercase"
                >
                  Shop Rituals
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pick Up Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-4 md:mb-8">
          <h3 className="text-2xl font-bold text-on-surface mb-8 md:mb-4 md:mb-8 opacity-50 uppercase text-left">Your Recent Gathers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-6">
             {[
               { name:"Black Lentils", price:"12.00", img:"https://lh3.googleusercontent.com/aida-public/AB6AXuAhyV_MtgSBLzj4iAc5venYCo80kXAPDvfgsJxNVvPUJn-GjuV2DnB5cCsotoEgEEfUachVa-itIup3mi7UsvKk06itiqpIJxsubvqCJzU9BQlBh20vUiUCGoQNm1CrcKqypc3baanWZ-P1tMSHalPgxeLzHgfduKY9ioxqLfngDTXXlwcFIzJJsIZsUkH3SMn4xnAKKie0PWCka9tgxzNXuqABMelJGd1FYRMM3DjrHDI9rRTw9SqCPvuiuE8mrNHQ5OV4G-d8m124" },
               { name:"Heritage Wheat", price:"19.00", img:"https://lh3.googleusercontent.com/aida-public/AB6AXuCd9sIzJLiqwcoM6PGl2DBlXy6k7WbfxPd8REFSZpKNDRYnJi-gz98KyjP-bpO_CCz1L1xDBIJwnZwuVH5SZTzvGsvCeq4pTV72UYxc2xzpVg0JF398vOMr4hSZZb1_qijel4D3Jiu70q5CfRcwTM0D1iRPHxfsqVnccCHWTWneJrEe-LwEwAhbzAkdyB5f25SXBStLkYmKe2zyEt64oZyPfAEyMOU7VnX854peuV137nOwcByR48Uk_aIt-rcFNotV4iOym7ULrlBQ" },
               { name:"Botanist Mix", price:"26.00", img:"https://lh3.googleusercontent.com/aida-public/AB6AXuC51tG6GUNY-yhBNi3zD9s5wYzbcHJilMzwOLWX7AG-Lw83gvVrYRyvM7Oasz6djaFyusSOjqRnzEpV7afvhXK_VSUucbuC2SqfxX4yy0NBzpOE0QyGYNOlM7_XHSXZwPO7L2B7lCxZE8RI5PDJ9uxoCllG2zroIDaI8rWA1dfVticD1YSiE1W_vicSpBEtS5sTgHOBZ2Jie-IhZTBjhUULuAIguZXFwR_41_b1z63sVwzJQFJ1N0iZ5Az5D5zmIEuIBQ-OcTapvOyA" },
               { name:"Golden Amaranth", price:"18.00", img:"https://lh3.googleusercontent.com/aida-public/AB6AXuAY0kVQz8tnd4pIczDoHW4PqICXgppNTF7EVJQMdNwY-UkdXSNNhvN4fKLKVETx8Dg3coGJ2SRLi9DWQdKEUyC03Pb-9UvCAuML19hwrKfH4siz9jM43-FJUMc9zmWYWcGSQkKULyOgWxi57GP5AEHzW_2ZlRFjCvBSgUD9NsDOtQxO5EHRKYYhipqYo3vdZoE-rZqJGaBvb9f1m-D4SmwrUREKvkrlBsZWZcLl8_9i3nCzq8CeogwDn4-rpaoWTf2GuPxywns7yvTe" }
             ].map((p, idx) => (
               <div key={idx} onClick={() => setSelectedProduct(p)} className="flex flex-col group cursor-pointer animate-fade-in-up">
                  <div className="relative aspect-square bg-surface-variant rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-2 md:mb-4 shadow-sm group-hover:shadow-2xl transition-all border border-black/5">
                    <img className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" src={p.img} alt={p.name} />
                  </div>
                  <div className="px-2">
                    <div className="text-sm md:text-base font-bold text-on-surface group-hover:text-primary transition-colors leading-tight uppercase">{p.name}</div>
                    <div className="text-xs font-bold text-primary mt-1">${p.price}</div>
                  </div>
               </div>
             ))}
          </div>
        </section>

        {/* Carousel Section */}
        <section className="bg-surface-container-low py-8 md:py-12 mb-8 md:mb-4 md:mb-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex justify-between items-end mb-4 md:mb-8 md:mb-4 md:mb-8 text-left">
              <h2 className="text-4xl md:text-6xl font-bold text-on-surface leading-none uppercase">Trending Rituals</h2>
              <div className="flex gap-2 md:gap-4">
                <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all active:scale-90 group text-primary">
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all active:scale-90 group text-primary">
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <div className="flex overflow-x-auto gap-8 md:gap-6 scrollbar-hide pb-10 snap-x -mx-4 px-4 md:mx-0 md:px-0">
              {[
                { name:"Obsidian Wild Rice", price:"24.00", rating:"4.9", tag:"Bestseller", desc:"Smoky, earthy, high protein", img:"https://lh3.googleusercontent.com/aida-public/AB6AXuD6ZnD1y1t7TLIVuX_uTzBYKWdKqPeA5v3f5r13IkFQO9oG5DAJd29Z266lo69ot_vIrIanC_1HR1S2TELw-sSxoRU-A-Byy6qnEiKhb4bn3RALsIXH31hMkDGSRAUHpoJE4q-GxuWM2wGiZ8vGU145BY6F7qWRKhqFJE5WO91-cNsEFivXYA5tX-sC1QtqEKb8glOQ3B_hdF2O7-fSOI0CrqCBY4s6dIndGqfBgWWK1m-yc1XpC6_kR0reZQiLwFEwAa2b_Cad1VVR" },
                { name:"Golden Amaranth", price:"18.00", rating:"4.8", tag:"New Ritual", desc:"Nutty, delicate, gluten-free", img:"https://lh3.googleusercontent.com/aida-public/AB6AXuAY0kVQz8tnd4pIczDoHW4PqICXgppNTF7EVJQMdNwY-UkdXSNNhvN4fKLKVETx8Dg3coGJ2SRLi9DWQdKEUyC03Pb-9UvCAuML19hwrKfH4siz9jM43-FJUMc9zmWYWcGSQkKULyOgWxi57GP5AEHzW_2ZlRFjCvBSgUD9NsDOtQxO5EHRKYYhipqYo3vdZoE-rZqJGaBvb9f1m-D4SmwrUREKvkrlBsZWZcLl8_9i3nCzq8CeogwDn4-rpaoWTf2GuPxywns7yvTe" },
                { name:"Vintage Basmati", price:"22.00", oldPrice:"28.00", rating:"5.0", tag:"Flash Sale", desc:"Aged 2 years, floral aroma", img:"https://lh3.googleusercontent.com/aida-public/AB6AXuDQLSNqQ8okAg54yrxQSxBxJ0QFN-4_LM6fK_itvKcXeO5hayoo1H_LnRJmsQNpHa0G3C-gI21Gu0wpVkRTESFRmIr9xhiYWFsTDowkvrDUt2I_O1PL3zc6oJ__MyuWSL2SPmVSUuBpilrbSL8HXnzMjllZNZHHoIVaxt-WzTVFLnt4U1CIp6kgJIVPJ7ona5Qc6jOwq9b3cUPixMQ8Qpn8TgU1OYsblvKIczqqXSpPEEFnAG4pous5IF6zAFQ_AesHNFzC_8zE4c_k" },
                { name:"Purple Pearl Barley", price:"16.00", rating:"4.7", desc:"Chewy texture, rich in fiber", img:"https://lh3.googleusercontent.com/aida-public/AB6AXuBapyfFEF0IOFA2HVReMndwgkgf9zbhr8UwOuS0ECtaPIeSa7X6IBs-aczYRGxW1_YliPIgPUkEvMWWobSqO_Kzsp5TAcrMHc694X_I6nkcZhrkun28Co29g6Yr3ILkPBNoS0x-WOlFIqJe1f9t523q8s3x2L98HRjGjIEvJDBPiOt-nlNYKSgh7GlOZ7R4tu0Kzxt0DUnuyfYzJ6wQiUccBYLUy-ZKZm_QdstlQ3I8SuwZomgaidmsgxkGuiQYJ1WFx1lC6sAnnlLU" }
              ].map((p, idx) => (
                <div key={idx} onClick={() => setSelectedProduct(p)} className="min-w-[300px] md:min-w-[350px] bg-white p-3 md:p-6 rounded-3xl hover:shadow-4xl transition-all group cursor-pointer border border-primary/5 snap-start text-left relative overflow-hidden">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 md:mb-6 bg-surface-variant shadow-inner border border-black/5">
                    <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src={p.img} alt={p.name} />
                    {p.tag && <span className={`absolute top-4 left-4 ${p.tag === 'Flash Sale' ? 'bg-primary' : 'bg-secondary-container'} text-on-primary text-[10px] font-bold px-4 py-2 rounded-full uppercase shadow-xl`}>{p.tag}</span>}
                    <button 
                       onClick={(e) => { e.stopPropagation(); addToCart(p); }}
                       className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-2xl opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all hover:bg-primary hover:text-white"
                    >
                      <ShoppingBag className="w-7 h-7" />
                    </button>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-on-surface mb-2 group-hover:text-primary transition-colors leading-none uppercase">{p.name}</h4>
                  <p className="text-xs md:text-sm text-on-surface-variant mb-4 md:mb-6 font-bold opacity-60 uppercase">{p.desc}</p>
                  <div className="flex items-center justify-between border-t border-primary/5 pt-5 mt-auto">
                    <div className="flex items-baseline gap-2">
                       <span className="text-2xl font-bold text-on-surface">${p.price}</span>
                       {p.oldPrice && <span className="text-sm text-on-surface-variant line-through opacity-40">${p.oldPrice}</span>}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-tertiary uppercase bg-tertiary-container/30 px-3 py-1.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-current" /> {p.rating}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Botanical Stories Feed */}
        <section className="max-w-4xl mx-auto px-4 md:px-6 mb-8 md:mb-4 md:mb-8">
          <div className="text-center mb-6 md:mb-10 md:mb-4 md:mb-8">
            <h2 className="text-4xl md:text-7xl font-bold text-on-surface mb-2 md:mb-4 leading-none uppercase">The Nebula Archives</h2>
            <p className="text-on-surface-variant text-sm md:text-lg font-bold opacity-40 uppercase leading-none">Every grain tells a story of the soil.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
            <div className="space-y-12 md:space-y-6">
              <div className="bg-surface-container-lowest rounded-[3rem] overflow-hidden group border border-primary/5 hover:shadow-4xl hover:-translate-y-3 transition-all duration-700 text-left relative">
                <div className="overflow-hidden h-[400px] bg-surface-variant">
                  <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAljE00qYa9pcj8qf_6nQTFrMpJGOFSgBWyAo_0j5clZ6sAYi_W6YMYuvRL4F6twCaSi_q6U_PVzi1H4FGdA846jmOg7FfWs1fSCbQPo0dhKA_8c1h_LofG8wxrfs0Yu0fkNOuqVyWsQD7gWHRfRayzttZWBMAzwdki_XhLOq0yGEf2569LlmFprBu2x4kNjNg4Dxux4qzrBaNcTPdlYO3D4VOrfRKUh5T6FlK_rs2WKomkMxsSy-6BadQBJJHSVDkX_-cJLeOOb36L" alt="Sacred Millet" />
                </div>
                <div className="p-4 md:p-6">
                  <span className="text-[10px] md:text-xs font-bold text-secondary uppercase mb-2 md:mb-4 block opacity-50">Ethically Sourced</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 group-hover:text-primary transition-colors uppercase leading-none">Sacred Millet</h3>
                  <p className="text-sm md:text-base text-on-surface-variant mb-6 md:mb-4 md:mb-8 leading-relaxed font-bold opacity-60 uppercase pr-4">Highlands of Ethiopia origin. Complete amino profile. Ancestral energy fuel.</p>
                  <button onClick={() => setSelectedProduct({ name: 'Sacred Millet', price: '15.50', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAljE00qYa9pcj8qf_6nQTFrMpJGOFSgBWyAo_0j5clZ6sAYi_W6YMYuvRL4F6twCaSi_q6U_PVzi1H4FGdA846jmOg7FfWs1fSCbQPo0dhKA_8c1h_LofG8wxrfs0Yu0fkNOuqVyWsQD7gWHRfRayzttZWBMAzwdki_XhLOq0yGEf2569LlmFprBu2x4kNjNg4Dxux4qzrBaNcTPdlYO3D4VOrfRKUh5T6FlK_rs2WKomkMxsSy-6BadQBJJHSVDkX_-cJLeOOb36L', rating: '4.9', reviews: '1.2k' })} className="w-full py-4 md:py-6 border-2 border-primary text-primary rounded-3xl font-bold text-xs md:text-sm hover:bg-primary hover:text-white active:scale-95 transition-all uppercase shadow-xl">Initiate Ritual — $15.50</button>
                </div>
              </div>
            </div>
            
            <div className="space-y-12 md:space-y-6 md:pt-48 text-left">
              <div className="bg-surface-container-lowest rounded-[3rem] overflow-hidden group border border-primary/5 hover:shadow-4xl hover:-translate-y-3 transition-all duration-700 relative">
                <div className="overflow-hidden h-[500px] bg-surface-variant">
                  <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu6TqjblLtCWt0ItjEY7sc5oyLxJ2Si1m8H8-uaO68BGG8xJjJ_uu57hcB-Zgedu8rD9M8E1hXNDP5mCxXx-OLnr2fi1qgrt2QQNX1WElLyXIiGSnPPzl2jxcTHwUrWt52tvL27y15GVHgLM4kJSt0qh5QiRGwmt0T5yXtcpAXg2786y3KYpF9FKBS81_TgRgwWmtCjW_iet_IqmWZVdPuWFu3R15rTMZ92nkwxSz-9cvAg5u8Ta_pEPXaq5hi8VMpYdw8FuMAwuS7" alt="Imperial Rice" />
                </div>
                <div className="p-4 md:p-6">
                  <span className="text-[10px] font-bold text-secondary uppercase mb-2 md:mb-4 block opacity-50">Forbidden Harvest</span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 group-hover:text-primary transition-colors uppercase leading-none">Imperial Noir Rice</h3>
                  <p className="text-sm md:text-base text-on-surface-variant mb-6 md:mb-4 md:mb-8 leading-relaxed font-bold opacity-60 uppercase pr-4">Ancient royalty selection. High anthocyanin density. Vibrant violet essence.</p>
                  <button onClick={() => setSelectedProduct({ name: 'Imperial Rice', price: '19.90', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBu6TqjblLtCWt0ItjEY7sc5oyLxJ2Si1m8H8-uaO68BGG8xJjJ_uu57hcB-Zgedu8rD9M8E1hXNDP5mCxXx-OLnr2fi1qgrt2QQNX1WElLyXIiGSnPPzl2jxcTHwUrWt52tvL27y15GVHgLM4kJSt0qh5QiRGwmt0T5yXtcpAXg2786y3KYpF9FKBS81_TgRgwWmtCjW_iet_IqmWZVdPuWFu3R15rTMZ92nkwxSz-9cvAg5u8Ta_pEPXaq5hi8VMpYdw8FuMAwuS7', rating: '5.0', reviews: '840' })} className="w-full py-4 md:py-6 border-2 border-primary text-primary rounded-3xl font-bold text-xs md:text-sm hover:bg-primary hover:text-white active:scale-95 transition-all uppercase shadow-xl">Initiate Ritual — $19.90</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center py-10 md:py-12">
            <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-4 md:mb-4 md:mb-8 p-1">
               <div className="w-full h-full border-2 border-primary/5 rounded-full"></div>
            </div>
            <p className="text-[10px] md:text-xs font-bold text-on-surface-variant uppercase animate-pulse opacity-40">Growing more discoveries...</p>
          </div>
        </section>
      </main>

      {/* Community Footer */}
      <footer className="bg-[#ffecf1] w-full mt-auto rounded-t-[4rem] md:rounded-t-[8rem] border-t border-primary/5 shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-6 px-8 md:px-20 py-10 md:py-12 max-w-7xl mx-auto font-body text-sm tracking-wide text-left relative z-10">
          <div className="md:col-span-1 space-y-4 md:space-y-6">
            <div className="text-3xl md:text-4xl font-bold text-[#b70049] uppercase leading-none">R.N. Foods</div>
            <p className="text-[#4a2134] opacity-60 mb-4 md:mb-4 md:mb-8 leading-relaxed font-bold text-base uppercase lg:max-w-xs">Nourishing the modern human with ancestral Earth energy. Join the ritual of vibrancy.</p>
            <div className="flex space-x-6">
              <button className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl active:scale-90 group"><Share2 size={24}/></button>
              <button className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl active:scale-90 group"><Mail size={24}/></button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-[#b70049] mb-6 md:mb-4 md:mb-8 uppercase text-[10px]">The Ritual</h4>
            <ul className="space-y-3 md:space-y-6">
              {['Our Story', 'Brewing Guides', 'Wholesale', 'Sustainability'].map(item => (
                <li key={item}><a className="text-[#4a2134] hover:text-primary hover:translate-x-3 transition-all inline-block font-bold text-sm uppercase" href="#">{item}</a></li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#b70049] mb-6 md:mb-4 md:mb-8 uppercase text-[10px]">Registry</h4>
            <ul className="space-y-3 md:space-y-6">
              {['Shipping Info', 'Purity Terms', 'Logistic Flow', 'Support Portal'].map(item => (
                <li key={item}><a className="text-[#4a2134] hover:text-primary hover:translate-x-3 transition-all inline-block font-bold text-sm uppercase" href="#">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="font-bold text-[#b70049] mb-2 md:mb-4 uppercase text-[10px]">Sync Ritual</h4>
            <p className="text-[#4a2134] mb-4 md:mb-4 md:mb-8 text-[10px] md:text-xs font-bold opacity-40 uppercase leading-relaxed">Activate your sync and receive immediate notification of high-vibrancy batch releases.</p>
            <div className="flex bg-white rounded-3xl overflow-hidden border border-primary/10 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-2xl p-1">
              <input className="bg-transparent border-none focus:ring-0 text-xs px-8 py-5 w-full outline-none font-bold uppercase" placeholder="Ritual Email..." type="email" />
              <button onClick={() => showToast('Ritual Synced!')} className="bg-primary text-white px-10 rounded-2xl hover:brightness-110 active:scale-90 transition-all">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-12 pb-20 md:pb-24 text-center md:text-left">
          <div className="w-full h-px bg-primary/10 mb-8 md:mb-4 md:mb-8"></div>
          <p className="text-[#4a2134] text-[9px] md:text-[10px] font-bold opacity-20 uppercase">© 2024 R.N. Foods Community Division. Ancient Energy Protected.</p>
        </div>
      </footer>

      {/* Floating Action Badge */}
      <button 
        onClick={() => showToast('Community Ritual Active')}
        className="fixed bottom-10 right-10 w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-primary text-white shadow-[0_30px_60px_-10px_rgba(183,0,73,0.5)] flex items-center justify-center z-40 group hover:scale-110 active:scale-95 transition-all text-center animate-bounce-subtle"
      >
        <Leaf size={40} className="fill-white group-hover:rotate-12 transition-transform" />
      </button>

      {/* Toasts */}
      <div className="fixed bottom-0 right-0 left-0 md:left-auto p-4 md:p-6 flex flex-col gap-2 md:gap-4 pointer-events-none z-[300]">
        {toasts.map(t => (
          <Toast key={t.id} message={t.msg} onClose={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
        ))}
      </div>
    </div>
  )
}

export default App
