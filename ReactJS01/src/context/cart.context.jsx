import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  updateCartQty: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart:v1");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    const id = product.id || product.ID;
    setCart((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) {
        return prev.map((p) => (p.id === id ? { ...p, qty: p.qty + qty } : p));
      }
      const item = {
        id,
        name: product.name,
        price: product.price,
        image: (product.images && product.images[0]) || product.image || "",
        qty,
      };
      return [item, ...prev];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const updateCartQty = (id, qty) => {
    const safeQty = Math.max(1, Number(qty || 1));
    setCart((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: safeQty } : p)),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateCartQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
