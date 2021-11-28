import nextConnect from "next-connect";
import { fetchAll } from "../../../lib/product";

const handler = nextConnect();

handler.get(async(req, res) => {
    const products = await fetchAll();
    res.json({products});
});

handler.post(async(req, res) => {
    res.json({msg: "POST"})
});

handler.put(async(req, res) => {
    res.json({msg: "update"})
});

handler.delete(async(req, res) => {
    res.json({msg: "delete"})
});

export default handler;