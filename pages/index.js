import {useEffect, useRef, useState} from "react"
import BlobSvg from "../public/layered_1.svg";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 0);
  })
  // const handleOrderSearch = async(e) => {
  //   setMessage(null);
  //   e.preventDefault();
  //   const email = emailRef.current.value;
  //   const order_number = orderNumberRef.current.value;

  //   if(!email || !order_number) {
  //     setMessage({msgBody: "All fields must be filled in.", msgError: true});
  //     return;
  //   }

  //   const { order, error } = await OrderService.fetchOrder(email, order_number);

  //   //store order in cookies
  //   setCookie(null, 'current_order', JSON.stringify(order), {
  //     maxAge: 30 * 24 * 60 * 60,
  //     path: '/',
  //   });

  //   //redirect user to order page
  //   router.push(`/orders/${order._id}`);
  // }

  return (
    <div className="app_wrapper" style={{opacity: loaded ? 1 : 0}}>
      <section className="app_main">
        <div className="app_main_container">
          <div className="app_main_content">
            <h1 style={{transform: loaded && 'translateY(0)', opacity: loaded ? 1 : 0}}>Your one stop<br/><span>e-commerce</span> solution</h1>
            <p style={{transform: loaded && 'translateY(0)', opacity: loaded ? 1 : 0}}>Built with Next.js, Aoco provides developers with all of the tools necessary to
              create a fluid shopping experience for users all around the globe</p>
            <button style={{transform: loaded && 'translateY(0)', opacity: loaded ? 1 : 0}}>
              <div>
                View our features
                <ArrowDownwardIcon/>
              </div>
            </button>
          </div>
        </div>
        <BlobSvg/>
      </section>
      <section className="app_features">
        <p>Hello</p>
      </section>
    </div>
  )
}

