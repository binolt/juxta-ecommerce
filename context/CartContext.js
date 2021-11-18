import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function CartContext({ children }) {
  const [cart, setCart] = useState(null);

  const value = {
      cart,
      setCart,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useCart() {
  return useContext(AppContext);
}