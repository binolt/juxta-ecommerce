import Product from "../models/Product";
import cloudinary from "cloudinary";
import Stripe from 'stripe';


//CONFIGURATION
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//     apiVersion: "2020-08-27"
// });
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const fetchAll = async () => {
    const products = await Product.find({});
    return products;
}

export const createProduct = async(payload) => {
    //add image upload with cloudinary
    
}

export const uploadImage = async (file) => {
    try {
        const { secure_url : image } = await cloudinary.v2.uploader.upload(file.content, {folder: 'surf-district'});
        return {image};
    } catch (err) {
        return {uploadError : {msg: err}}
    }
}

export const newStripeProduct = async (title, image) => {
    try {
        const {id} = await stripe.products.create({
            name: title,
            images: [image],
        });
        return {id};
    } catch (err) {
        return {productError : { type: err.type, msg: err.raw.message, fallback: "Something went wrong" }}
    }
}

export const newStripePrice = async (productId, value) => {
    try {
        const {id} = await stripe.prices.create({
            unit_amount: value * 100,
            currency: "usd",
            product: productId
        });
        return {priceId: id}
    } catch (err) {
        console.log(err);
        return {priceError: { type: err.type, msg: err.raw.message, fallback: "Something went wrong" }}
    }
}