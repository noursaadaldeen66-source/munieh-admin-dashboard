
import React, { createContext, useContext, useState, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existItem = state.cartItems.find(x => x.product === action.payload.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product ? { ...x, qty: x.qty + action.payload.qty } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(x => x.product !== action.payload),
      };
    case 'CLEAR_CART':
        return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const initialState = { cartItems: [] };
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product, qty) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product: product._id, name: product.name, price: product.price, qty } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const clearCart = () => {
      dispatch({ type: 'CLEAR_CART' });
  }

  return (
    <CartContext.Provider value={{ cart: state, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
