import { useAuth } from "../context/AuthContext";
import AuthService from "../services/AuthService";
import { useRouter } from "next/router";

export default function Navbar() {
    const {setUser, currentUser} = useAuth();
    const router = useRouter();

    const handleLogout = async() => {
        const res = await AuthService.logout();
        setUser(res.user);
    }

    const handleRoute = (target) => {
        router.push(`/${target}`);
    }
    
    return (
        <nav className="wrapper">
            <div className="content">
            <button onClick={() => handleRoute('')}>Home</button>
            <span className="flexend">
                <button onClick={() => handleRoute('login')}>Login</button>
                <button onClick={() => handleRoute('register')}>Register</button>
                <button onClick={handleLogout}>Logout</button>
            </span>
            </div>
        </nav>
    );
}