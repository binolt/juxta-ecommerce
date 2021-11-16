import Product from "../../../models/Product";
import dbConnect from "../../../utils/mongodb";

export default async (req, res) => {
    await dbConnect();
    const query = req.url.replace("/api/shop/", "");
    const products = await Product.find({category: query});
    res.json(products)
}