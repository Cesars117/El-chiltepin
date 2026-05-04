"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Plus, Trash2, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface Cost {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export default function CostsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [costs, setCosts] = useState<Cost[]>([]);
  const [newCost, setNewCost] = useState({ description: '', amount: '', category: 'Insumos' });

  // Load from local storage for MVP
  useEffect(() => {
    const saved = localStorage.getItem('chiltepin_costs');
    if (saved) setCosts(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chiltepin_costs', JSON.stringify(costs));
  }, [costs]);

  if (status === 'unauthenticated') router.push('/admin/login');

  const addCost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCost.description || !newCost.amount) return;
    
    const cost: Cost = {
      id: Date.now().toString(),
      description: newCost.description,
      amount: parseFloat(newCost.amount),
      category: newCost.category,
      date: new Date().toLocaleDateString()
    };
    
    setCosts([cost, ...costs]);
    setNewCost({ description: '', amount: '', category: 'Insumos' });
  };

  const deleteCost = (id: string) => {
    setCosts(costs.filter(c => c.id !== id));
  };

  const totalCosts = costs.reduce((sum, c) => sum + c.amount, 0);

  return (
    <main style={{ minHeight: '100vh', background: '#F0F2F5' }}>
      <Navbar />
      
      <div className="section container">
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', marginBottom: '1rem' }}>
            <ArrowLeft size={18} /> Volver al Dashboard
          </Link>
          <h1 style={{ fontSize: '2rem' }}>Gestión de Costos y Gastos</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
          {/* Add Cost Form */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '24px', 
            boxShadow: 'var(--shadow-sm)',
            height: 'fit-content'
          }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Registrar Gasto</h2>
            <form onSubmit={addCost}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Descripción</label>
                <input 
                  type="text" 
                  value={newCost.description}
                  onChange={e => setNewCost({...newCost, description: e.target.value})}
                  placeholder="Ej. Compra de Camarón"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Monto ($)</label>
                <input 
                  type="number" 
                  value={newCost.amount}
                  onChange={e => setNewCost({...newCost, amount: e.target.value})}
                  placeholder="0.00"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}
                />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: '600' }}>Categoría</label>
                <select 
                  value={newCost.category}
                  onChange={e => setNewCost({...newCost, category: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)', background: 'white' }}
                >
                  <option>Insumos</option>
                  <option>Renta/Luz</option>
                  <option>Sueldos</option>
                  <option>Publicidad</option>
                  <option>Otros</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '12px' }}>
                Guardar Gasto <Save size={18} />
              </button>
            </form>
          </div>

          {/* Costs List */}
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '24px', 
            boxShadow: 'var(--shadow-sm)' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>Historial de Gastos</h2>
              <div style={{ fontWeight: '800', color: 'var(--error)', fontSize: '1.25rem' }}>
                Total: ${totalCosts.toLocaleString()}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {costs.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>No hay gastos registrados.</p>
              ) : (
                costs.map(cost => (
                  <div key={cost.id} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '1rem', 
                    borderRadius: '16px',
                    background: '#F8FAFC',
                    border: '1px solid #EDF2F7'
                  }}>
                    <div>
                      <div style={{ fontWeight: '700' }}>{cost.description}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{cost.date} • {cost.category}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ fontWeight: '800', color: 'var(--error)' }}>-${cost.amount}</div>
                      <button 
                        onClick={() => deleteCost(cost.id)}
                        style={{ background: 'transparent', border: 'none', color: '#CBD5E1', cursor: 'pointer' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
