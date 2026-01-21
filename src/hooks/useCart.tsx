import { createContext, useContext, useState, ReactNode } from "react";
import { Shirt } from "@/data/shirts";

// Definindo que a camisa no carrinho tem o campo preco
export interface CartItem {
  id: string;
  shirt: Shirt & { preco?: number }; 
  size: string;
  quantity: number;
  personalization?: {
    name: string;
    number: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

const BASE_PRICE = 159.90;
const PERSONALIZATION_PRICE = 30.00;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: Omit<CartItem, "id">) => {
    const id = `${item.shirt.id}-${item.size}-${item.personalization?.name || ""}-${item.personalization?.number || ""}`;
    
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, { ...item, id }];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const getTotal = () => {
    return items.reduce((total, item) => {
      const precoDaCamisa = Number(item.shirt.preco) || BASE_PRICE;
      const adicional = item.personalization ? PERSONALIZATION_PRICE : 0;
      return total + (precoDaCamisa + adicional) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export { BASE_PRICE, PERSONALIZATION_PRICE };