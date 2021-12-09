import { useEffect, useRef, useState } from "react";
import { checkoutStorage } from "../context/AuthContext";
import CheckoutService from "../services/CheckoutService";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useCart } from "../context/CartContext";
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { fetchPaymentIntent, appendInvoiceItems, finalizeStripeInvoice, createStripeCustomer, createStripeInvoice, calculateShipping } from "../lib/stripe";
import OrderService from "../services/OrderService";
import { useRouter } from "next/router"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const default_billing_details = {
    first_name: "",
    last_name: "",
    email_address: "",
    address_line_1: "",
    country: "",
    state: "",
    city: "",
    zipcode: ""
}

export default function Checkout(props) {
    const [message, setMessage] = useState(null);
    const [billing_details, setBillingDetails] = useState(default_billing_details);
    const [isLoaded, setIsLoaded] = useState(false);
    const [delivery_preference, setDeliveryPreference] = useState({pickup: false, shipping: false});
    const [delivery_message, setDeliveryMessage] = useState(null);
    const [shipping_address_preference, setShippingAddressPreference] = useState(true);

    useEffect(() => {
        const fetchBillingDetails = async() => {
            //fetch billing_details from local storage
            const local_billing_details = await checkoutStorage.getItem("billing_details");
            //push state if applicable
            if(local_billing_details) setBillingDetails(local_billing_details);
            //load application
            setIsLoaded(true)
        }

        const fetchDeliveryPreference = async () => {
            //fetch delivery_preference from local storage
            const local_delivery_preference = await checkoutStorage.getItem("delivery_preference");
            //push state if applicable
            if(local_delivery_preference) setDeliveryPreference(local_delivery_preference);
        }

        fetchBillingDetails();
        fetchDeliveryPreference()
    }, [])


    const handleInformationSubmit = async(e) => {
        setMessage(null);
        e.preventDefault();
        //few things we need to do here
        const {first_name, last_name, email_address, address_line_1, country, state, city, zipcode} = billing_details;

        //ensure all required inputs are filled
        if(!first_name || !last_name || !email_address || !address_line_1 || !country || !state || !city || !zipcode) {
            //display errors
            setMessage({msgBody: "Please fill in the required fields.", msgError: true});
            return;
        }

        //sync data in local storage
        await checkoutStorage.setItem("billing_details", billing_details);
        
        //move user to next step in checkout process
    }

    const handleChange = (e) => {
        const mutated_state = {
            ...billing_details,
            [e.target.name]: e.target.value,
        }
        setBillingDetails(mutated_state);
    }


    const handleDeliverySubmit = async() => {
        setDeliveryMessage(null);
        //ensure delivery_preference is selected
        if(!delivery_preference.shipping && !delivery_preference.pickup) {
            //dipslay errors
            setDeliveryMessage({msgBody: 'You must select one of the following.', msgError: true});
            return;
        }
        //sync local storage
        await checkoutStorage.setItem("delivery_preference", delivery_preference);
    }

    const handleCheckboxChange = (e) => {
        const mutated_state = {
            [e.target.name]: !delivery_preference[e.target.name],
            [e.target.value]: false
        };
        setDeliveryPreference(mutated_state);
    }


    return isLoaded && (
        <>
        <section>
            <h1>Billing Information</h1>
            <form onSubmit={handleInformationSubmit} style={{display: 'flex', flexDirection: 'column', width: 250}}>
                <input value={billing_details.first_name} name="first_name" type="text" placeholder="First Name" onChange={handleChange}/>
                <input value={billing_details.last_name} name="last_name" type="text" placeholder="Last Name" onChange={handleChange}/>
                <input value={billing_details.email_address} name="email_address" type="text" placeholder="Email Address" onChange={handleChange}/>
                <input value={billing_details.address_line_1} name="address_line_1" type="text" placeholder="Address Line 1" onChange={handleChange}/>
                <input value={billing_details.country} name="country"  type="text" placeholder="Country" onChange={handleChange}/>
                <input value={billing_details.state} name="state"  type="text" placeholder="State" onChange={handleChange}/>
                <input value={billing_details.city} name="city" type="text" placeholder="City" onChange={handleChange}/>
                <input value={billing_details.zipcode} name="zipcode" type="text" placeholder="Zipcode" onChange={handleChange}/>
                <span>
                <input onChange={handleCheckboxChange} checked={shipping_address_preference} type="checkbox" name="shipping_address_preference" value="pickup"/>
                <label htmlFor="shipping_address_preference">Use same shipping address</label>
                </span>
                {message && <p>{message.msgBody}</p>}
                <button type="submit">Next</button>
            </form>
        </section>
        <section style={{margin: '2rem 0'}}>
            <h1>Delivery Preference</h1>
            <input onChange={handleCheckboxChange} checked={delivery_preference.shipping} type="checkbox" name="shipping" value="pickup"/>
            <label htmlFor="shipping">Shipping</label>
            <input onChange={handleCheckboxChange}  checked={delivery_preference.pickup} type="checkbox" name="pickup" value="shipping"/>
            <label htmlFor="pickup">Pickup</label>
            <button onClick={handleDeliverySubmit}>Next</button>
            {delivery_message && <p>{delivery_message.msgBody}</p>}
        </section>
        <section>
            <h1>Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckoutPayment/>
            </Elements>
        </section>
        </>
    );
}

