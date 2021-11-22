import { DEFAULT_CATEGORIES, DEFAULT_SUBCATEGORIES, SUBCATEGORY_IDS } from "../lib/shop-data";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { reverseMap } from "../utils/helpers";

const PROD_URL = 'https://wip.d357ssoqg6gnyt.amplifyapp.com';
const DEV_URL = 'http://localhost:3000';
const baseUrl = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;


export default function Category(props) {
    const router = useRouter();
    const [brands, setBrands] = useState({});
    const subcategories = DEFAULT_SUBCATEGORIES[props.category];

    useEffect(() => {
        //fetch brands by splitting the URL
        let brandList = router.asPath.split("?");
        let activeBrands = [];
        brandList.shift()
        
        //loop through brands array and push its corresponding value into an array
        if(brandList.length) {
            let tempList = brandList[0].split("&");
            tempList.forEach((b) => {
                //reverse the SUBCATEGORY_IDS array so we can use the id as a key
                const reversedIds = reverseMap(SUBCATEGORY_IDS);
                const value = b.split("=")[1]
                activeBrands.push(reversedIds[value][0])
            });
        }

        let tempBrands = [];
        //create array of objects with subcategories and a boolean
        subcategories.forEach((subcat) => {
            let obj = {};
            let isActive = false;
            //if brand is active / set value to true
            for(let i = 0; i < activeBrands.length; i++) {
                let b = activeBrands[i];
                if(b == subcat) {
                    isActive = true;
                    break;
                }
            }
            //push obj into arr
            obj = {[subcat] : isActive}
            tempBrands.push(obj);
        })

        //spread array into a new object
        const obj = {}
        const result = Object.assign({}, obj, ...tempBrands);

        setBrands(result);
    }, [router.query.category])

    const handleClick = (target) => {
        const title = target.title.toLowerCase().replace("/", " ");
        router.push({pathname: `/product/${title}`, query: {pid: target._id}})
    }

    const toggleBrand = (target) => {
        //update brands
        const updatedBrands = {
            ...brands,
            [target]: !brands[target]
        };
        
        //loop over updatedBrands and push toggled brands into an array
        let queryList = [];
        Object.keys(updatedBrands).forEach((brand) => {
            if(updatedBrands[brand]) {
                queryList.push(SUBCATEGORY_IDS[brand]);
            }
        });

        //create a new array with indexed brands
        let tempQueries = [];
        queryList.forEach((q, idx) => {
            const obj = {[`brand${idx}`] : q}
            tempQueries.push(obj)
        });

        //spread the array of objects into an object
        const obj = {};
        const result = Object.assign({}, obj, ...tempQueries);

        //update the URL queries
        router.push({pathname: `/${props.category}`, query: result})

        //update state
        setBrands(updatedBrands);
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