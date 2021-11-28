import nextConnect from "next-connect";

const handler = nextConnect();

handler.get(async(req, res) => {
    res.json({msg: "get"})
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