import Order from "../models/Order";
import dbConnect from "../utils/mongodb";

dbConnect();

export const createNewOrder = async(payload) => {
    try {
        const order = await new Order(payload);
        await order.save();
        return order;
    } catch (error) {
        console.log(error);
        //handle errors
        let errors = [];
        const error_list = Object.keys(error.errors);
        if(error_list.length > 0) {
            Object.keys(error.errors).forEach((err) => {
                const { message, type } = error.errors[err].properties;
                errors.push({message, type});
                return;
            });
        }
        throw new Error(errors[0].message, errors[0].type)
    }
}

export const fetchOrder = async(id) => {
    try {
        const order = await Order.findOne({_id: id});
        return { order };
    } catch (err) {
        return { error: err.reason.toString() }
    }
}

function Error(message, type) {
    this.message = message;
    this.type = type;
}