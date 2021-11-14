import Product from "../models/Product";

export const fetchAll = async () => {
    const products = await Product.find({});
    return products;
}

export const newProduct = async(payload) => {
}
