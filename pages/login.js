import { useRef } from "react";
import AuthService from "../services/AuthService";

export default function Login() {

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const payload = {
            username, password
        }

        const res = await AuthService.login(payload);
        console.log(res)
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input ref={usernameRef} type="text" placeholder="Username"/>
                <input ref={passwordRef} type="password" placeholder="Password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}