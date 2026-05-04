"use client";

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Plus, 
  LogOut,
  Package,
  MapPin,
  Phone,
  Clock
} from 'lucide-react';

interface AdminDashboardClientProps {
  initialStats: {
    totalSales: number;
    totalCosts: number;
    netProfit: number;
    orderCount: number;
    productCount: number;
  };
  recentOrders: any[];
}

export default function AdminDashboardClient({ initialStats, recentOrders }: AdminDashboardClientProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.push('/admin/login');
    return null;
  }

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <Navbar />
      
      <div className="section container" style={{ marginTop: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Panel de Control</h1>
            <p style={{ color: 'var(--muted)' }}>Bienvenido, administrador. Aquí tienes el pulso de El Chiltepín.</p>
          </div>
          <button 
            onClick={() => signOut()}
            className="btn" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--error)' }}
          >
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <MetricCard 
            title="Ventas Totales" 
            value={`$${initialStats.totalSales.toLocaleString()}`} 
            icon={<DollarSign color="var(--success)" />}
            trend="+12%"
            trendUp={true}
          />
          <MetricCard 
            title="Costos Operativos" 
            value={`$${initialStats.totalCosts.toLocaleString()}`} 
            icon={<TrendingDown color="var(--error)" />}
            trend="+5%"
            trendUp={false}
          />
          <MetricCard 
            title="Utilidad Neta" 
            value={`$${initialStats.netProfit.toLocaleString()}`} 
            icon={<TrendingUp color="var(--primary)" />}
            trend="+18%"
            trendUp={true}
          />
          <MetricCard 
            title="Órdenes" 
            value={initialStats.orderCount.toString()} 
            icon={<ShoppingBag color="var(--secondary)" />}
            trend="+8"
            trendUp={true}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Recent Orders */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem' }}>Últimos Pedidos</h2>
              <button className="btn" style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>Ver todos</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {recentOrders.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '2rem' }}>No hay pedidos recientes.</p>
              ) : (
                recentOrders.map(order => (
                  <div key={order.id} style={{ 
                    padding: '1.5rem', 
                    borderRadius: '16px', 
                    border: '1px solid var(--card-border)',
                    background: 'white'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontWeight: '700' }}>#{order.id.slice(-6).toUpperCase()}</span>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '20px', 
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        background: order.status === 'pending' ? '#FEF3C7' : '#D1FAE5',
                        color: order.status === 'pending' ? '#D97706' : '#059669'
                      }}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)' }}>
                        <User size={16} /> {order.customerName}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)' }}>
                        <Phone size={16} /> {order.customerPhone}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)', gridColumn: 'span 2' }}>
                        <MapPin size={16} /> {order.customerAddress}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--muted)' }}>
                        <Clock size={16} /> {new Date(order.createdAt).toLocaleTimeString()}
                      </div>
                      <div style={{ textAlign: 'right', fontWeight: '800', color: 'var(--primary)', fontSize: '1.1rem' }}>
                        Total: ${order.total}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Acciones Rápidas</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link href="/admin/dashboard/products" style={{ textDecoration: 'none' }}>
                  <QuickActionButton icon={<Package size={20} />} label="Gestionar Menú / Stock" />
                </Link>
                <Link href="/admin/dashboard/costs" style={{ textDecoration: 'none' }}>
                  <QuickActionButton icon={<Plus size={20} />} label="Agregar Gasto / Costo" />
                </Link>
                <QuickActionButton icon={<ShoppingBag size={20} />} label="Nuevo Pedido Manual" />
              </div>
            </div>

            <div className="card" style={{ background: 'var(--primary)', color: 'white' }}>
              <h3 style={{ marginBottom: '1rem' }}>Estado de Cocina</h3>
              <p style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '1.5rem' }}>
                Actualmente tienes 0 pedidos en preparación.
              </p>
              <button className="btn" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', width: '100%' }}>
                Ver monitor de cocina
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function MetricCard({ title, value, icon, trend, trendUp }: any) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <div style={{ 
        padding: '1rem', 
        borderRadius: '16px', 
        background: '#F1F5F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <div>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>{title}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>{value}</span>
          <span style={{ 
            fontSize: '0.75rem', 
            fontWeight: '700', 
            color: trendUp ? 'var(--success)' : 'var(--error)' 
          }}>
            {trend}
          </span>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label }: any) {
  return (
    <button className="btn" style={{ 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '1rem',
      justifyContent: 'flex-start',
      padding: '1rem',
      borderRadius: '12px',
      border: '1px solid var(--card-border)',
      background: 'white',
      color: 'var(--text)',
      transition: 'all 0.2s ease'
    }}>
      {icon}
      <span style={{ fontWeight: '600' }}>{label}</span>
    </button>
  );
}

function User({ size }: any) { return <ShoppingBag size={size} />; } // Simplified placeholder for User icon
