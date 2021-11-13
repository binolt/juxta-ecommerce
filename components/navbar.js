import { useAuth } from "../context/AuthContext";
import AuthService from "../services/AuthService";
import styles from "../styles/navbar.module.scss";
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
        <nav className={styles.wrapper}>
            <div className={styles.content}>
            <button onClick={() => handleRoute('')}>Home</button>
            <span className={styles.flexend}>
                <button onClick={() => handleRoute('login')}>Login</button>
                <button onClick={() => handleRoute('register')}>Register</button>
                <button onClick={handleLogout}>Logout</button>
            </span>
            </div>
        </nav>
    );
}