import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    switch(req.method) {
        case "GET" :
            fetchCustomer(req, res);
            break;
        case "POST" : 
            createCustomer(req, res);
            break;
        case "PUT" : 
            updateCustomer(req, res);
            break;
        case "DELETE" :
            deleteCustomer(req, res);
            break;
    }
}


const fetchCustomer = async(req, res) => {
    res.json({msg: "get"})

}
const createCustomer = async(req, res) => {
    try {
        const customer = await stripe.customers.create(req.body);
        res.status(201).json({id: customer.id});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: {msg: err.raw.message}})
    }
}
const updateCustomer = async(req, res) => {

}
const deleteCustomer = async(req, res) => {

}

