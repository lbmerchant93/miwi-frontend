import { createContext } from "react";

interface User {
    isLoggedIn: boolean;
    userId: string | null;
    displayName: string | null;
    photoURL: string | null;
    login: any;
    logout: any;
}

export const AuthContext = createContext<User>({ 
    isLoggedIn: false, 
    userId: null,
    displayName: '',
    photoURL: '',
    login: () => {},
    logout: () => {}
})