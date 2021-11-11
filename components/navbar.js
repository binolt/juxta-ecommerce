import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import AuthService from "../services/AuthService";
import styles from "../styles/navbar.module.scss";

export default function Navbar() {
    const {setUser, currentUser} = useAuth();

    const handleLogout = async() => {
        const res = await AuthService.logout();
        setUser(res.user);
    }
    
    return (
        // <nav className={styles.wrapper}>
        //     <div className={styles.content}>
        //     <Link href="/">Home</Link>
        //     <span className={styles.flexend}>
        //         {Object.keys(currentUser).length === 0 ?<>
        //             <Link href="/login">Login</Link>
        //             <Link href="/register">Register</Link>
        //         </>:
        //             <button onClick={handleLogout}>Logout</button>
        //         }
        //     </span>
        //     </div>
        // </nav>
        <p>Nav</p>
    );
}