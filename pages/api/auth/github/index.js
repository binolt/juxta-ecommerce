import passport from "passport"
import nextConnect from "next-connect";
import withPassport from "../../../../lib/auth/withPassport";
import { githubStrategy } from "../../../../lib/auth/strategies";

passport.use(githubStrategy);

const handler = nextConnect()
    .use(passport.initialize())
    .get(async (req, res) => {
    try {
        passport.authenticate('github')(req, res, (...args) => {
            console.log("passport authenticated", args)
        })
    } catch (error) {
        res.status(500).json({ msgError: true, msgBody: "Something went wrong..." })
    }
})

export default withPassport(handler);