import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchBrands, fetchFilter, fetchQueries, filterBrands } from "../lib/category";
import { filterProducts } from "../lib/filter";
import { DEFAULT_CATEGORIES, DEFAULT_SUBCATEGORIES } from "../lib/shop-data";

//URLS
const PROD_URL = 'https://wip.d357ssoqg6gnyt.amplifyapp.com';
const DEV_URL = 'http://localhost:3000';
const baseUrl = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;

const filterData = [
    {label: "Featured", value: 10},
    {label: "Popular", value: 20},
    {label: "Date Added", value: 30},
    {label: "Price: Low - High", value: 40},
    {label: "Price: High - Low", value: 50},
]

export default function Category(props) {
    const [brands, setBrands] = useState({});
    const [filterValue, setFilterValue] = useState(10);
    const [products, setProducts] = useState([])
    const router = useRouter();
    
    const subcategories = DEFAULT_SUBCATEGORIES[props.category];

    useEffect(() => {
        //fetch filter value
        const filter = fetchFilter(router);
        setFilterValue(filter);

        //fetch brand value
        const res = fetchBrands(router, subcategories);
        setBrands(res);

        //filter products based off brand
        const brandProducts = filterBrands(props.products, res);

        //filter products based off filter value
        const filteredProducts = filterProducts(brandProducts, parseInt(filter));
        setProducts(filteredProducts)

    }, [router.query.category])

    const handleClick = (target) => {
        const title = target.title.toLowerCase().replace("/", " ");
        router.push({pathname: `/product/${title}`, query: {pid: target._id}})
    }

    const toggleBrand = (target) => {
        //mutate existing state
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

        //update URL queries
        router.push({pathname: `/${props.category}`, query: result});

        //filter products based of brand
        const brandProducts = filterBrands(props.products, updatedBrands);

        //filter products based off filter value
        const filteredProducts = filterProducts(brandProducts, parseInt(filterValue));
        
        //push state
        setProducts(filteredProducts);
        setBrands(updatedBrands);
    }

    const handleFilterChange = (e) => {
        const filter = e.target.value;
        
        //spread existing queries from router
        const currentQueries = {...router.query};
        delete currentQueries['category'];

        //update URL queries
        router.push({pathname: `/${props.category}`, query: {...currentQueries, filter}});

        //filter products
        const filteredProducts = filterProducts(products, parseInt(filter));

        //push state
        setProducts(filteredProducts)
        setFilterValue(filter);
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
                    {filterData.map(({label, value}) => 
                        <option key={`filter-select-${value}`} value={value}>{label}</option>
                    )}
                </select>
            </span>
            <div style={{display: 'flex'}}>
                {products && products.map((product => 
                    <div onClick={() => handleClick(product)} key={product._id} style={{width: 250, backgroundColor: 'orange'}}>
                        <img src={product.image} style={{width: 250}}/>
                        <p>{product.title}</p>
                        <p>{product.price}</p>
                    </div>
                ))}
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