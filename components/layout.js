import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useUser } from "../lib/auth/hooks";
import { useAuth } from "../context/AuthContext";
import Footer from "./footer";

export default function Layout({children}) {
    const user = useUser();
    const { setUser } = useAuth();
    const [loaded, setLoaded] = useState(false);

    //fetch user from session and update auth context
    useEffect(() => {
        if(user) {
            setUser(user.user);
            setLoaded(true);
        };
    }, [user]);

    return loaded && (<>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
    </>);
}