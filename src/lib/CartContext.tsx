"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from './data';

export interface CartItem extends Product {
  quantity: number;
  customizations?: {
    spiceLevel?: string;
    extras?: { name: string, price: number }[];
    removedIngredients?: string[];
    notes?: string;
  };
  customPrice?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, customizations?: CartItem['customizations']) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('chiltepin_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('chiltepin_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, customizations?: CartItem['customizations']) => {
    const extraTotal = customizations?.extras?.reduce((sum, e) => sum + e.price, 0) || 0;
    const finalPrice = product.price + extraTotal;
    
    // Generate a unique ID for customized items so they don't always merge if customizations differ
    const customizationKey = customizations ? JSON.stringify(customizations) : '';
    
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        JSON.stringify(item.customizations) === customizationKey
      );
      
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && JSON.stringify(item.customizations) === customizationKey) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { 
        ...product, 
        quantity: 1, 
        customizations, 
        customPrice: finalPrice 
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + ((item.customPrice || item.price) * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      cartTotal, itemCount, isCartOpen, setIsCartOpen, toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
