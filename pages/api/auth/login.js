import passport from "passport";
import dbConnect from "../../../utils/mongodb";
import nextConnect from "next-connect";
import { localStrategy } from "../../../lib/auth/strategies";
import { setLoginSession } from "../../../lib/auth/session";

const authenticate = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('local', {session: false}, (error, token) => {
        if(error) reject(error);
        else resolve(token)
    })(req, res)
});

passport.use(localStrategy);


const handler = 
    nextConnect()
    .use(passport.initialize())
    .post(async (req, res) => {
        await dbConnect()
        try {
            const user = await authenticate(req, res);
            const session = {...user};
            const cookie = await setLoginSession(res, session);
            const {username, _id} = user;
            const payload = {msgError: false, msgBody: `Welcome back, ${username}!`, user: {username, _id}}
            res.setHeader("Set-cookie", cookie)
            res.status(201).json(payload);
        } catch (err) {
            console.log(err)
            res.status(401).json({err: err, msgError: true, msgBody: "You are not authorized." })
        }
});

export default handler;