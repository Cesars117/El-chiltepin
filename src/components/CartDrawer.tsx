"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import styles from './CartDrawer.module.css';

export default function CartDrawer() {
  const { 
    cart, 
    cartTotal, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart 
  } = useCart();

  return (
    <>
      <div 
        className={`${styles.overlay} ${isCartOpen ? styles.overlayVisible : ''}`} 
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className={`${styles.drawer} ${isCartOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.header}>
          <h2 style={{ fontSize: '1.25rem' }}>Tu Pedido</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {cart.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              marginTop: '4rem', 
              color: 'var(--muted)' 
            }}>
              <p>Tu carrito está vacío</p>
              <Link 
                href="/menu" 
                className="btn btn-outline" 
                style={{ marginTop: '1.5rem' }}
                onClick={() => setIsCartOpen(false)}
              >
                Ver Menú
              </Link>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemPrice}>${item.customPrice || item.price}</div>
                  
                  {item.customizations && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
                      {item.customizations.extras && item.customizations.extras.length > 0 && (
                        <div>+ {item.customizations.extras.map(e => e.name).join(', ')}</div>
                      )}
                      {item.customizations.removedIngredients && item.customizations.removedIngredients.length > 0 && (
                        <div style={{ color: 'var(--error)' }}>Sin {item.customizations.removedIngredients.join(', ')}</div>
                      )}
                    </div>
                  )}
                  
                  <div className={styles.quantityControls}>
                    <button 
                      className={styles.qBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ fontWeight: '600' }}>{item.quantity}</span>
                    <button 
                      className={styles.qBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </button>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      style={{ 
                        marginLeft: 'auto', 
                        background: 'transparent', 
                        border: 'none', 
                        color: 'var(--error)',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            <div className={styles.totalRow} style={{ color: 'var(--success)', fontSize: '1.1rem' }}>
              <span>Total</span>
              <span>${cartTotal}</span>
            </div>
            
            <Link 
              href="/checkout" 
              className="btn btn-primary" 
              style={{ width: '100%', marginTop: '1.5rem', borderRadius: '16px' }}
              onClick={() => setIsCartOpen(false)}
            >
              Confirmar Pedido <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
