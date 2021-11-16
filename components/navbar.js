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
            <button onClick={() => handleRoute('mens')}>Shop</button>
            {Object.keys(currentUser).length > 0 && <button onClick={() => handleRoute('dashboard')}>Dashboard</button>}
            <span className="flexend">
                {Object.keys(currentUser).length > 0 ? 
                    <button onClick={handleLogout}>Logout</button> : (
                    <>
                    <button onClick={() => handleRoute('login')}>Login</button>
                    <button onClick={() => handleRoute('register')}>Register</button>
                    </>
                )}
            </span>
            </div>
        </nav>
    );
}