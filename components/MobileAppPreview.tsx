
import React, { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { Plant, Product } from '@/types';
import { 
  Home, Search, User, Sprout, ChevronRight, Plus, 
  Bell, Menu, Droplets, Thermometer, Trash2, 
  ChevronLeft, ScanLine, Eye, EyeOff, MapPin, Tag, DollarSign, Package, Image as ImageIcon,
  Star, ShoppingBag, Heart
} from 'lucide-react';

type AppScreen = 'splash' | 'auth' | 'garden' | 'add-product' | 'marketplace' | 'product-details';

// Reusable Button Component matching the design
const MuniehButton: React.FC<{ title: string; onClick: () => void; className?: string }> = ({ title, onClick, className }) => (
  <button 
    onClick={onClick}
    className={`w-full bg-[#8BC34A] text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 active:scale-95 transition-transform ${className}`}
  >
    {title}
  </button>
);

const MobileAppPreview: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('splash');
  const [plants, setPlants] = useState<Plant[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [authForm, setAuthForm] = useState({ name: 'Alisson Becker', email: 'alissonbecker@gmail.com', pass: 'password', loc: 'gampaha' });
  
  // Add Product Form State
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
    category: 'Vegetables',
    rating: 4
  });

  const units = ['kg', 'g', 'pcs', 'box'];
  const categories = ['Vegetables', 'Fruits', 'Herbs', 'Oils'];

  useEffect(() => {
    // Simulate App Launch
    setTimeout(() => setScreen('auth'), 3000);
    api.mobile.getPlants().then(setPlants);
    api.mobile.getProducts().then(setProducts);
  }, []);

  const handleLogin = () => {
    setScreen('garden');
  };

  const handleAddProduct = async () => {
    if(!productForm.title || !productForm.price) return;
    await api.mobile.addProduct({
      title: productForm.title,
      price: Number(productForm.price),
      unit: productForm.unit,
      image: productForm.image,
      category: productForm.category,
      farmerName: authForm.name,
      rating: productForm.rating
    });
    // Reset and go back
    setProductForm({ ...productForm, title: '', price: '' });
    setScreen('garden');
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
    setScreen('product-details');
  };

  // Bottom Navigation Component
  const BottomNav = () => (
    <div className="absolute bottom-0 w-full h-20 bg-white rounded-t-[2rem] shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
        {/* Center Button */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <button 
              className="w-16 h-16 bg-[#9CCC65] rounded-[2rem] flex items-center justify-center shadow-lg border-4 border-[#F5FAF5] rotate-45 hover:scale-105 transition-transform"
            >
                <ScanLine className="w-6 h-6 text-white -rotate-45" />
            </button>
        </div>

        <div className="w-full h-full flex justify-between items-center px-8 text-gray-400">
            <button onClick={() => setScreen('marketplace')} className={`${screen === 'marketplace' ? 'text-[#1B5E20]' : ''}`}>
              <Home className="w-6 h-6" />
            </button>
            <button className="mr-8">
              <User className="w-6 h-6" />
            </button>
            <button onClick={() => setScreen('garden')} className={`ml-8 ${screen === 'garden' ? 'text-[#1B5E20]' : ''}`}>
              <Sprout className="w-6 h-6" />
            </button>
            <button>
              <ShoppingBag className="w-6 h-6" />
            </button>
        </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-8">
      
      {/* Device Controls */}
      <div className="mb-4 text-sm text-gray-500">
        Current Screen: <span className="font-bold capitalize">{screen.replace('-', ' ')}</span>
        <button onClick={() => setScreen('splash')} className="ml-4 text-brand-600 underline">Restart Demo</button>
      </div>

      {/* Phone Frame */}
      <div className="relative w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl border-[8px] border-gray-900 overflow-hidden ring-4 ring-gray-200">
        
        {/* Status Bar */}
        <div className="absolute top-0 w-full h-12 z-50 flex justify-between items-center px-6 pt-3 text-xs font-bold">
           <span className={screen === 'splash' || screen === 'product-details' ? 'text-white' : 'text-gray-900'}>9:41</span>
           <div className={`flex space-x-1 ${screen === 'splash' || screen === 'product-details' ? 'opacity-90' : 'text-gray-900'}`}>
             <div className={`w-4 h-2.5 rounded-sm ${screen === 'splash' || screen === 'product-details' ? 'bg-white' : 'bg-black'}`}></div>
             <div className={`w-3 h-2.5 rounded-sm ${screen === 'splash' || screen === 'product-details' ? 'bg-white' : 'bg-black'}`}></div>
             <div className={`w-2 h-2.5 rounded-sm ${screen === 'splash' || screen === 'product-details' ? 'bg-gray-300' : 'bg-gray-300'}`}></div>
           </div>
        </div>
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-7 w-40 bg-black rounded-b-2xl z-50"></div>

        {/* --- SCREEN CONTENT --- */}
        <div className="w-full h-full overflow-hidden relative bg-white">
          
          {/* 1. SPLASH SCREEN */}
          {screen === 'splash' && (
            <div className="w-full h-full relative">
               <div className="absolute inset-0 bg-green-900">
                  <img 
                    src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay" 
                    alt="Farmer"
                  />
               </div>
               <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="w-20 h-20 mb-4">
                    <Sprout className="w-full h-full text-[#8BC34A]" /> 
                  </div>
                  <h1 className="text-5xl font-light text-[#8BC34A] tracking-wide">Munieh</h1>
                  <p className="text-white/30 text-xs font-bold mt-auto mb-10 tracking-widest">By C.O.D.E</p>
               </div>
            </div>
          )}

          {/* 2. AUTH SCREEN */}
          {screen === 'auth' && (
            <div className="w-full h-full flex flex-col px-6 pt-24 bg-[#F9FBF9]">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>

                <h2 className="text-3xl font-bold text-[#1B5E20] mb-2">Create Account</h2>
                <p className="text-gray-500 mb-8 text-sm">Let's Create Account Together</p>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">Your Name</label>
                        <input 
                          type="text" 
                          value={authForm.name} 
                          onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                          className="w-full bg-white p-4 rounded-2xl text-sm text-gray-700 shadow-sm border border-gray-50 focus:border-brand-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">Email Address</label>
                        <input 
                          type="text" 
                          value={authForm.email} 
                          onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                          className="w-full bg-white p-4 rounded-2xl text-sm text-gray-700 shadow-sm border border-gray-50 focus:border-brand-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">Password</label>
                        <div className="relative">
                            <input 
                            type="password" 
                            value={authForm.pass} 
                            onChange={(e) => setAuthForm({...authForm, pass: e.target.value})}
                            className="w-full bg-white p-4 rounded-2xl text-sm text-gray-700 shadow-sm border border-gray-50 focus:border-brand-500 outline-none"
                            />
                            <EyeOff className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">Location</label>
                         <div className="relative">
                            <input 
                            type="text" 
                            value={authForm.loc} 
                            onChange={(e) => setAuthForm({...authForm, loc: e.target.value})}
                            className="w-full bg-white p-4 rounded-2xl text-sm text-gray-700 shadow-sm border border-gray-50 focus:border-brand-500 outline-none"
                            />
                            <MapPin className="absolute right-4 top-4 w-5 h-5 text-[#1B5E20] fill-current" />
                        </div>
                    </div>
                </div>

                <MuniehButton 
                  title="Sign Up" 
                  onClick={handleLogin} 
                  className="mt-8"
                />

                <button className="w-full bg-white text-gray-700 font-bold py-4 rounded-2xl mt-4 shadow-sm border border-gray-100 flex items-center justify-center space-x-2">
                    <span className="text-xl">G</span>
                    <span>Sign in with google</span>
                </button>
            </div>
          )}

          {/* 3. MY GARDEN SCREEN (Farmer) */}
          {screen === 'garden' && (
            <div className="w-full h-full bg-[#F5FAF5] flex flex-col">
              <div className="pt-12 px-6 pb-4 flex items-center justify-between">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                   <ChevronLeft className="w-5 h-5 text-gray-800" />
                </button>
                <h2 className="text-lg font-bold text-[#1B5E20]">My Garden</h2>
                <button 
                  onClick={() => setScreen('add-product')}
                  className="w-10 h-10 bg-[#8BC34A] rounded-full flex items-center justify-center shadow-sm hover:bg-[#7cb342] transition-colors"
                >
                   <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="px-6 mb-6">
                <div className="bg-white p-1.5 rounded-2xl flex shadow-sm">
                    <button className="flex-1 bg-[#9CCC65] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm">My Plants</button>
                    <button className="flex-1 text-gray-500 py-2.5 rounded-xl text-sm font-medium">Schedule</button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-28 no-scrollbar">
                {plants.map((plant) => (
                    <div key={plant.id} className="bg-white p-3 rounded-[1.5rem] shadow-sm flex items-center relative">
                        <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden mr-4 flex-shrink-0">
                            <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-[#1B5E20] font-bold text-lg">{plant.name}</h3>
                            <p className={`text-xs font-medium mb-2 ${plant.statusColor}`}>{plant.status}</p>
                            <div className="flex space-x-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${plant.needsWater ? 'bg-yellow-400' : 'bg-orange-300/50'}`}>
                                    <Droplets className="w-3 h-3 text-white" />
                                </div>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${plant.needsTemp ? 'bg-orange-400' : 'bg-orange-300/50'}`}>
                                    <Thermometer className="w-3 h-3 text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between h-full py-1 absolute right-4 top-4 bottom-4">
                            <Trash2 className="w-4 h-4 text-gray-400" />
                            <ChevronRight className="w-5 h-5 text-[#1B5E20] mt-auto" />
                        </div>
                    </div>
                ))}
              </div>
              <BottomNav />
            </div>
          )}

          {/* 4. MARKETPLACE SCREEN (Customer) */}
          {screen === 'marketplace' && (
            <div className="w-full h-full bg-[#F5FAF5] flex flex-col">
              {/* Header */}
              <div className="pt-12 px-6 pb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Menu className="w-5 h-5 text-gray-800" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Welcome Back!</p>
                    <h2 className="text-sm font-bold text-[#1B5E20]">{authForm.name}</h2>
                  </div>
                </div>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                   <Bell className="w-5 h-5 text-gray-800" />
                </button>
              </div>

              {/* Search */}
              <div className="px-6 mb-6">
                <div className="bg-white rounded-2xl p-4 flex items-center shadow-sm">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" placeholder="Search fresh products..." className="flex-1 outline-none text-sm text-gray-700" />
                </div>
              </div>

              {/* Categories */}
              <div className="pl-6 mb-6 overflow-x-auto no-scrollbar flex space-x-4">
                {categories.map((cat, idx) => (
                  <button key={cat} className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap shadow-sm ${idx === 0 ? 'bg-[#8BC34A] text-white' : 'bg-white text-gray-500'}`}>
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="flex-1 overflow-y-auto px-6 pb-28 no-scrollbar">
                <h3 className="text-lg font-bold text-[#1B5E20] mb-4">Fresh Arrivals</h3>
                <div className="grid grid-cols-2 gap-4">
                  {products.map((product) => (
                    <div 
                      key={product._id} 
                      onClick={() => openProductDetails(product)}
                      className="relative h-60 rounded-[1.5rem] overflow-hidden shadow-lg shadow-green-100/50 active:scale-95 transition-all duration-300 group bg-gray-100"
                    >
                       <img src={product.image} alt={product.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                       
                       <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-10">
                          <Heart className="w-4 h-4 text-white" />
                       </div>

                       <div className="absolute inset-x-0 bottom-0 pt-16 pb-3 px-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
                          <div className="mb-1">
                                <h4 className="text-white font-bold text-sm leading-tight mb-0.5 drop-shadow-sm">{product.title}</h4>
                                <div className="flex items-center text-[10px] text-gray-300">
                                  <User className="w-3 h-3 mr-1 opacity-70" />
                                  {product.farmerName}
                                </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-2">
                              <div className="flex flex-col">
                                  <span className="text-white font-bold text-sm">{product.price} <span className="text-[10px] font-normal text-gray-300">SYP</span></span>
                                  <div className="flex items-center text-[10px] text-yellow-400">
                                    <Star className="w-3 h-3 fill-current mr-0.5" />
                                    {product.rating}
                                  </div>
                              </div>

                              <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Logic to add to cart would go here
                                }}
                                className="w-9 h-9 bg-[#8BC34A] rounded-full flex items-center justify-center shadow-lg shadow-green-900/30 active:scale-90 transition-transform z-20 hover:bg-[#7CB342]"
                                aria-label="Add to Cart"
                              >
                                <Plus className="w-5 h-5 text-white" />
                              </button>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
              <BottomNav />
            </div>
          )}

          {/* 5. PRODUCT DETAILS SCREEN */}
          {screen === 'product-details' && selectedProduct && (
            <div className="w-full h-full bg-white relative">
              {/* Full Image Background */}
              <div className="h-[45%] w-full relative">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.title} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
                <div className="absolute top-12 left-6">
                  <button 
                    onClick={() => setScreen('marketplace')}
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content Sheet */}
              <div className="absolute top-[40%] bottom-0 w-full bg-white rounded-t-[2.5rem] px-8 pt-10 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                 <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto absolute top-4 left-1/2 transform -translate-x-1/2"></div>
                 
                 <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1B5E20] mb-1">{selectedProduct.title}</h2>
                      <div className="flex items-center text-sm text-gray-500">
                         <MapPin className="w-4 h-4 mr-1 text-[#8BC34A]" />
                         Tartus, Syria
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-2xl font-bold text-[#8BC34A]">{selectedProduct.price}</div>
                       <div className="text-xs text-gray-400">per {selectedProduct.unit}</div>
                    </div>
                 </div>

                 {/* Farmer Card */}
                 <div className="bg-[#F5FAF5] p-4 rounded-2xl flex items-center mb-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Farmer" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-[#1B5E20] text-sm">{selectedProduct.farmerName}</h4>
                       <div className="flex items-center text-xs text-yellow-500">
                          <Star className="w-3 h-3 fill-current mr-1" />
                          4.9 (120 Reviews)
                       </div>
                    </div>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                       <Bell className="w-5 h-5 text-[#8BC34A]" />
                    </button>
                 </div>

                 <div className="flex-1 overflow-y-auto mb-24 no-scrollbar">
                    <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                       Freshly harvested {selectedProduct.title.toLowerCase()} directly from our organic farm. 
                       Grown without synthetic pesticides and handled with care to ensure the best quality 
                       for your table.
                    </p>
                 </div>

                 {/* Bottom Action */}
                 <div className="absolute bottom-0 left-0 w-full p-6 bg-white border-t border-gray-50">
                    <div className="flex space-x-4">
                       <button className="w-16 h-14 border border-gray-200 rounded-2xl flex items-center justify-center">
                          <Heart className="w-6 h-6 text-gray-400" />
                       </button>
                       <button className="flex-1 bg-[#1B5E20] text-white font-bold rounded-2xl h-14 shadow-lg shadow-green-100 flex items-center justify-center space-x-2">
                          <ShoppingBag className="w-5 h-5" />
                          <span>Add to Cart</span>
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* 6. ADD PRODUCT SCREEN */}
          {screen === 'add-product' && (
            <div className="w-full h-full flex flex-col px-6 pt-12 bg-[#F9FBF9] overflow-y-auto">
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => setScreen('garden')}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm mr-4"
                  >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <h2 className="text-xl font-bold text-[#1B5E20]">Add New Product</h2>
                </div>

                <div className="space-y-5 pb-8">
                    <div className="w-full h-40 bg-gray-100 rounded-2xl mb-2 overflow-hidden border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 relative">
                        {productForm.image ? (
                           <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex flex-col items-center">
                            <ImageIcon className="w-8 h-8 mb-2 text-gray-300" />
                            <span className="text-xs">Image Preview</span>
                          </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase tracking-wide">Image URL</label>
                        <input 
                          type="text" 
                          value={productForm.image}
                          onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                          className="w-full bg-white p-4 rounded-2xl text-sm text-gray-700 shadow-sm border border-gray-50 focus:border-brand-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase tracking-wide">Product Title</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={productForm.title}
                            onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                            placeholder="e.g. Fresh Tomatoes"
                            className="w-full bg-white p-4 rounded-2xl text-sm text-gray-700 shadow-sm border border-gray-50 focus:border-brand-500 outline-none"
                          />
                          <Tag className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex-1">
                          <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase tracking-wide">Price</label>
                          <div className="relative">
                            <input 
                              type="number" 
                              value={productForm.price}
                              onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                              placeholder="0.00"
                              className="w-full bg-white p-4 rounded-2xl text-sm text-gray-700 shadow-sm border border-gray-50 focus:border-brand-500 outline-none"
                            />
                            <DollarSign className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                          </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase tracking-wide">Unit</label>
                      <div className="flex space-x-2">
                        {units.map((u) => (
                          <button
                            key={u}
                            onClick={() => setProductForm({ ...productForm, unit: u })}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                              productForm.unit === u
                                ? 'bg-[#8BC34A] text-white border-[#8BC34A] shadow-green-100'
                                : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                            }`}
                          >
                            {u}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase tracking-wide">Category</label>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setProductForm({ ...productForm, category: cat })}
                                    className={`py-3 px-4 rounded-xl text-sm font-bold text-left flex justify-between items-center transition-all border shadow-sm ${
                                      productForm.category === cat
                                        ? 'bg-[#F1F8E9] text-[#33691E] border-[#8BC34A]'
                                        : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                                    }`}
                                  >
                                    {cat}
                                    {productForm.category === cat && <div className="w-2.5 h-2.5 rounded-full bg-[#8BC34A]" />}
                                  </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-2 ml-1 uppercase tracking-wide">Initial Rating</label>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setProductForm({ ...productForm, rating: star })}
                              className="focus:outline-none transition-transform active:scale-95"
                            >
                              <Star 
                                className={`w-8 h-8 ${
                                  star <= productForm.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            </button>
                          ))}
                        </div>
                    </div>

                    <MuniehButton 
                      title="Add Product" 
                      onClick={handleAddProduct} 
                      className="mt-4"
                    />
                    <div className="h-8"></div>
                </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MobileAppPreview;
