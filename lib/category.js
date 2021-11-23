import { reverseMap } from "../utils/helpers";
import { SUBCATEGORY_IDS } from "./shop-data";

export const fetchBrands = (router, subcategories) => {
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
    return 10;
}