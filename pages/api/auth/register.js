import dbConnect from "../../../utils/mongodb";
import { createUser } from "../../../lib/auth/user";


export default async(req, res) => {
    await dbConnect();
    const data = await createUser(req.body);
    res.json(data)
}