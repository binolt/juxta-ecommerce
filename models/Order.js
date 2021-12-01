import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true,
    },
    customer_email: {
        type: String,
        required: true
    },
    customer_address: {
        type: Object,
        required: true
    },
    amount_paid: {
        type: Number,
        required: true,
    },
    price_ids: {
        type: Array,
        required: true,
    },
    payment_intent_id: {
        type: String,
        required: true,
    },
    order_id: {
        type: String,
        required: true
    },
});

let Dataset = mongoose.models.order || mongoose.model("order", orderSchema);
export default Dataset;