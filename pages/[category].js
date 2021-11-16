import { DEFAULT_CATEGORIES } from "../lib/shop-data";
import { useRouter } from "next/router";

export default function Category(props) {
    const router = useRouter();

    const handleClick = (target) => {
        const title = target.title.toLowerCase().replace("/", " ");
        router.push({pathname: `/product/${title}`, query: {pid: target._id}})
    }
    
    return (
        <div>
            {props.category}
            <div style={{display: 'flex'}}>
            {props.products.map((product => {
                return (
                    <div onClick={() => handleClick(product)} key={product._id} style={{width: 250, backgroundColor: 'orange'}}>
                        <img src={product.image} style={{width: 250}}/>
                        <p>{product.title}</p>
                    </div>
                )
            }))}
            </div>
        </div>
    );
}

export const getStaticProps = async (ctx) => {
    const {category} = ctx.params;

    //fetch products based off category
    const res = await fetch(`http://localhost:3000/api/shop/${category}`);
    const products = await res.json();

    return {
        props: { products, category }
    }
}

export const getStaticPaths = async () => {
    const paths = DEFAULT_CATEGORIES.map((category) => ({
        params: { category },
    }))

    return {
        paths,
        fallback:false
    }
}