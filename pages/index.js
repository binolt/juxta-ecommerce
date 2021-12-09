import { useAuth } from "../context/AuthContext"
import {useRef, useState} from "react"
import OrderService from "../services/OrderService";
import { useRouter } from "next/router";
import {setCookie} from "nookies";

export default function Home() {
  const {currentUser} = useAuth();
  const emailRef = useRef();
  const orderNumberRef = useRef();
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleOrderSearch = async(e) => {
    setMessage(null);
    e.preventDefault();
    const email = emailRef.current.value;
    const order_number = orderNumberRef.current.value;

    if(!email || !order_number) {
      setMessage({msgBody: "All fields must be filled in.", msgError: true});
      return;
    }

    const { order, error } = await OrderService.fetchOrder(email, order_number);

    //store order in cookies
    setCookie(null, 'current_order', JSON.stringify(order), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    //redirect user to order page
    router.push(`/orders/${order._id}`);
  }

  return (
    <div className="app">
      <h1>Home Page</h1>
      {currentUser && <p style={{marginTop: 20}}>Welcome Back, <strong>{currentUser.username}</strong></p>}
      <div style={{marginTop: 20}}>
        <h3>View your order</h3>
        <form onSubmit={handleOrderSearch} style={{display: 'flex', flexDirection: 'column', width: 250}}>
          <input ref={emailRef} type="text" placeholder="Email Address"/>
          <input ref={orderNumberRef} type="text" placeholder="Order Number"/>
          <button type="submit">Search</button>
          {message && <p>{message.msgBody}</p>}
        </form>
      </div>
    </div>
  )
}

