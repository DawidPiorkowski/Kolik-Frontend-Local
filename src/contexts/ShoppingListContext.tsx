import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
  name: string;
  price: number;
  store: string;
  quantity?: number;
  image?: string;
};

type ShoppingListContextType = {
  list: Product[];
  setList: React.Dispatch<React.SetStateAction<Product[]>>;
  addItem: (item: Product) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
};

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider = ({ children }: { children: ReactNode }) => {
  const [list, setList] = useState<Product[]>([]);

  const addItem = (item: Product) => {
    setList((prev) => [...prev, { ...item, quantity: 1 }]);
  };

  const updateQuantity = (index: number, quantity: number) => {
    setList((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item))
    );
  };

  const removeItem = (index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <ShoppingListContext.Provider value={{ list, setList, addItem, updateQuantity, removeItem }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (!context) throw new Error('useShoppingList must be used within ShoppingListProvider');
  return context;
};