function CheckoutPayment() {
    const [payment_message, setPaymentMessage] = useState(null);

    //hooks
    const stripe = useStripe();
    const elements = useElements();
    const { cart } = useCart();
    const router = useRouter();

    const handleSubmit = async(e) => {
        e.preventDefault();

        //fetch payment_intent_id from cookies
        let { payment_intent_id, customer_id } = parseCookies();

        //if no existing payment_intent
        if(!payment_intent_id) {
            try {
                //create a new customer on stripe
                if(!customer_id) {
                    const id = await createStripeCustomer();
                    customer_id = id;
                }

                //store customer_id in cookies
                setCookie(null, 'customer_id', customer_id, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });

                //append invoice items to customer
                await appendInvoiceItems(cart, customer_id);

                //append shipping costs to user
                await calculateShipping(customer_id);

                //create invoice on customer
                const invoice_id = await createStripeInvoice(customer_id);

                //store invoice_id in cookies
                setCookie(null, 'invoice_id', invoice_id, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                
                //finalize invoice
                const finalized_invoice = await finalizeStripeInvoice(invoice_id);

                //update payment_intent_id
                payment_intent_id = finalized_invoice.payment_intent;

                //store payment_intent_id in cookies
                setCookie(null, 'payment_intent_id', payment_intent_id, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });

            } catch (err) {
                //display errors
                setPaymentMessage({msgBody: err.message, msgError: true});
                return;
            }
        }

        try {
            //fetch payment intent
            const payment_intent = await fetchPaymentIntent(payment_intent_id);

            //confirm card payment
            const { status } = await confirmCardPayment(payment_intent, elements, stripe);

            //on successful payment
            if(status === "succeeded") {
                //display success message
                setPaymentMessage({msgBody: "Payment Successfully processed !", msgError: false});

                //fetch invoice
                const completed_invoice = await fetchInvoice();

                //create new order in db
                const order = await createNewOrder(completed_invoice);

                //send email
                const { customer_name, customer_email, _id } = order;

                await CheckoutService.sendSuccessEmail({customer_email, customer_name, _id});

                //clear cookies
                destroyCookie(null, 'payment_intent_id');
                destroyCookie(null, 'customer_id');
                destroyCookie(null, 'invoice_id');

                // clear local storage
                checkoutStorage.removeItem('billing_details');
                checkoutStorage.removeItem('delivery_preference');

                //redirect to success page
                router.push({pathname: "/orders/success", query: {purchaseId: order._id}});
            }

            //on fail payment
        } catch (err) {
            //display errors
            setPaymentMessage({msgBody: err.message, msgError: true});
            return;
        }
    }
    return (
        <form onSubmit={handleSubmit} style={{width: 250}}>
            <CardElement/>
            <button type="submit" disabled={!stripe}>Submit Order</button>
            {payment_message && <p>{payment_message.msgBody}</p>}
        </form>
    )
}

const confirmCardPayment = async(payment_intent, elements, stripe) => {
    const {error, paymentIntent} = await stripe.confirmCardPayment(payment_intent.client_secret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    });
    //handle errors
    if(error) throw new Error(error.message, error.type);
    return paymentIntent;
}

const createNewOrder = async(completed_invoice) => {
    //format data
    const { customer_name, customer_email, customer_address, amount_paid, payment_intent, id } = completed_invoice;
    const price_ids = completed_invoice.lines.data;

    const payload = {
        customer_name, customer_email, customer_address, amount_paid, payment_intent_id: payment_intent, order_id : id, price_ids
    }

    //create new order in db
    const { order, error } = await OrderService.createOrder(payload);

    if(error) throw new Error("SOmething went wrong :/");

    //store order_id in cookies | expires in 12 hours
    setCookie(null, 'order_id', order._id, {
        maxAge: 30 * 24 * 60,
        path: '/',
    });

    return order;
}

const fetchInvoice = async() => {
    //fetch invoice from cookies
    const { invoice_id } = parseCookies();

    const { completed_invoice, error } = await CheckoutService.fetchInvoice(invoice_id);

    if(error) throw new Error("SOmething went wrong :/");

    return completed_invoice;;
}