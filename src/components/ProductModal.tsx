"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, Check } from 'lucide-react';
import { Product } from '@/lib/data';
import styles from './ProductModal.module.css';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (customizations: any, quantity: number) => void;
}

const EXTRAS = [
  { name: 'Extra aguacate', price: 25 },
  { name: 'Extra pulpo', price: 45 },
  { name: 'Extra camarón', price: 45 },
  { name: 'Tostadas extra (3 pzas)', price: 20 },
];
const INGREDIENTS_TO_REMOVE = ['Cebolla', 'Cilantro', 'Pepino', 'Tomate'];

export default function ProductModal({ product, isOpen, onClose, onConfirm }: ProductModalProps) {
  const [selectedExtras, setSelectedExtras] = useState<{name: string, price: number}[]>([]);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const toggleExtra = (extra: {name: string, price: number}) => {
    setSelectedExtras(prev => 
      prev.find(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    );
  };

  const toggleIngredient = (ing: string) => {
    setRemovedIngredients(prev => 
      prev.includes(ing) ? prev.filter(i => i !== ing) : [...prev, ing]
    );
  };

  const extraTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const finalPrice = product.price + extraTotal;

  const handleConfirm = () => {
    onConfirm({
      extras: selectedExtras,
      removedIngredients,
      notes
    }, quantity);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={20} />
        </button>

        <div className={styles.imageSection}>
          <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
        </div>

        <div className={styles.content}>
          <div className={styles.titleRow}>
            <h2 style={{ fontSize: '1.25rem' }}>{product.name}</h2>
            <div className={styles.price}>${product.price}</div>
          </div>
          <p className={styles.description}>{product.description}</p>

          {/* Extras */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Extras <span className={styles.tag}>Opcional</span>
            </h3>
            <div className={styles.optionsGrid}>
              {EXTRAS.map(extra => {
                const isActive = selectedExtras.find(e => e.name === extra.name);
                return (
                  <div 
                    key={extra.name} 
                    className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                    onClick={() => toggleExtra(extra)}
                  >
                    <span>{extra.name}</span>
                    <span className={styles.optionPrice}>+${extra.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Remove Ingredients */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              Quitar ingredientes <span className={styles.tag}>Opcional</span>
            </h3>
            <div className={styles.optionsGrid}>
              {INGREDIENTS_TO_REMOVE.map(ing => {
                const isActive = removedIngredients.includes(ing);
                return (
                  <div 
                    key={ing} 
                    className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                    onClick={() => toggleIngredient(ing)}
                  >
                    Sin {ing} {isActive && <Check size={14} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Special Notes */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Notas especiales</h3>
            <textarea 
              className={styles.textarea} 
              rows={3} 
              placeholder="Ej. extra limón, sin sal..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.qtyControl}>
            <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              <Minus size={20} />
            </button>
            <span style={{ fontWeight: '700', fontSize: '1.2rem', minWidth: '20px', textAlign: 'center' }}>
              {quantity}
            </span>
            <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>
              <Plus size={20} />
            </button>
          </div>

          <button className={styles.submitBtn} onClick={handleConfirm}>
            Agregar • ${finalPrice * quantity}
          </button>
        </div>
      </div>
    </div>
  );
}
