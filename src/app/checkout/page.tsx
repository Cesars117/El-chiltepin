"use client";

import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import Navbar from '@/components/Navbar';
import { Send, CreditCard, Banknote, MapPin, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { createOrder } from './actions';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'Efectivo',
    paymentAmount: '',
  });
  const [paymentError, setPaymentError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'paymentAmount' || name === 'paymentMethod') {
      setPaymentError('');
    }
  };

  const calculateChange = () => {
    const amount = parseFloat(formData.paymentAmount);
    if (isNaN(amount) || amount < cartTotal) return 0;
    return amount - cartTotal;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.paymentMethod === 'Efectivo') {
      const amount = parseFloat(formData.paymentAmount);
      if (isNaN(amount) || amount < cartTotal) {
        setPaymentError(`El monto debe ser mayor o igual al total ($${cartTotal})`);
        return;
      }
    }
    setPaymentError('');

    // Save to Database
    try {
      await createOrder({
        customerName: formData.name,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        total: cartTotal,
        paymentMethod: formData.paymentMethod,
        paymentAmount: formData.paymentMethod === 'Efectivo' ? parseFloat(formData.paymentAmount) : undefined,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.customPrice || item.price,
          customizations: item.customizations
        }))
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }
    
    // Construct WhatsApp message
    const itemsList = cart.map(item => {
      let customText = '';
      if (item.customizations) {
        if (item.customizations.extras?.length) customText += ` +Extras: ${item.customizations.extras.map(e => e.name).join(', ')}`;
        if (item.customizations.removedIngredients?.length) customText += ` -Sin: ${item.customizations.removedIngredients.join(', ')}`;
        if (item.customizations.notes) customText += ` (Nota: ${item.customizations.notes})`;
      }
      return `- ${item.quantity}x ${item.name}${customText} ($${(item.customPrice || item.price) * item.quantity})`;
    }).join('%0A');
    const changeText = formData.paymentMethod === 'Efectivo' 
      ? `%0APaga con: $${formData.paymentAmount}%0ACambio: $${calculateChange()}`
      : '';
    
    const message = `*Nuevo Pedido - El Chiltepín*%0A%0A` +
      `*Cliente:* ${formData.name}%0A` +
      `*Teléfono:* ${formData.phone}%0A` +
      `*Dirección:* ${formData.address}%0A%0A` +
      `*Pedido:*%0A${itemsList}%0A%0A` +
      `*Total:* $${cartTotal}%0A` +
      `*Método de Pago:* ${formData.paymentMethod}${changeText}%0A%0A` +
      `¡Gracias por su preferencia! 🌶️🐟`;

    const whatsappUrl = `https://wa.me/526674511457?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    router.push('/');
  };

  if (cart.length === 0) {
    return (
      <main>
        <Navbar />
        <div className="section container" style={{ textAlign: 'center' }}>
          <h2>No hay productos en tu carrito</h2>
          <button onClick={() => router.push('/menu')} className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Ir al Menú
          </button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      
      <div className="section container">
        <h1 style={{ marginBottom: '3rem', textAlign: 'center' }}>Finalizar Pedido</h1>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '4rem' 
        }}>
          {/* Form Section */}
          <form onSubmit={handleSubmit} style={{ 
            background: 'var(--card-bg)', 
            padding: '2.5rem', 
            borderRadius: '24px',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Datos de Entrega</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                <User size={16} style={{ marginRight: '0.5rem' }} /> Nombre Completo
              </label>
              <input 
                type="text" 
                name="name" 
                required 
                value={formData.name}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}
                placeholder="Ej. Juan Pérez"
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                <Phone size={16} style={{ marginRight: '0.5rem' }} /> Teléfono de Contacto
              </label>
              <input 
                type="tel" 
                name="phone" 
                required 
                value={formData.phone}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}
                placeholder="449 000 0000"
              />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                <MapPin size={16} style={{ marginRight: '0.5rem' }} /> Dirección de Entrega
              </label>
              <input 
                type="text" 
                name="address" 
                required 
                value={formData.address}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}
                placeholder="Calle, número, colonia"
              />
            </div>

            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Método de Pago</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ 
                flex: 1, 
                padding: '1rem', 
                border: `2px solid ${formData.paymentMethod === 'Efectivo' ? 'var(--primary)' : 'var(--card-border)'}`,
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: formData.paymentMethod === 'Efectivo' ? 'rgba(196, 30, 58, 0.05)' : 'transparent'
              }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Efectivo" 
                  checked={formData.paymentMethod === 'Efectivo'} 
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
                <Banknote size={20} color={formData.paymentMethod === 'Efectivo' ? 'var(--primary)' : 'var(--muted)'} />
                <span>Efectivo</span>
              </label>
              
              <label style={{ 
                flex: 1, 
                padding: '1rem', 
                border: `2px solid ${formData.paymentMethod === 'Transferencia' ? 'var(--primary)' : 'var(--card-border)'}`,
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: formData.paymentMethod === 'Transferencia' ? 'rgba(196, 30, 58, 0.05)' : 'transparent'
              }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Transferencia" 
                  checked={formData.paymentMethod === 'Transferencia'} 
                  onChange={handleInputChange}
                  style={{ display: 'none' }}
                />
                <CreditCard size={20} color={formData.paymentMethod === 'Transferencia' ? 'var(--primary)' : 'var(--muted)'} />
                <span>Transferencia</span>
              </label>
            </div>

            {formData.paymentMethod === 'Efectivo' && (
              <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  ¿Con cuánto pagas? (Para tu cambio)
                </label>
                <input 
                  type="number" 
                  name="paymentAmount" 
                  required 
                  value={formData.paymentAmount}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: `1px solid ${paymentError ? 'var(--error)' : 'var(--card-border)'}` }}
                  placeholder="$0.00"
                />
                {paymentError && (
                  <p style={{ marginTop: '0.5rem', color: 'var(--error)', fontSize: '0.85rem', fontWeight: '600' }} className="animate-fade-in">
                    ⚠️ {paymentError}
                  </p>
                )}
                {calculateChange() > 0 && !paymentError && (
                  <p style={{ marginTop: '0.5rem', color: 'var(--success)', fontWeight: '600' }}>
                    Tu cambio será de: ${calculateChange()}
                  </p>
                )}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '16px', padding: '1rem' }}>
              Confirmar por WhatsApp <Send size={20} />
            </button>
          </form>

          {/* Summary Section */}
          <div>
            <div style={{ 
              background: 'var(--card-bg)', 
              padding: '2rem', 
              borderRadius: '24px',
              border: '1px solid var(--card-border)',
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Resumen del Pedido</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                {cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '600' }}>{item.quantity}x {item.name}</span>
                      <span style={{ fontWeight: '600' }}>${(item.customPrice || item.price) * item.quantity}</span>
                    </div>
                    {item.customizations && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
                        {item.customizations.extras && item.customizations.extras.length > 0 && (
                          <span> • Extra: {item.customizations.extras.map(e => e.name).join(', ')}</span>
                        )}
                        {item.customizations.removedIngredients && item.customizations.removedIngredients.length > 0 && (
                          <div style={{ color: 'var(--error)' }}>Sin {item.customizations.removedIngredients.join(', ')}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal</span>
                  <span>${cartTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Envío</span>
                  <span style={{ color: 'var(--success)' }}>GRATIS</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  marginTop: '1rem', 
                  fontSize: '1.5rem', 
                  fontWeight: '800',
                  color: 'var(--primary)'
                }}>
                  <span>Total</span>
                  <span>${cartTotal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
