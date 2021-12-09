import nextConnect from "next-connect";
import { createNewOrder, fetchOrder } from "../../lib/order";

const handler = nextConnect();

handler.get(async(req, res) => {
    //fetch existing order
    const params = req.url.replace("/api/order?", "").split('&');
    let id;
    let email;
    params.forEach((query) => {
        const param = query.split("=");
        const key = param[0];
        const value = decodeURIComponent(param[1]);
        if(key === "id") {
            id = value;
            return;
        }
        if(key === "email") {
            email = value;
            return;
        }
    });

    //ensure all fields are filled in
    if(!id || !email) {
        res.json({error: "Please ensure all fields are filled in."});
        return;
    }

    const { order, error } = await fetchOrder(id, email);

    //handle errors
    if(error) {
        res.json({error: {msg: error}});
        return;
    }

    res.json({order});
});

handler.post(async(req, res) => {
    //create a new order
    try {
        const order = await createNewOrder(req.body);
        res.json({order});
    } catch (err) {
        res.json({msg: err.message, type: err.type})
    }
});

handler.put(async(req, res) => {
    //update an order
    res.json({msg: "update"})
});

handler.delete(async(req, res) => {
    //delete order
    res.json({msg: "delete"})
});

export default handler;