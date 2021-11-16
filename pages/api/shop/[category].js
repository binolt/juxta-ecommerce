import Product from "../../../models/Product";
import dbConnect from "../../../utils/mongodb";

export default async (req, res) => {
    await dbConnect();
    const {category} = req.query;
    const products = await Product.find({category});
    res.json(products)
}