import Product from "../models/Product";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const fetchAll = async () => {
    const products = await Product.find({});
    return products;
}

export const createProduct = async(payload) => {
    //add image upload with cloudinary
    
}
