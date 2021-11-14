import passport from "passport";
import nextConnect from "next-connect";
import withPassport from "../../../../lib/auth/withPassport";
import { githubStrategy } from "../../../../lib/auth/strategies";
import { setLoginSession } from "../../../../lib/auth/session";
import dbConnect from "../../../../utils/mongodb";

passport.use(githubStrategy);

const authenticate = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('github', {session: false}, (error, token) => {
        if(error) reject(error);
        else resolve(token);
    })(req, res)
})

const handler = nextConnect()
    .use(passport.initialize())
    .get(async (req, res) => {
    try {
        await dbConnect();
        const user = await authenticate(req, res)
        const session = {...user}
        const cookie = await setLoginSession(res, session);
        res.setHeader("Set-Cookie", cookie)
        res.redirect("/")
    } catch (error) {
        res.status(500).json({error: error, msgError: true, msgBody: "Something went wrong..." })
    }
})

export default withPassport(handler);