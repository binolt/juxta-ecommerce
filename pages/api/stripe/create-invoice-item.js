import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const invoiceItem = await stripe.invoiceItems.create(req.body);
    res.json(invoiceItem)
}