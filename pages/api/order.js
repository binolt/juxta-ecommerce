import nextConnect from "next-connect";
import { createNewOrder, fetchOrder } from "../../lib/order";

const handler = nextConnect();

handler.get(async(req, res) => {
    //fetch existing order
    const order_id = req.url.replace("/api/order?id=", "");
    const { order, error } = await fetchOrder(order_id);

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