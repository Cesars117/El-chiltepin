"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useCart } from '@/lib/CartContext';
import { Plus, ShoppingBag } from 'lucide-react';
import ProductModal from '@/components/ProductModal';
import { Product } from '@prisma/client';

const CATEGORIES = ['Todos', 'Aguachiles', 'Tostadas', 'Ceviches', 'Especialidades', 'Bebidas'];

export default function MenuClient({ initialProducts }: { initialProducts: Product[] }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart, toggleCart } = useCart();

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (customizations: any, quantity: number) => {
    if (selectedProduct) {
      for (let i = 0; i < quantity; i++) {
        // @ts-ignore - The Product type from prisma is slightly different but compatible with what addToCart expects
        addToCart(selectedProduct, customizations);
      }
    }
  };

  const filteredItems = activeCategory === 'Todos' 
    ? initialProducts 
    : initialProducts.filter(item => item.category === activeCategory);

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '5rem' }}>
      <Navbar />
      
      <div className="section container" style={{ marginTop: '80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem' }}>El Chiltepín</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.2rem' }}>El auténtico sabor de Culiacán, fresco y al momento.</p>
        </div>

        {/* Categories */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '3rem', 
          overflowX: 'auto', 
          paddingBottom: '1rem',
          scrollbarWidth: 'none'
        }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn ${activeCategory === cat ? 'btn-primary' : ''}`}
              style={{ 
                whiteSpace: 'nowrap',
                borderRadius: '50px',
                padding: '0.75rem 2rem',
                border: activeCategory === cat ? 'none' : '1px solid var(--card-border)',
                background: activeCategory === cat ? 'var(--primary)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--text)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', 
          gap: '2.5rem',
          padding: '0 0.5rem'
        }}>
          {filteredItems.map(product => (
            <div key={product.id} className="card animate-fade-in" style={{ 
              display: 'flex', 
              flexDirection: 'column',
              opacity: product.status === 'out_of_stock' ? 0.7 : 1
            }}>
              <div style={{ 
                position: 'relative', 
                height: '200px', 
                borderRadius: '20px', 
                overflow: 'hidden',
                marginBottom: '1.5rem'
              }}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {product.status === 'out_of_stock' && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>
                    AGOTADO
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem' }}>{product.name}</h3>
                  <span style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '1.2rem' }}>${product.price}</span>
                </div>
                <p style={{ 
                  color: 'var(--muted)', 
                  fontSize: '0.9rem', 
                  marginBottom: '1.5rem',
                  lineHeight: '1.5'
                }}>
                  {product.description}
                </p>
                
                <button 
                  onClick={() => handleOpenModal(product)}
                  disabled={product.status === 'out_of_stock'}
                  className="btn btn-primary" 
                  style={{ 
                    width: '100%', 
                    borderRadius: '16px',
                    opacity: product.status === 'out_of_stock' ? 0.5 : 1,
                    cursor: product.status === 'out_of_stock' ? 'not-allowed' : 'pointer'
                  }}
                >
                  {product.status === 'out_of_stock' ? 'Agotado' : 'Agregar'} <Plus size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct as any}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmAdd}
        />
      )}

      {/* Cart Summary Floating Button (Mobile) */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 90
      }}>
        <button 
          onClick={toggleCart}
          className="btn btn-primary"
          style={{ 
            boxShadow: 'var(--shadow-lg)',
            padding: '1rem 2rem',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.1rem'
          }}
        >
          <ShoppingBag size={20} /> Ver Pedido
        </button>
      </div>
    </main>
  );
}
