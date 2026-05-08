"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, User, X } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { itemCount, toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/images/logo.png" 
            alt="Logo" 
            width={40} 
            height={40} 
            style={{ borderRadius: '50%', objectFit: 'contain' }}
          />
          <span style={{ color: 'var(--secondary)' }}>El</span> Chiltepín
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.link}>Inicio</Link>
          <Link href="/menu" className={styles.link}>Menú</Link>
          {/* <Link href="/pedidos" className={styles.link}>Mis Pedidos</Link> */}
        </div>

        <div className={styles.actions}>
          <Link href="/admin" className={styles.link} title="Admin">
            <User size={20} />
          </Link>
          
          <button 
            className={styles.cartButton} 
            aria-label="Carrito de compras"
            onClick={toggleCart}
          >
            <ShoppingCart size={24} />
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </button>

          <button 
            className={styles.mobileMenuToggle} 
            style={{ display: 'none' }} // Hidden for now until mobile menu logic is added
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
