import { reverseMap } from "../utils/helpers";
import { SUBCATEGORY_IDS } from "./shop-data";

export const fetchBrands = (router, subcategories) => {
    //fetch brands by splitting the URL
    let url = router.asPath.split("?");
    let activeBrands = [];
    url.shift();

    //loop through url and look for brand queries
    for(let i = 0; i < url.length; i++) {
        let target = url[i];
        if(target.includes('brand')) {
            //reverse subcategory_ids arr so we can use the brand value as a key
            const reversedIds = reverseMap(SUBCATEGORY_IDS);
            //split string into an array
            target = target.split("&");
            target.forEach((query) => {
                if(query.includes("brand")) {
                    //push brand queries into an active array
                    const value = query.split("=")[1];
                    const brand = reversedIds[value][0];
                    activeBrands.push(brand);
                }
            });
            break;
        }
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
    return Object.assign({}, obj, ...tempBrands);
};

export const fetchQueries = (updatedBrands) => {
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
    return Object.assign({}, obj, ...tempQueries);
}


export const fetchFilter = (router) => {
    const url = router.asPath.split("?");
    url.shift();

    for(let i = 0; i < url.length; i++) {
        if(url[i].includes("filter")) {
            const filter = url[i].split("&");
            for (let i = 0; i < filter.length; i++) {
                if(filter[i].includes("filter")) {
                    const value = filter[i].split("=")[1];
                    return value;
                }
            }
            break;
        }
    }

    //default value
    return 10;
}


export const filterBrands = (products, brands) => {
    const blist = Object.keys(brands);
        
    let filteredProducts = [];
    let isBrand = false;
    for(let i = 0; i < blist.length; i++) {
        const isToggled = brands[blist[i]];
        if(isToggled) {
            isBrand = true;
            const brand = blist[i];
            products.forEach((product) => {
                if(product.subcategory === brand) {
                    filteredProducts.push(product);
                }
            })
        }
    }

    if(isBrand) return filteredProducts;
    return products;

}