import nextConnect from "next-connect";
import { uploadFile, formatBufferTo64 } from "../../../utils/multer";
import {newStripeProduct, uploadImage, newStripePrice, createProduct} from "../../../lib/product";
import dbConnect from "../../../utils/mongodb";

const handler = 
    nextConnect()
    .use(uploadFile)
    .post(async(req, res) => {

        //ensure solid DB connection
        await dbConnect()

        //ensure file upload
        if(!req.file) {
            res.json({msg: "You must upload a file !", error: true})
            return;
        }

        //upload image
        const file64 = formatBufferTo64(req.file);
        const {image, uploadError} = await uploadImage(file64);
        if(uploadError) {
            res.status(500).json(uploadError);
            return;
        }

        //create new stripe product
        const {id, productError} = await newStripeProduct(req.body.title, image);
        if(productError) {
            res.status(500).json(productError);
            return;
        }

        //create a new stripe price 
        const {priceId, priceError} = await newStripePrice(id, req.body.price);
        if(priceError) {
            res.status(500).json(productError);
            return;
        }

        //register new product in database
        const payload = {...req.body, priceId, image};
        const {data, error} = await createProduct(payload);
        if(error) {
            res.status(500).json(error);
            return;
        }

        res.status(201).json(data)
});

export default handler;


//some reason u need this to upload images lol
export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
}; 