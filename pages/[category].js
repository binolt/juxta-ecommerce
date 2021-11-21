import { DEFAULT_CATEGORIES, DEFAULT_SUBCATEGORIES, SUBCATEGORY_IDS } from "../lib/shop-data";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

const PROD_URL = 'https://wip.d357ssoqg6gnyt.amplifyapp.com';
const DEV_URL = 'http://localhost:3000';
const baseUrl = (process.env.NODE_ENV === "development") ? DEV_URL : PROD_URL;


export default function Category(props) {
    const router = useRouter();
    const subcategories = DEFAULT_SUBCATEGORIES[props.category];

    const handleClick = (target) => {
        const title = target.title.toLowerCase().replace("/", " ");
        router.push({pathname: `/product/${title}`, query: {pid: target._id}})
    }

    const toggleBrand = (target) => {
        console.log(target)
        const id = SUBCATEGORY_IDS[target];
        console.log(id);
        router.push({pathname: `/${props.category}`, query: {brand: id}})
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
                    <p onClick={() => toggleBrand(item)} key={`subcategory-${item}`}>{item}</p>
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