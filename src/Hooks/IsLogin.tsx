import { createContext, useState } from "react";

export const LoggedInContext = createContext<any>(null);

export function LoginProvider({ children }: { children: React.ReactNode }){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<{id: number; name: string}|null>(null);
    return (
        <LoggedInContext.Provider
        value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
        }}>
            {children}
        </LoggedInContext.Provider>
    );
}
