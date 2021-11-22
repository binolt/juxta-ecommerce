import { cartStorage, useCart } from "../../context/CartContext";

const PROD_URL = 'https://wip.d357ssoqg6gnyt.amplifyapp.com';
const DEV_URL = 'http://localhost:3000';
const baseUrl = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;

export default function Product(props) {
    const {cart, setCart, setCartOpen} = useCart();

    const addToCart = async () => {
        //update global cart state
        const product = props.product;
        let updatedCart = [...cart];
        let inCart = false;

        //check for existing product in cart
        updatedCart.forEach((item, idx) =>{ 
            if(item._id === product._id) {
                //update quantity
                inCart = true;
                let quantity = item.quantity;
                const updatedItem = {
                    ...item,
                    quantity: quantity + 1
                }
                //remove old item and replace with updated item
                updatedCart.splice(idx, 1);
                updatedCart.splice(idx, 0, updatedItem);
                return;
            }
        });

        //if product is not in cart
        if(!inCart) {
            const newProduct = {...product, quantity: 1};
            updatedCart = [...updatedCart, newProduct];
        };

        setCart(updatedCart);

        //sync local storage
        await cartStorage.setItem("cart", updatedCart);

        setCartOpen(true)
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