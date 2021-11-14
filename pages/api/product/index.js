import { fetchAll } from "../../../lib/product";

export default async(req, res) => {
    switch(req.method) {
        case "GET" : 
            fetchAllProducts(req, res);
            break;
        case "PUT" : 
            updateProduct(req, res);
            break;
        case "DELETE" : 
            removeProduct(req, res);
            break;
    }
}


const fetchAllProducts = async(req, res) => {
    const products = await fetchAll();
    console.log(products);
    res.json({msg: "fetch all"});
}

const updateProduct = async(req, res) => {
    res.json({msg: "update"});
}

const removeProduct = async(req, res) => {
    res.json({msg: "delete"});
}