import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Utensils } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image 
        src="/images/hero.png" 
        alt="Aguachile El Chiltepín" 
        fill 
        priority
        className={styles.backgroundImage}
      />
      <div className={styles.overlay} />
      
      <div className={`container ${styles.content}`}>
        <div className={styles.badge}>Sabor Auténtico de Culiacán</div>
        <h1 className={styles.title}>
          Mariscos <span style={{ color: 'var(--primary)' }}>El Chiltepín</span>
        </h1>
        <p className={styles.subtitle}>
          Llevamos el sabor fresco y picosito de la costa de Sinaloa directo a tu mesa en Aguascalientes. Aguachiles, tostadas y la mejor sazón de la región.
        </p>
        
        <div className={styles.cta}>
          <Link href="/menu" className="btn btn-primary">
            Ver Menú <Utensils size={20} />
          </Link>
          <Link href="/menu" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
            Hacer Pedido <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
