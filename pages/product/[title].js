const PROD_URL = 'https://wip.d357ssoqg6gnyt.amplifyapp.com';
const DEV_URL = 'http://localhost:3000';
const baseUrl = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;

export default function Product(props) {
    return (
        <div>
            {props.product.title}
        </div>
    );
};


export const getServerSideProps = async (ctx) => {
    const {pid} = ctx.query;

    // fetch product based off pid
    const res = await fetch(`${baseUrl}/api/product/${pid}`);
    const product = await res.json();

    return {
        props:{
            product
        }
    }
}