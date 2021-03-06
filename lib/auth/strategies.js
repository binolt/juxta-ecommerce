import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as GithubStrategy} from 'passport-github';
import { findUser, validatePassword, createGithubUser } from './user'
import dbConnect from '../../utils/mongodb';

export const localStrategy = new LocalStrategy(async function (username, password, cb) {
    try {
        const user = await findUser({username});
        if(user && validatePassword(user, password)) cb(null, user);
        else cb(new Error("Invalid username and password combination"));
    } catch(err) { 
        cb(err) 
    }
})

export const githubStrategy = new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  }, async(accessToken, refreshToken, profile, cb) => {
    await dbConnect();
    //look for existing user
    const existingUser = await findUser({githubId: profile.id});
    if(existingUser) return cb(null, existingUser);

    //create new user
    const {username, id} = profile;
    const newUser = await createGithubUser(username, id);
    cb(null, newUser)
});
