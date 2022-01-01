import {useEffect, useRef, useState} from "react"
import BlobSvg from "../public/layered_1.svg";
import Blob2Svg from "../public/layered_2.svg";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShieldIcon from '@mui/icons-material/Shield';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import StorageIcon from '@mui/icons-material/Storage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Particles from "react-tsparticles";
import { Link, Element } from "react-scroll";
import LaunchIcon from '@mui/icons-material/Launch';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

export const options = {
    fpsLimit: 60,
    particles: {
      color: {
        value: "#ffffff",
      },
      move: {
        direction: "none",
        enable: true,
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        value: 25,
      },
      opacity: {
        value: 0.25,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 10,
      },
    },
}

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
            <Fade bottom when={loaded} duration={1500} distance="50px">
            <h1>Your one stop<br/><span>e-commerce</span> solution</h1>
            </Fade>
            <Fade bottom when={loaded} duration={1700} distance="50px">
            <p>Built with Next.js, Aoco provides developers with all of the tools necessary to
              create a fluid shopping experience for users all around the globe</p>
            </Fade>
            <Fade when={loaded} delay={300} duration={2500}>
            <Link to="features" smooth={true} duration={1700}>
              <button className="app_gradient_button">
                <div>
                  View our features
                  <ArrowDownwardIcon/>
                </div>
              </button>
            </Link>
            </Fade>
          </div>
        </div>
        <BlobSvg/>
      </section>
      <Element name="features" className="app_features">
        <div className="app_features_content">
          <Fade bottom delay={100} duration={2000} >
          <h2>See what's included.</h2>
          </Fade>
          <div className="app_features_item_wrapper">
          <Fade bottom delay={300} duration={1500}>

          <div className="app_features_item">
            <div className="icon">
              <ShieldIcon/>
            </div>
            <span className="body">
              <h6>Secure Payments</h6>
              <p>Collect Payments from around the globe with our custom payment flow built on top of stripe.</p>
            </span>
          </div>

          </Fade>
          <Fade bottom delay={400} duration={1800} >
            <div className="app_features_item">
              <div className="icon">
                <StorageIcon/>
              </div>
              <span className="body">
                <h6>Server-Side Rendering</h6>
                <p>Supports out of the box server-side rendering to increase your rankings in search engine results.</p>
              </span>
            </div>
          </Fade>

          <Fade bottom delay={400} duration={1900}> 
          <div className="app_features_item">
            <div className="icon">
              <VpnKeyIcon/>
            </div>
            <span className="body">
              <h6>Authentication</h6>
              <p>Secure authentication system built with passport and oauth, that supports 3rd party authorization.</p>
            </span>
          </div>
          </Fade>

          <Fade bottom delay={400} duration={2000}>
          <div className="app_features_item">
            <div className="icon">
              <ShoppingCartIcon/>
            </div>
            <span className="body">
              <h6>Cart</h6>
              <p>Robust cart structure that enhances the user and developer experience to another level.</p>
            </span>
          </div>
          </Fade>
          </div>
          <div className="app_features_button_wrapper">
            <Fade bottom delay={500} duration={1500}>
            <Link to="started" smooth={true} duration={1700}>
            <button className="app_gradient_button">
                <div>
                  View our features
                  <ArrowDownwardIcon/>
                </div>
            </button>
            </Link>
            </Fade>
          </div>
        </div>
        <Blob2Svg className="blob_2"/>
      </Element>
      <Element name="started" className="app_started">
        <Fade duration={2000}>
        <Particles
          id="tsparticles"
          canvasClassName="tsparticles_canvas"
          options={options}
    />
    </Fade>
        <div className="app_started_wrapper">
          <div className="app_started_content">
            <Fade bottom delay={200} duration={1500}>
              <h2>Get started on Github<RocketLaunchIcon/></h2>
            </Fade>
            <Fade bottom delay={300} duration={1800}>
              <p>Kickstart your adventure by cloning the repository over at github.</p>
            </Fade>
            <Fade delay={300} duration={1500}>
              <span>
                <button>
                  Get Started
                  <LaunchIcon/>
                </button>
              </span>
            </Fade>
          </div>
        </div>
      </Element>
    </div>
  )
}

