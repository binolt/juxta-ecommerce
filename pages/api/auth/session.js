import { findUser } from "../../../lib/auth/user";
import { getLoginSession } from "../../../lib/auth/session";
import dbConnect from "../../../utils/mongodb";

export default async (req, res) => {
    try {
        await dbConnect();
        const session = await getLoginSession(req);
        const user = session ? await findUser({_id: session._doc._id}) : {};
        res.status(200).json(user);
    } catch (err) {
        res.status(500).end('Authentication token is invalid, please log in')
    }
}