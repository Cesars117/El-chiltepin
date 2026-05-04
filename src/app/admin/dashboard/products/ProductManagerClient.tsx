"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Eye, 
  EyeOff, 
  Package, 
  PackageX,
  Search,
  ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { updateProductStatus, deleteProduct, addOrUpdateProduct } from './actions';
import { Product } from '@prisma/client';

export default function ProductManagerClient({ initialProducts }: { initialProducts: Product[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = initialProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'active' ? 'out_of_stock' : 'active';
    await updateProductStatus(id, nextStatus);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este platillo permanentemente?')) {
      await deleteProduct(id);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <Navbar />
      
      <div className="section container" style={{ marginTop: '80px' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link href="/admin/dashboard" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--muted)',
            textDecoration: 'none',
            marginBottom: '1rem'
          }}>
            <ChevronLeft size={20} /> Volver al Panel
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '2.5rem' }}>Gestión de Inventario</h1>
            <button 
              onClick={() => setIsAdding(true)}
              className="btn btn-primary" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={20} /> Nuevo Platillo
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <Search 
              size={20} 
              style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} 
            />
            <input 
              type="text" 
              placeholder="Buscar por nombre o categoría..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem 0.75rem 3rem', 
                borderRadius: '12px', 
                border: '1px solid var(--card-border)',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F1F5F9', borderBottom: '1px solid var(--card-border)' }}>
                <th style={{ padding: '1.25rem' }}>Platillo</th>
                <th style={{ padding: '1.25rem' }}>Categoría</th>
                <th style={{ padding: '1.25rem' }}>Precio</th>
                <th style={{ padding: '1.25rem' }}>Estado</th>
                <th style={{ padding: '1.25rem', textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img 
                        src={product.image} 
                        alt="" 
                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                      <span style={{ fontWeight: '600' }}>{product.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      background: '#E2E8F0' 
                    }}>
                      {product.category}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem', fontWeight: '700' }}>${product.price}</td>
                  <td style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {product.status === 'active' ? (
                        <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                          <Package size={16} /> Disponible
                        </span>
                      ) : (
                        <span style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                          <PackageX size={16} /> Agotado
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleToggleStatus(product.id, product.status)}
                        className="btn" 
                        style={{ 
                          padding: '0.5rem', 
                          color: product.status === 'active' ? 'var(--muted)' : 'var(--primary)',
                          background: 'transparent'
                        }}
                        title={product.status === 'active' ? "Marcar como agotado" : "Marcar como disponible"}
                      >
                        {product.status === 'active' ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                      <button 
                        onClick={() => setEditingProduct(product)}
                        className="btn" 
                        style={{ padding: '0.5rem', color: 'var(--secondary)', background: 'transparent' }}
                      >
                        <Edit2 size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="btn" 
                        style={{ padding: '0.5rem', color: 'var(--error)', background: 'transparent' }}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {(isAdding || editingProduct) && (
        <ProductFormModal 
          product={editingProduct} 
          onClose={() => { setIsAdding(false); setEditingProduct(null); }} 
        />
      )}
    </main>
  );
}

function ProductFormModal({ product, onClose }: any) {
  const [formData, setFormData] = useState(product || {
    name: '',
    description: '',
    price: 0,
    category: 'Aguachiles',
    image: '/images/hero.png',
    status: 'active'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addOrUpdateProduct(formData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'
    }}>
      <div className="card" style={{ maxWidth: '500px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '2rem' }}>{product ? 'Editar Platillo' : 'Nuevo Platillo'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Nombre</label>
            <input 
              type="text" required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Precio</label>
              <input 
                type="number" required
                value={formData.price}
                onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Categoría</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)' }}
              >
                {['Aguachiles', 'Tostadas', 'Ceviches', 'Especialidades', 'Bebidas'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Descripción</label>
            <textarea 
              rows={3} required
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--card-border)', resize: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onClose} className="btn" style={{ flex: 1 }}>Cancelar</button>
            <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
}
