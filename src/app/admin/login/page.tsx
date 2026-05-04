"use client";

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Lock, User, LogIn } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Credenciales incorrectas. Intenta de nuevo.');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />
      
      <div className="section container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop: '6rem'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '400px', 
          background: 'var(--card-bg)', 
          padding: '2.5rem', 
          borderRadius: '24px',
          border: '1px solid var(--card-border)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ 
              width: '64px', 
              height: '64px', 
              background: 'rgba(196, 30, 58, 0.1)', 
              borderRadius: '20px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--primary)'
            }}>
              <Lock size={32} />
            </div>
            <h1 style={{ fontSize: '1.5rem' }}>Panel Administrativo</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ 
                padding: '0.75rem', 
                background: 'rgba(239, 68, 68, 0.1)', 
                color: 'var(--error)', 
                borderRadius: '12px', 
                fontSize: '0.9rem',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Usuario</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                  <User size={18} />
                </span>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem 0.75rem 3rem', 
                    borderRadius: '12px', 
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)'
                  }}
                  placeholder="admin"
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>Contraseña</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }}>
                  <Lock size={18} />
                </span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ 
                    width: '100%', 
                    padding: '0.75rem 1rem 0.75rem 3rem', 
                    borderRadius: '12px', 
                    border: '1px solid var(--card-border)',
                    background: 'var(--background)'
                  }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary" 
              style={{ width: '100%', borderRadius: '12px', padding: '0.8rem' }}
            >
              {loading ? 'Ingresando...' : 'Iniciar Sesión'} <LogIn size={20} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
