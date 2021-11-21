import { createContext, useContext, useEffect, useState } from 'react';
import localforage from "localforage";

const AppContext = createContext();

export const cartStorage = localforage.createInstance({
  name: "cart"
});

export function CartContext({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //fetch cart data from localforage
    const fetchCart = async () => {
      const data = await cartStorage.getItem("cart");
      if(data) setCart(data);
    }

    fetchCart()
  }, [])

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