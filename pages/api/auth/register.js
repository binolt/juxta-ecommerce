import dbConnect from "../../../utils/mongodb";
import User from "../../../models/User";


export default async(req, res) => {
    await dbConnect();
    const email = "hello@gmail.com";
    const username = "steven924";
    const newUser = new User({username, email});
    await newUser.save();
    res.json({msg: "register"})
}