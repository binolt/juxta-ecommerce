import { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import AuthService from "../services/AuthService";
import { useRouter } from "next/router";

export default function Login() {
    const {setUser} = useAuth();
    const router = useRouter();

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
        setUser(res.user);
        router.push("/");
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