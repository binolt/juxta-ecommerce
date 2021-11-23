import { DEFAULT_CATEGORIES, DEFAULT_SUBCATEGORIES, SUBCATEGORY_IDS } from "../lib/shop-data";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { reverseMap } from "../utils/helpers";
import { fetchBrands, fetchFilter, fetchQueries } from "../lib/category";

const PROD_URL = 'https://wip.d357ssoqg6gnyt.amplifyapp.com';
const DEV_URL = 'http://localhost:3000';
const baseUrl = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;


export default function Category(props) {
    const router = useRouter();
    const [brands, setBrands] = useState({});
    const [filterValue, setFilterValue] = useState(10);
    const subcategories = DEFAULT_SUBCATEGORIES[props.category];

    useEffect(() => {
        //fetch filter value
        const filter = fetchFilter(router);
        setFilterValue(filter);

        //fetch brand value
        const res = fetchBrands(router, subcategories);
        setBrands(res);
        
    }, [router.query.category])

    const handleClick = (target) => {
        const title = target.title.toLowerCase().replace("/", " ");
        router.push({pathname: `/product/${title}`, query: {pid: target._id}})
    }

    const toggleBrand = (target) => {
        //update existing state
        const updatedBrands = {
            ...brands,
            [target]: !brands[target]
        };

        //generate query object
        let result = fetchQueries(updatedBrands);

        //check for existing filter query and append it to the object
        if(router.query.filter) {
            result = {
                ...result,
                filter: router.query.filter
            }
        }

        //update the URL queries
        router.push({pathname: `/${props.category}`, query: result})

        //push state
        setBrands(updatedBrands);
    }

    const handleFilterChange = (e) => {
        setFilterValue(e.target.value);
        const currentQueries = {...router.query};
        delete currentQueries['category'];
        router.push({pathname: `/${props.category}`, query: {...currentQueries, filter: e.target.value}})
    }

    return (
        <div>
            <h1>Shop {props.category}</h1>
            <span style={{display: 'flex', margin: '1rem 0'}}>
                {DEFAULT_CATEGORIES.map((item) =>
                    <Link key={`navigation-${item}`} href={`/${item}`}>
                        <p style={{marginRight: 10, cursor: 'pointer', color: props.category === item && 'orange'}}>
                            {item}
                        </p>
                    </Link>
                )}
            </span>
            <span style={{marginBottom: '1rem', display: 'block'}}>
                <p>Filtering Options</p>
                <select onChange={handleFilterChange} value={filterValue}>
                    <option value={10}>Popularity</option>
                    <option value={20}>Price : Low - High</option>
                    <option value={30}>Price : High - Low</option>
                </select>
            </span>
            <div style={{display: 'flex'}}>
            {props.products && props.products.map((product => {
                return (
                    <div onClick={() => handleClick(product)} key={product._id} style={{width: 250, backgroundColor: 'orange'}}>
                        <img src={product.image} style={{width: 250}}/>
                        <p>{product.title}</p>
                    </div>
                )
            }))}
            </div>
            <span>
                {subcategories.map((item) => 
                    <p style={{color: brands[item] && 'orange'}} onClick={() => toggleBrand(item)} key={`subcategory-${item}`}>{item}</p>
                )}
            </span>
        </div>
    );
}

export const getStaticProps = async (ctx) => {
    const {category} = ctx.params;

    // //fetch products based off category
    const res = await fetch(`${baseUrl}/api/shop/${category}`);
    const products = await res.json();

    if(products) {
        return {
            props: { products, category }
        }
    }

    return {
        props: { category }
    }
}

export const getStaticPaths = async () => {
    const paths = DEFAULT_CATEGORIES.map((category) => ({
        params: { category },
    }))

    return {
        paths,
        fallback : false
    }
}