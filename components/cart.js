import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { cartStorage, useCart } from "../context/CartContext";
import Drawer from '@mui/material/Drawer';

export default function Cart () {
  const {cart, setCart, setCartOpen, cartOpen} = useCart();
  const [total, setTotal] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const calcTotal = () => {
      let total = 0;
      cart.forEach((product) => {
        const {price, quantity} = product;
        total += price * quantity;
      });
      setTotal(total.toFixed(2));
    }

    calcTotal()
  }, [cart])

  const handleRemove = async (index) => {
    //update global cart state
    let updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    //update cart local storage
    await cartStorage.setItem("cart", updatedCart);
  }

  const handleCheckout = () => {
    setCartOpen(false);
    router.push("/checkout");
  }

  return (
    <Drawer
      anchor='right'
      open={cartOpen}
      onClose={() => setCartOpen(false)}
    >
      <h1>Cart</h1>
      {cart.map((product, idx) => 
        <span key={`cart-item-${product._id}`} style={{display: 'flex'}}>
          <p>{product.title}</p>
          <p style={{margin: '0 1rem'}}>Quantity : {product.quantity}</p>
          <button onClick={() => handleRemove(idx)}>Remove</button>
        </span>
      )}
      <h3>Total: {total}</h3>
      <button onClick={handleCheckout}>Checkout</button>
    </Drawer>
  );
}