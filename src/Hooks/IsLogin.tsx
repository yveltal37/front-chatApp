import { createContext, useState } from "react";

export const LoggedInContext = createContext<any>(false);

export function LoginProvider({ children }: { children: React.ReactNode }){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
    <LoggedInContext.Provider
    value={{
        isLoggedIn,
        setIsLoggedIn,
    }}>
        {children}
    </LoggedInContext.Provider>
    );
}
