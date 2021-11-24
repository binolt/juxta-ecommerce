import { useEffect, useRef, useState } from "react";
import { checkoutStorage } from "../context/AuthContext";
import CheckoutService from "../services/CheckoutService";
import { parseCookies, setCookie } from "nookies";
import { useCart } from "../context/CartContext";

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

    const {cart} = useCart();

    useEffect(() => {
        const fetchBillingDetails = async() => {
            //fetch billing_details from local storage
            const local_billing_details = await checkoutStorage.getItem("billing_details");
            //push state if applicable
            if(local_billing_details) {
                setBillingDetails(local_billing_details);
            }
            //load application
            setIsLoaded(true)
        }

        fetchBillingDetails();
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

        //create or update existing user

        //fetch customerId from cookies
        const { customerId } = parseCookies();

        //if existing customer
        if(customerId) {
            //check to see if data changed
            //update customer
        }

        //if new customer
        if(!customerId) {
            //format data for stripe
            const payload = {
                name: first_name + ' ' + last_name,
                email: email_address,
                address: {
                    line1: address_line_1,
                    city: city,
                    state: state,
                    country: country,
                    postal_code: zipcode
                }
            }

            //create new customer
            const {id, error} = await CheckoutService.createCustomer(payload);
            //error handling
            if(error) {
                setMessage({msgBody: error.msg, msgError: true});
                return;
            }
            //store customerId in cookies
            setCookie(null, 'customerId', id, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });
            //append invoice items to customer
            await createInvoiceItems(cart, id);
        }

        
        //move user to next step in checkout process
    }

    const handleChange = (e) => {
        const mutatedState = {
            ...billing_details,
            [e.target.name]: e.target.value,
        }
        setBillingDetails(mutatedState);
    }


    return isLoaded && (
        <>
        <section>
            <h1>User Information</h1>
            <form onSubmit={handleInformationSubmit} style={{display: 'flex', flexDirection: 'column', width: 250}}>
                <input value={billing_details.first_name} name="first_name" type="text" placeholder="First Name" onChange={handleChange}/>
                <input value={billing_details.last_name} name="last_name" type="text" placeholder="Last Name" onChange={handleChange}/>
                <input value={billing_details.email_address} name="email_address" type="text" placeholder="Email Address" onChange={handleChange}/>
                <input value={billing_details.address_line_1} name="address_line_1" type="text" placeholder="Address Line 1" onChange={handleChange}/>
                <input value={billing_details.country} name="country"  type="text" placeholder="Country" onChange={handleChange}/>
                <input value={billing_details.state} name="state"  type="text" placeholder="State" onChange={handleChange}/>
                <input value={billing_details.city} name="city" type="text" placeholder="City" onChange={handleChange}/>
                <input value={billing_details.zipcode} name="zipcode" type="text" placeholder="Zipcode" onChange={handleChange}/>
                {message && <p>{message.msgBody}</p>}
                <button type="submit">Next</button>
            </form>
        </section>
        <section style={{margin: '2rem 0'}}>
            <h1>Delivery Preference</h1>
            <input type="checkbox" name="shipping" value="ship"/>
            <label htmlFor="shipping">Shipping</label>
            <input type="checkbox" name="pickup" value="pickup"/>
            <label htmlFor="pickup">Pickup</label>
        </section>
        <section>
            <h1>Payment</h1>
        </section>
        </>
    );
}

export const getServerSideProps = async (ctx) => {
    return {
        props:{
            data:null
        }
    }
}

export const createInvoiceItems = async(cart, customerId) => {
    //loops through the cart and creates invoice items for each product on the newly created user
    const fn = function createItem(product) {
        return new Promise(async(resolve) => {
            const {priceId, quantity} = product;
            const payload = {customer: customerId, price: priceId, quantity: quantity};
            await CheckoutService.createInvoiceItem(payload);
            resolve();
        })
    }

    const actions = cart.map(fn);
    await Promise.all(actions);

    return;
}