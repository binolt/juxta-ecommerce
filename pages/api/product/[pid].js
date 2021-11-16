import Product from "../../../models/Product";
import dbConnect from "../../../utils/mongodb";

export default async (req, res) => {
    await dbConnect();
    const {pid} = req.query;
    const product = await Product.findOne({_id: pid});
    res.json(product)
}