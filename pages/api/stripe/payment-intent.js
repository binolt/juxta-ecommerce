import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
    const payment_intent_id = req.url.replace("/api/stripe/payment-intent?id=", "");
    const payment_intent = await stripe.paymentIntents.retrieve(
        payment_intent_id
    );
    res.json(payment_intent)
}