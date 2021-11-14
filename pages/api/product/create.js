import nextConnect from "next-connect";
import { uploadFile, formatBufferTo64 } from "../../../utils/multer";
import {newStripeProduct, uploadImage, newStripePrice} from "../../../lib/product";

const handler = 
    nextConnect()
    .use(uploadFile)
    .post(async(req, res) => {
        if(!req.file) {
            res.json({msg: "You must upload a file !", error: true})
            return;
        }

        try {
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


            //create new product

            res.json({msg: "Image successfully uploaded !", error: false, productId: id, priceId})
        } catch (err) {
            if(err) throw new Error(err);
            console.log(err)
            res.status(500).json({msg: "something went wrong :/", error: true})
        }
});

export default handler;

export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
}; 