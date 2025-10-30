import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const LoggedInContext = createContext<any>(null);

export function LoginProvider({ children }: { children: React.ReactNode }){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{id: number; name: string}|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = jwtDecode<{ sub: number; username: string }>(token);
                setUser({id: decoded.sub, name:decoded.username});
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Invalid token", e);
                setUser(null);
                setIsLoggedIn(false);
            }
        }
        setLoading(false); 
    }, []);

    return (
        <LoggedInContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            loading 
        }}>
            {children}
        </LoggedInContext.Provider>
    );
}
