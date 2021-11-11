import { getTokenCookie, removeTokenCookie } from "../../../lib/auth/cookies";

const TOKEN_NAME = 'passport-session'

export default async (req, res) => {
    const cookies = getTokenCookie(req);
    if(!cookies) {
        res.status(401).json({msgError: true, msgBody: "You are not authorized." });
        return;
    }
    if(cookies[TOKEN_NAME]) removeTokenCookie(res, TOKEN_NAME);
    res.status(200).json({msgBody: "you have successfully logged out", msgError: false, user: {}})
}