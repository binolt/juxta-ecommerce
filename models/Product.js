import mongoose from "mongoose";
import { randomIntFromInterval } from "../utils/helpers";

const productSchema = new mongoose.Schema({
    stock: {
        type: Number,
        required: true,
        default: randomIntFromInterval(0, 100)
    },
    title: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    featureRating: {
        type: Number,
        required: true,
        default: randomIntFromInterval(0, 20)
    },
    description: {
        type: String,
        required: true,
        default: "product testing"
    },
    price: {
        type: Number,
        required: true,
        default: 19.99
    },
    options: {
        type: Array,
    },
    deliveryMethod: {
        type: Array,
        required: true,
        default: ["shipping", "pickup"]
    },
    category: {
        type: String,
        required: true
    },
    subcategory :{
        type: String,
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    sales: {
        type: Number,
        default: randomIntFromInterval(0, 500),
    },
    priceId: {
        type: String,
        required: true
    }

});

let Dataset = mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;