import { DEFAULT_CATEGORIES } from "../lib/shop-data";
import { useRouter } from "next/router";

const PROD_URL = 'https://wip.d357ssoqg6gnyt.amplifyapp.com';
const DEV_URL = 'http://localhost:3000';
const baseUrl = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;


export default function Category(props) {
    const router = useRouter();
    const {category} = router.query;

    const handleClick = (target) => {
        const title = target.title.toLowerCase().replace("/", " ");
        router.push({pathname: `/product/${title}`, query: {pid: target._id}})
    }

    return (
        <div>
            <div style={{display: 'flex'}}>
                <p>{category}</p>
            {/* {props.products.map((product => {
                return (
                    <div onClick={() => handleClick(product)} key={product._id} style={{width: 250, backgroundColor: 'orange'}}>
                        <img src={product.image} style={{width: 250}}/>
                        <p>{product.title}</p>
                    </div>
                )
            }))} */}
            </div>
        </div>
    );
}

// export const getStaticProps = async (ctx) => {
//     const {category} = ctx.params;

//     //fetch products based off category
//     const res = await fetch(`${baseUrl}/api/shop/${category}`);
//     const products = await res.json();

//     return {
//         props: { products }
//     }
// }

// export const getStaticPaths = async () => {
//     const paths = DEFAULT_CATEGORIES.map((category) => ({
//         params: { category },
//     }))

//     return {
//         paths,
//         fallback:false
//     }
// }