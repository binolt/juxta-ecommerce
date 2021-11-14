import { DEFAULT_CATEGORIES } from "../lib/shop-data";

export default function Category(props) {
    return (
        <div>
            {props.category}
        </div>
    );
}

export const getStaticProps = async (ctx) => {
    const {category} = ctx.params;

    return {
        props: {category}
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