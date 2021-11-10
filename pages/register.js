import { useRef } from "react";
import AuthService from "../services/AuthService";

export default function Register() {
    const emailRef = useRef(null);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const email = emailRef.current.value;
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const payload = {
            email, username, password
        }

        const res = await AuthService.register(payload);
        console.log(res)
    }   
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input ref={emailRef} type="text" placeholder="Email Address"/>
                <input ref={usernameRef} type="text" placeholder="Username"/>
                <input ref={passwordRef} type="password" placeholder="Password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}