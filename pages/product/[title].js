import { useCart } from "../../context/CartContext";

const PROD_URL = 'https://wip.d357ssoqg6gnyt.amplifyapp.com';
const DEV_URL = 'http://localhost:3000';
const baseUrl = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;

export default function Product(props) {
    const {cart, setCart} = useCart();

    const addToCart = async () => {
        console.log(props.product);
    }

    return (
        <div>
            <p>PID: {props.pid}</p>
            <p>{props.product && props.product.title}</p>
            {props.product && <img style={{width: 250}} src={props.product.image}/>}
            <button onClick={addToCart}>Add to cart</button>
        </div>
    );
};


export const getServerSideProps = async (ctx) => {
    // const {pid} = ctx.query;
    const {pid} = ctx.query;

    // fetch product based off pid
    const res = await fetch(`${baseUrl}/api/product/${pid}`);
    const product = await res.json();

    if(product) {
        return {
            props: {
                product, pid
            }
        }
    }

    return {
        props:{
            pid
        }
    }
}