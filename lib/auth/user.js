import crypto from 'crypto';
import User from "../../models/User";
import { validateEmail } from '../../utils/helpers';

export const createUser = async({email, username, password}) => {
    if(!email) return { msgError: true, msgBody: "You must provide an email address" };
    
    //validate email
    if(!validateEmail(email)) {
        return { msgError: true, msgBody: "You must provide a VALID email address." };
    }

    if(!username) return { msgError: true, msgBody: "You must provide a username" };
    if(!password) return { msgError: true, msgBody: "You must provide a password" };


    //check for duplicate email 
    const duplicateEmail = await findUser({email})
    if(duplicateEmail) {
        return { msgError: true, msgBody: "That email address already exists in our database." };
    }

    //check for duplicate username
    const duplicateUsername = await findUser({username});
    if(duplicateUsername) {
        return { msgError: true, msgBody: "That username already exists in our database." };
    }

    //generate salt & hash
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex')

    //create / save user
    try {
        const newUser = new User({salt, hash, username, email});
        const data = await newUser.save();
        return { msgError: false, msgBody: "Account successfully created!", user: data };
    } catch (err) {
        return {msgError: true, msgBody: "Something went wrong ..."};
    }
}

export const createGithubUser = async(username, githubId) => {
    try {
        const newUser = new User({username, githubId});
        await newUser.save();
        return newUser;
    } catch (err) {
        return {msgError: true, msgBody: "Something went wrong ...", err}
    }
}

//find user
export const findUser = async(target) => {
    const user = await User.findOne(target);
    return user;
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex')
    const passwordsMatch = user.hash === inputHash
    return passwordsMatch
}