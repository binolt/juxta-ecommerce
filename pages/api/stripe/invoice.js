import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    switch(req.method) {
        case "GET" :
            fetchInvoice(req, res);
            break;
        case "POST" : 
            createInvoice(req, res);
            break;
        case "PUT" : 
            updateInvoice(req, res);
            break;
        case "DELETE" :
            deleteInvoice(req, res);
            break;
    }
}

const fetchInvoice = async(req, res) => {
    res.json({msg: "get"})
}

const createInvoice = async(req, res) => {
    try {
        const invoice = await stripe.invoices.create({
            customer: req.body,
        });
        res.json({invoice_id: invoice.id})
    } catch (err) {
        res.status(500).json({error: {msg: err.raw.message, type: err.type}})
    }
}

const updateInvoice = async(req, res) => {

}
const deleteInvoice = async(req, res) => {

}
